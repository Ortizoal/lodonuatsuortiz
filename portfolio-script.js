// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link highlight on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create mailto link
        const mailtoLink = `mailto:latsuortiz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showSuccessMessage();

        // Reset form
        contactForm.reset();
    });
}

// Success Message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0066cc, #00a8ff);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0, 102, 204, 0.3);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    message.textContent = '✓ Thank you! I\'ll get back to you soon.';
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 3000);
}

// Animation Styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill bars and cards
document.querySelectorAll('.skill-category, .experience-card, .highlight-card, .edu-content').forEach(el => {
    observer.observe(el);
});

// Dynamic year in footer
const year = new Date().getFullYear();
const footerYear = document.querySelector('.footer');
if (footerYear && !footerYear.textContent.includes(year)) {
    // Already has dynamic year or we can update it
}

// Phone and Email linking
const phoneLink = document.querySelector('a[href^="tel:"]');
const emailLink = document.querySelector('a[href^="mailto:"]');

if (phoneLink && !navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    // On desktop, show copy-to-clipboard option on hover
    phoneLink.addEventListener('click', function(e) {
        if (!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
            e.preventDefault();
            const phone = '+233206047722';
            navigator.clipboard.writeText(phone).then(() => {
                showNotification('Phone number copied to clipboard!');
            });
        }
    });
}

// Notification function
function showNotification(text) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.5s ease;
    `;
    notification.textContent = text;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
}

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease';
                        bar.style.width = width;
                    }, 100);
                });
                skillsAnimated = true;
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);
}

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Add scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0066cc, #00a8ff);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(0, 102, 204, 0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
    });
}

createScrollToTopButton();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to Lodonu Atsu Ortiz Portfolio!');
    
    // Add animation delay to cards
    const cards = document.querySelectorAll('.skill-category, .experience-card, .highlight-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Prevent default for mobile phone linking if needed
if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    // Phone linking works normally on mobile
} else {
    // Copy on desktop click (already handled above)
}

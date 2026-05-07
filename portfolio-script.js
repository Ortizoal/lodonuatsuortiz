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
        bottom: 5rem;
        right: 1rem;
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
    console.log('Welcome to Ortiz Atsu Lodonu Portfolio!');
    
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

// ========== TRANQUILITY CHATBOT ==========
class TranquilityChatbot {
    constructor() {
        this.knowledgeBase = {
            name: 'Ortiz',
            greetings: ['hello', 'hi', 'hey', 'greetings', 'how are you', 'what\'s up'],
            education: {
                current: 'Accra Technical University - B.Tech in Applied Informatics (Level 200)',
                previous: 'Keta Senior High School - General Science',
                trigger: ['education', 'school', 'university', 'degree', 'study', 'studies']
            },
            skills: {
                programming: ['C Programming', 'HTML', 'CSS', 'JavaScript', 'C++', 'SQL'],
                design: ['Graphic Design', 'UI/UX Design', 'Branding'],
                specializations: ['Artificial Intelligence', 'Problem Solving', 'Microsoft Office'],
                trigger: ['skills', 'expertise', 'proficiency', 'ability', 'programming', 'design']
            },
            experience: {
                agentcon: 'AgentCon Volunteer (2025) - Event Coordinator & Attendee Support',
                telecel: 'Customer Service Representative (2025) - Telecel Ghana',
                istsa: 'Public Relations Officer (Current) - Information Systems & Technology Student\'s Association',
                tutor: 'Programming Tutor (Ongoing) - C Programming Language',
                trigger: ['experience', 'work', 'job', 'position', 'role', 'volunteered', 'volunteer']
            },
            about: {
                profession: 'Aspiring Software Engineer, Graphic Designer, and AI Enthusiast',
                passion: 'Technology innovation and creating impactful solutions',
                role: 'Public Relations Officer for Information Systems & Technology Student\'s Association',
                tutor: 'C Programming Tutor',
                trigger: ['about', 'who', 'yourself', 'what do you do', 'profession', 'career']
            }
        };

        this.chatbox = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.container = document.querySelector('.chatbot-container');
        this.hasOpenedBefore = false;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.sendBtn.addEventListener('click', () => this.handleUserMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });
        
        // Toggle chatbot on header click
        const chatbotHeader = document.querySelector('.chatbot-toggle-btn');
        chatbotHeader.addEventListener('click', () => this.toggleChatbot());
        
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleChatbot();
        });
    }

    toggleChatbot() {
        this.container.classList.toggle('minimized');
        
        if (!this.container.classList.contains('minimized')) {
            // Expanded - show welcome message if first time opened
            if (!this.hasOpenedBefore) {
                this.addWelcomeMessage();
                this.hasOpenedBefore = true;
            }
            // Focus input when opened
            setTimeout(() => this.input.focus(), 300);
        }
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.displayMessage('Welcome! I\'m Tranquility, an AI assistant here to answer questions about Ortiz. Feel free to ask about education, experience, skills, or anything else about Ortiz!', 'bot');
        }, 500);
    }

    handleUserMessage() {
        const userMessage = this.input.value.trim();
        if (!userMessage) return;

        this.displayMessage(userMessage, 'user');
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate typing with a longer delay for natural feel
        setTimeout(() => {
            this.removeTypingIndicator();
            const botResponse = this.generateResponse(userMessage);
            this.displayMessage(botResponse, 'bot');
        }, 800);
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        typingDiv.appendChild(contentDiv);
        this.chatbox.appendChild(typingDiv);
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Greeting responses
        if (this.knowledgeBase.greetings.some(greeting => message.includes(greeting))) {
            return 'Hello! I\'m Tranquility. I\'m here to answer questions about Ortiz. What would you like to know?';
        }

        // Education
        if (this.knowledgeBase.education.trigger.some(word => message.includes(word))) {
            return `📚 Education:\n\n${this.knowledgeBase.education.current}\n\nPrevious education: ${this.knowledgeBase.education.previous}`;
        }

        // Skills
        if (this.knowledgeBase.skills.trigger.some(word => message.includes(word))) {
            return `💻 Skills & Expertise:\n\nProgramming: ${this.knowledgeBase.skills.programming.join(', ')}\n\nDesign: ${this.knowledgeBase.skills.design.join(', ')}\n\nSpecializations: ${this.knowledgeBase.skills.specializations.join(', ')}`;
        }

        // Experience
        if (this.knowledgeBase.experience.trigger.some(word => message.includes(word))) {
            return `💼 Experience & Involvement:\n\n${this.knowledgeBase.experience.agentcon}\n\n${this.knowledgeBase.experience.telecel}\n\n${this.knowledgeBase.experience.istsa}\n\n${this.knowledgeBase.experience.wicys}\n\n${this.knowledgeBase.experience.tutor}`;
        }

        // About/Who
        if (this.knowledgeBase.about.trigger.some(word => message.includes(word))) {
            return `👤 About Lodonu:\n\nProfession: ${this.knowledgeBase.about.profession}\n\nCurrent Role: ${this.knowledgeBase.about.role}\n\nPassion: ${this.knowledgeBase.about.passion}\n\nAlso serves as a ${this.knowledgeBase.about.tutor}`;
        }

        // Contact info
        if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
            return '📧 Contact Information:\n\nEmail: latsuortiz@gmail.com\nPhone: +233 206 047 722\nLocation: Accra, Ghana\n\nYou can also find Ortiz on LinkedIn and Instagram!';
        }

        // Name
        if (message.includes('name') || message.includes('you are') || message.includes('who are you')) {
            return `I'm Tranquility, an AI assistant. I'm here to help answer questions about Ortiz - his education, career, experience, and skills.`;
        }

        // Default response for out-of-scope questions
        return `I'm only permitted to answer questions Ortiz, his education, career, experience, and skills. Please feel free to ask me about those topics! 😊`;
    }

    displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = message;

        messageDiv.appendChild(contentDiv);
        this.chatbox.appendChild(messageDiv);

        // Scroll to bottom
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TranquilityChatbot();
});















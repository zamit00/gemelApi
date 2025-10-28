// Marketing Site JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeToolCards();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .tool-card, .about-content, .contact-form').forEach(el => {
        observer.observe(el);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> שולח...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('הבקשה נשלחה בהצלחה! אחזור אליך בהקדם.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Send to WhatsApp (optional)
                sendToWhatsApp(formObject);
                
            }, 2000);
        });
    }
}

// Initialize tool cards
function initializeToolCards() {
    // Add hover effects and click handlers
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Counter animation for stats
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Tool opening functionality
function openTool(toolType) {
    // Create overlay for tool
    const overlay = document.createElement('div');
    overlay.className = 'tool-overlay';
    overlay.innerHTML = `
        <div class="tool-modal">
            <div class="tool-header">
                <h3 id="toolTitle">כלים ומחשבונים</h3>
                <button class="close-tool" onclick="closeTool()">&times;</button>
            </div>
            <div class="tool-content">
                <iframe id="toolFrame" src="" frameborder="0"></iframe>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(overlay);
    
    // Set tool source based on type
    let toolSrc = '';
    let toolTitle = '';
    
    switch(toolType) {
        case 'calculators':
            toolSrc = '../Machshevonim.html';
            toolTitle = 'מחשבונים פיננסיים';
            break;
        case 'comparisons':
            toolSrc = '../index.html';
            toolTitle = 'השוואות מקצועיות';
            break;
        case 'simulators':
            toolSrc = '../VirtualInvest.html';
            toolTitle = 'סימולטורים מתקדמים';
            break;
        case 'data':
            toolSrc = '../index.html';
            toolTitle = 'נתונים עדכניים';
            break;
    }
    
    // Update modal content
    document.getElementById('toolTitle').textContent = toolTitle;
    document.getElementById('toolFrame').src = toolSrc;
    
    // Show overlay
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
}

// Close tool function
function closeTool() {
    const overlay = document.querySelector('.tool-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Animate counters
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Send to WhatsApp
function sendToWhatsApp(formData) {
    const message = `
היי חגי! אני מעוניין בייעוץ פנסיוני:

שם: ${formData.name || 'לא צוין'}
טלפון: ${formData.phone || 'לא צוין'}
אימייל: ${formData.email || 'לא צוין'}
נושא: ${formData.subject || 'לא צוין'}
הודעה: ${formData.message || 'לא צוין'}
    `.trim();
    
    const whatsappUrl = `https://wa.me/972501234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for tool overlay and notifications
const additionalCSS = `
.tool-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.tool-overlay.show {
    opacity: 1;
}

.tool-modal {
    background: white;
    border-radius: 15px;
    width: 90%;
    max-width: 1200px;
    height: 90%;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.tool-overlay.show .tool-modal {
    transform: scale(1);
}

.tool-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    background: #f8f9fa;
    border-radius: 15px 15px 0 0;
}

.tool-header h3 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
}

.close-tool {
    background: none;
    border: none;
    font-size: 2rem;
    color: #6c757d;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.close-tool:hover {
    background: #e9ecef;
    color: #dc3545;
}

.tool-content {
    flex: 1;
    padding: 0;
}

.tool-content iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0 0 15px 15px;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    padding: 1rem 1.5rem;
    z-index: 10001;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    border-right: 4px solid #007bff;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-right-color: #28a745;
}

.notification-error {
    border-right-color: #dc3545;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification-content i {
    font-size: 1.2rem;
}

.notification-success .notification-content i {
    color: #28a745;
}

.notification-error .notification-content i {
    color: #dc3545;
}

.navbar-scrolled {
    background: rgba(255,255,255,0.95) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .tool-modal {
        width: 95%;
        height: 95%;
    }
    
    .notification {
        right: 10px;
        left: 10px;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
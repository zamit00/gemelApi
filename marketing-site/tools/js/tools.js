// Tools Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeToolsPage();
    initializeToolModals();
    initializeAnimations();
});

// Initialize tools page
function initializeToolsPage() {
    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    
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

// Initialize tool modals
function initializeToolModals() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('toolModal');
        if (e.target === modal) {
            closeToolModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeToolModal();
        }
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
    
    // Observe tool cards for animation
    document.querySelectorAll('.tool-card-large').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Open tool modal
function openToolModal(toolType) {
    const modal = document.getElementById('toolModal');
    const modalTitle = document.getElementById('modalTitle');
    const toolIframe = document.getElementById('toolIframe');
    
    // Set tool information based on type
    let toolSrc = '';
    let toolTitle = '';
    
    switch(toolType) {
        case 'calculators':
            toolSrc = '../../Machshevonim.html';
            toolTitle = 'מחשבונים פיננסיים';
            break;
        case 'comparisons':
            toolSrc = '../../index.html';
            toolTitle = 'השוואות מקצועיות';
            break;
        case 'simulators':
            toolSrc = '../../VirtualInvest.html';
            toolTitle = 'סימולטורים מתקדמים';
            break;
        case 'data':
            toolSrc = '../../index.html';
            toolTitle = 'נתונים עדכניים';
            break;
        case 'stars':
            toolSrc = '../../index.html';
            toolTitle = 'הכוכבים - המוצרים הטובים ביותר';
            break;
        case 'education':
            toolSrc = '../../index.html';
            toolTitle = 'מידע מקצועי והדרכות';
            break;
    }
    
    // Update modal content
    modalTitle.textContent = toolTitle;
    
    // Show loading state
    toolIframe.innerHTML = `
        <div class="tool-loading">
            <div class="spinner"></div>
        </div>
    `;
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Load iframe after a short delay
    setTimeout(() => {
        toolIframe.innerHTML = `<iframe src="${toolSrc}" frameborder="0"></iframe>`;
    }, 500);
    
    // Track tool usage (optional - for analytics)
    trackToolUsage(toolType);
}

// Close tool modal
function closeToolModal() {
    const modal = document.getElementById('toolModal');
    const toolIframe = document.getElementById('toolIframe');
    
    // Hide modal
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Clear iframe content after animation
    setTimeout(() => {
        toolIframe.innerHTML = '';
    }, 300);
}

// Track tool usage for analytics
function trackToolUsage(toolType) {
    // Send analytics event (replace with your analytics tracking)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tool_opened', {
            'tool_type': toolType,
            'page_title': document.title
        });
    }
    
    // Log to console for debugging
    console.log(`Tool opened: ${toolType}`);
}

// Handle iframe loading
function handleIframeLoad(iframe) {
    // Remove loading state when iframe loads
    const loading = iframe.parentElement.querySelector('.tool-loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Handle iframe errors
function handleIframeError(iframe) {
    const errorMessage = `
        <div class="tool-error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>שגיאה בטעינת הכלי</h3>
            <p>לא ניתן לטעון את הכלי כרגע. אנא נסה שוב מאוחר יותר או צור קשר לקבלת עזרה.</p>
            <button onclick="closeToolModal()" class="btn btn-primary">סגור</button>
        </div>
    `;
    
    iframe.parentElement.innerHTML = errorMessage;
}

// Add smooth hover effects to tool cards
document.querySelectorAll('.tool-card-large').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to tool cards
document.querySelectorAll('.tool-card-large').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleCSS = `
.tool-card-large {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.tool-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    text-align: center;
    color: #6c757d;
}

.tool-error i {
    font-size: 3rem;
    color: #ffc107;
    margin-bottom: 1rem;
}

.tool-error h3 {
    color: #dc3545;
    margin-bottom: 1rem;
}

.tool-error p {
    margin-bottom: 2rem;
    line-height: 1.6;
}

.navbar-scrolled {
    background: rgba(255,255,255,0.95) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add scroll-triggered animations
window.addEventListener('scroll', function() {
    document.querySelectorAll('.tool-card-large').forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate-in');
        }
    });
});

// Add CSS for scroll animations
const scrollAnimationCSS = `
.tool-card-large {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.tool-card-large.animate-in {
    opacity: 1;
    transform: translateY(0);
}
`;

const scrollStyle = document.createElement('style');
scrollStyle.textContent = scrollAnimationCSS;
document.head.appendChild(scrollStyle);
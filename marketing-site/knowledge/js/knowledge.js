// Knowledge Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeKnowledgePage();
    initializeAnimations();
    initializeNewsletter();
    initializeCategoryCards();
});

// Initialize knowledge page
function initializeKnowledgePage() {
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
    document.querySelectorAll('.knowledge-category-card, .featured-article-card').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Initialize newsletter form
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>מעבד...';
            submitBtn.disabled = true;
            
            // Simulate subscription (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('נרשמת בהצלחה לניוזלטר! תודה על ההרשמה.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Track subscription (optional)
                trackNewsletterSubscription(email);
                
            }, 2000);
        });
    }
}

// Initialize category cards
function initializeCategoryCards() {
    // Add hover effects
    document.querySelectorAll('.knowledge-category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect
    document.querySelectorAll('.knowledge-category-card').forEach(card => {
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
}

// Show category articles
function showCategory(category) {
    // Create modal for category articles
    const modal = document.createElement('div');
    modal.className = 'category-modal-overlay';
    modal.innerHTML = `
        <div class="category-modal-content">
            <div class="category-modal-header">
                <h3 id="categoryTitle">מאמרים</h3>
                <button class="close-category-modal" onclick="closeCategoryModal()">&times;</button>
            </div>
            <div class="category-modal-body">
                <div id="categoryArticles">
                    <div class="articles-loading">
                        <div class="spinner"></div>
                        <p>טוען מאמרים...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(modal);
    
    // Set category title
    const categoryTitles = {
        'hishtalmut': 'קרנות השתלמות',
        'pension': 'קרנות פנסיה',
        'gemel': 'קופות גמל',
        'tax': 'מיסוי פנסיוני',
        'investments': 'השקעות וסיכונים',
        'tips': 'טיפים ועצות'
    };
    
    document.getElementById('categoryTitle').textContent = categoryTitles[category] || 'מאמרים';
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Load articles after a delay
    setTimeout(() => {
        loadCategoryArticles(category);
    }, 1000);
    
    // Track category view
    trackCategoryView(category);
}

// Close category modal
function closeCategoryModal() {
    const modal = document.querySelector('.category-modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Load category articles
function loadCategoryArticles(category) {
    const articlesContainer = document.getElementById('categoryArticles');
    
    // Sample articles data (replace with actual API call)
    const articles = {
        'hishtalmut': [
            {
                title: 'המדריך השלם לקרנות השתלמות',
                excerpt: 'כל מה שצריך לדעת על קרנות השתלמות, הטבות מס ומסלולי השקעה',
                readingTime: '8 דקות',
                date: '15 בינואר 2024'
            },
            {
                title: 'איך לבחור קרן השתלמות מתאימה',
                excerpt: 'מדריך מעשי לבחירת קרן השתלמות עם הטבות מס מקסימליות',
                readingTime: '6 דקות',
                date: '10 בינואר 2024'
            }
        ],
        'pension': [
            {
                title: 'המדריך השלם לקרנות פנסיה',
                excerpt: 'כל מה שצריך לדעת על קרנות פנסיה ורכיבי הפנסיה',
                readingTime: '10 דקות',
                date: '20 בינואר 2024'
            },
            {
                title: 'איך לתכנן פנסיה מושלמת',
                excerpt: 'טיפים ותכנון פנסיוני לטווח ארוך',
                readingTime: '7 דקות',
                date: '18 בינואר 2024'
            }
        ],
        'gemel': [
            {
                title: 'קופות גמל להשקעה - המדריך המלא',
                excerpt: 'כל מה שצריך לדעת על קופות גמל להשקעה והטבות מס',
                readingTime: '9 דקות',
                date: '25 בינואר 2024'
            },
            {
                title: 'איך לבחור קופת גמל מתאימה',
                excerpt: 'מדריך לבחירת קופת גמל עם דמי ניהול נמוכים',
                readingTime: '5 דקות',
                date: '22 בינואר 2024'
            }
        ],
        'tax': [
            {
                title: 'הטבות המס בפנסיה - המדריך המלא',
                excerpt: 'כל ההטבות המס בפנסיה ואופטימיזציה מיסויית',
                readingTime: '8 דקות',
                date: '30 בינואר 2024'
            },
            {
                title: 'איך לחסוך במס עם פנסיה',
                excerpt: 'טיפים מעשיים לחיסכון במס דרך תכנון פנסיוני',
                readingTime: '6 דקות',
                date: '28 בינואר 2024'
            }
        ],
        'investments': [
            {
                title: 'ניהול סיכונים בתיק הפנסיוני',
                excerpt: 'אסטרטגיות ניהול סיכונים ופיזור השקעות',
                readingTime: '10 דקות',
                date: '5 בפברואר 2024'
            },
            {
                title: 'איך לבחור מסלולי השקעה מתאימים',
                excerpt: 'מדריך לבחירת מסלולי השקעה לפי פרופיל סיכון',
                readingTime: '7 דקות',
                date: '2 בפברואר 2024'
            }
        ],
        'tips': [
            {
                title: '10 טיפים לתכנון פנסיוני מושלם',
                excerpt: 'טיפים מעשיים לתכנון פנסיוני נכון ויעיל',
                readingTime: '5 דקות',
                date: '10 בפברואר 2024'
            },
            {
                title: 'שגיאות נפוצות בתכנון פנסיוני',
                excerpt: 'השגיאות הנפוצות ביותר וכיצד להימנע מהן',
                readingTime: '6 דקות',
                date: '8 בפברואר 2024'
            }
        ]
    };
    
    const categoryArticles = articles[category] || [];
    
    if (categoryArticles.length === 0) {
        articlesContainer.innerHTML = `
            <div class="no-articles">
                <i class="fas fa-file-alt"></i>
                <h3>אין מאמרים זמינים כרגע</h3>
                <p>נחזור בקרוב עם מאמרים חדשים בנושא זה</p>
            </div>
        `;
        return;
    }
    
    const articlesHTML = categoryArticles.map(article => `
        <div class="article-item">
            <div class="article-item-content">
                <h4>${article.title}</h4>
                <p>${article.excerpt}</p>
                <div class="article-item-meta">
                    <span class="reading-time"><i class="fas fa-clock"></i> ${article.readingTime}</span>
                    <span class="article-date"><i class="fas fa-calendar"></i> ${article.date}</span>
                </div>
                <a href="#" class="article-item-link">קרא מאמר <i class="fas fa-arrow-left"></i></a>
            </div>
        </div>
    `).join('');
    
    articlesContainer.innerHTML = `
        <div class="articles-list">
            ${articlesHTML}
        </div>
    `;
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Track newsletter subscription
function trackNewsletterSubscription(email) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            'email': email,
            'page_title': document.title
        });
    }
    
    console.log(`Newsletter subscription: ${email}`);
}

// Track category view
function trackCategoryView(category) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'category_viewed', {
            'category': category,
            'page_title': document.title
        });
    }
    
    console.log(`Category viewed: ${category}`);
}

// Add CSS for modal and notifications
const additionalCSS = `
.category-modal-overlay {
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
    visibility: hidden;
    transition: all 0.3s ease;
}

.category-modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.category-modal-content {
    background: white;
    border-radius: 20px;
    width: 90%;
    max-width: 800px;
    height: 80%;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.category-modal-overlay.show .category-modal-content {
    transform: scale(1);
}

.category-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid #eee;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 20px 20px 0 0;
}

.category-modal-header h3 {
    margin: 0;
    color: #2c3e50;
    font-weight: 700;
    font-size: 1.8rem;
}

.close-category-modal {
    background: none;
    border: none;
    font-size: 2.5rem;
    color: #6c757d;
    cursor: pointer;
    padding: 0;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.close-category-modal:hover {
    background: #e9ecef;
    color: #dc3545;
    transform: scale(1.1);
}

.category-modal-body {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
}

.articles-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #6c757d;
}

.articles-loading .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

.articles-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.article-item {
    background: #f8f9fa;
    border-radius: 15px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
}

.article-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    border-color: #3498db;
}

.article-item-content h4 {
    color: #2c3e50;
    font-weight: 700;
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
}

.article-item-content p {
    color: #6c757d;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.article-item-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #6c757d;
}

.article-item-meta span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.article-item-meta i {
    color: #3498db;
}

.article-item-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #3498db;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.article-item-link:hover {
    color: #2c3e50;
    transform: translateX(-5px);
}

.no-articles {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #6c757d;
    text-align: center;
}

.no-articles i {
    font-size: 3rem;
    color: #3498db;
    margin-bottom: 1rem;
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
    border-right: 4px solid #3498db;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-right-color: #28a745;
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

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(52, 152, 219, 0.3);
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

.navbar-scrolled {
    background: rgba(255,255,255,0.95) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .category-modal-content {
        width: 95%;
        height: 90%;
    }
    
    .category-modal-header {
        padding: 1.5rem;
    }
    
    .category-modal-body {
        padding: 1.5rem;
    }
    
    .notification {
        right: 10px;
        left: 10px;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
    
    .article-item-meta {
        flex-direction: column;
        gap: 0.5rem;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.querySelector('.category-modal-overlay');
    if (e.target === modal) {
        closeCategoryModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCategoryModal();
    }
});
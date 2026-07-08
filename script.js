/* ================================
   PORTFOLIO - ENHANCED JAVASCRIPT
   ================================ */

// =====================================================
// 1. LAZY LOADING FOR IMAGES
// =====================================================

const imageObserverOptions = {
    threshold: 0.01,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const imageUrl = img.getAttribute('data-image-url') || img.dataset.src;
            if (imageUrl) {
                img.src = imageUrl;
                img.removeAttribute('data-src');
                img.removeAttribute('data-image-url');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
}, imageObserverOptions);

// Observe all lazy images
document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
});

// =====================================================
// 2. MOBILE MENU TOGGLE
// =====================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// =====================================================
// 3. NAVBAR SCROLL EFFECT
// =====================================================

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});

// =====================================================
// 4. SMOOTH SCROLL FOR NAVIGATION
// =====================================================

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

// =====================================================
// 5. ACTIVE NAV LINK ON SCROLL
// =====================================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// =====================================================
// 6. NOTIFICATION SYSTEM
// =====================================================

function showNotification(message, type = 'success') {
    const notificationContainer = document.getElementById('notificationContainer') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    
    const icon = type === 'success' ? '✓' : '✕';
    notification.innerHTML = `<span style="margin-right: 10px;">${icon}</span>${message}`;
    
    notificationContainer.appendChild(notification);
    
    // Add show animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notificationContainer';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(container);
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            background: #10b981;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            pointer-events: auto;
            display: flex;
            align-items: center;
            min-width: 300px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.error {
            background: #ef4444;
        }
        
        .notification.warning {
            background: #f59e0b;
        }
        
        @media (max-width: 480px) {
            .notification {
                min-width: auto;
                right: 10px;
                left: 10px;
            }
        }
    `;
    document.head.appendChild(style);
    
    return container;
}

// =====================================================
// 7. CONTACT FORM HANDLER
// =====================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Mohon isi semua kolom!', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Email tidak valid!', 'error');
            return;
        }
        
        // Validate message length
        if (message.length < 10) {
            showNotification('Pesan minimal 10 karakter!', 'error');
            return;
        }
        
        // Disable button during submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';
        
        try {
            // Simulate API call or integrate with real backend
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Success message
            showNotification('✓ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// =====================================================
// 8. INTERSECTION OBSERVER FOR FADE-IN ANIMATION
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate class
document.querySelectorAll('.project-card, .skill-item, .stat').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// =====================================================
// 9. COUNTER ANIMATION FOR STATISTICS
// =====================================================

function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 60;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            currentValue = Math.floor(finalValue * progress);
            stat.textContent = currentValue + '+';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                stat.textContent = finalValue + '+';
            }
        };
        
        animate();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
let countAnimated = false;

if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countAnimated) {
                animateCounters();
                countAnimated = true;
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    aboutObserver.observe(aboutSection);
}

// =====================================================
// 10. PARALLAX EFFECT FOR HERO SECTION
// =====================================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 1000) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    }
});

// =====================================================
// 11. SMOOTH SCROLL TO TOP BUTTON
// =====================================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.setAttribute('aria-label', 'Scroll to top');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #f093fb);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// =====================================================
// 12. KEYBOARD NAVIGATION
// =====================================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// =====================================================
// 13. PERFORMANCE OPTIMIZATION - REQUEST ANIMATION FRAME FOR SCROLL EVENTS
// =====================================================

let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        requestAnimationFrame(() => {
            // Additional scroll-based animations can go here
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// =====================================================
// 14. INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Create scroll to top button
    createScrollToTopButton();
    
    // Initialize form validation on input
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = 'var(--border-color)';
        });
        
        input.addEventListener('invalid', function() {
            this.style.borderColor = '#ef4444';
        });
    });
    
    console.log('Portfolio initialized successfully! 🚀');
});

// =====================================================
// 15. TOUCH SUPPORT FOR MOBILE
// =====================================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left
    } else if (touchEndX > touchStartX + 50) {
        // Swiped right - close mobile menu
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}

// =====================================================
// 16. PREFETCH RESOURCES FOR BETTER PERFORMANCE
// =====================================================

if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload images that might be needed
        const preloadImages = [
            'https://res.cloudinary.com/dnthr5do8/image/upload/c_pad,ar_3:4/v1780788258/Hasan_BG_MERAH_n5rxkc.jpg',
            'https://res.cloudinary.com/dnthr5do8/image/upload/q_auto/f_auto/v1780787800/Hasan_Naufal_Salim_ggghkp.jpg'
        ];
        
        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
}

// =====================================================
// 17. CONSOLE WELCOME MESSAGE
// =====================================================

console.log(
    '%c👋 Selamat datang di Portfolio Hasan Naufal Salim!',
    'font-size: 16px; font-weight: bold; color: #667eea;'
);
console.log(
    '%cTerima kasih telah mengunjungi portfolio saya. Jika Anda tertarik berkolaborasi, hubungi saya melalui form kontak atau media sosial!',
    'font-size: 14px; color: #718096;'
);

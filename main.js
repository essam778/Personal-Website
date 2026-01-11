// Main JavaScript file for Essam Hisham's Portfolio
// Handles animations, interactions, and dynamic content

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTypewriter();
    initSkillBars();
    initSkillFilter();

    initContactForm();
    initParticleBackground();
    initScrollAnimations();
    initProjectFilter();
});


// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            console.log('Scrolling to:', targetId, 'Target found:', !!target);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Particle background using p5.js
function initParticleBackground() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    try {
        new p5(function(p) {
        let particles = [];
        let numParticles = 50;
        
        p.setup = function() {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            for (let particle of particles) {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(100, 255, 218, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
                
                // Draw connections
                for (let other of particles) {
                    let distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(100, 255, 218, (1 - distance / 100) * 50);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                }
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    });
    } catch (error) {
        console.warn('Particle background failed to initialize:', error);
    }
}

// Typewriter effect for hero name
function initTypewriter() {
    const typedElement = document.getElementById('typed-name');
    if (!typedElement) return;
    
    try {
        new Typed('#typed-name', {
            strings: ['Essam Hisham'],
            typeSpeed: 100,
            startDelay: 500,
            showCursor: true,
            cursorChar: '|',
            onComplete: function() {
                // Add glow effect after typing
                typedElement.classList.add('glow-text');
            }
        });
    } catch (error) {
        console.warn('Typewriter failed to initialize:', error);
        // Fallback: just show the text
        typedElement.textContent = 'Essam Hisham';
        typedElement.classList.add('glow-text');
    }
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width && isElementInViewport(bar)) {
                setTimeout(() => {
                    bar.style.transform = `translateX(-${100 - width}%)`;
                }, 200);
            }
        });
    };
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    // Animate on load
    setTimeout(animateSkillBars, 1000);
}

// Skill filtering functionality
function initSkillFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        translateY: 20,
                        duration: 200,
                        easing: 'easeInQuad',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Project filtering functionality
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || (categories && categories.includes(filter))) {
                    card.classList.remove('hidden');
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        easing: 'easeOutQuad',
                        delay: anime.stagger(100)
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        scale: 0.8,
                        duration: 300,
                        easing: 'easeInQuad',
                        complete: () => {
                            card.classList.add('hidden');
                        }
                    });
                }
            });
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.section-reveal');
    console.log('Found', revealElements.length, 'reveal elements');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('revealed');
                console.log('Revealed element:', element.id || 'unnamed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!validateForm(formData)) {
            showMessage(errorMessage);
            return;
        }

        showLoadingState();

        // ✅ الكود الجديد الصح
        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          hideLoadingState();

          if (response.ok) {
            showMessage(successMessage);
            form.reset();
          } else {
            showMessage(errorMessage);
          }
        })
        .catch(error => {
          hideLoadingState();
          showMessage(errorMessage);
        });
    });

    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return data.name.trim() &&
               data.email.trim() &&
               emailRegex.test(data.email) &&
               data.subject.trim() &&
               data.message.trim();
    }

    function showLoadingState() {
        btnText.style.display = 'none';
        loading.style.display = 'flex';
        submitBtn.disabled = true;
    }

    function hideLoadingState() {
        btnText.style.display = 'block';
        loading.style.display = 'none';
        submitBtn.disabled = false;
    }

    function showMessage(messageElement) {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        messageElement.style.display = 'block';

        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}


// Project modal functionality
function initProjectModals() {
    // Open modal function
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId + '-modal');
        modal.style.display = 'block';  // Show the modal by changing its display to block
        
        // Add the 'active' class to modal
        modal.classList.add('active');
        
        // Animate modal content
        const content = modal.querySelector('.modal-content');
        anime({
            targets: content,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    };
    
    // Close modal function
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            const content = modal.querySelector('.modal-content');
            
            anime({
                targets: content,
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInQuad',
                complete: () => {
                    modal.style.display = 'none';  // Set display to 'none' after animation
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    };
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                const modalId = modal.id.replace('-modal', '');
                closeModal(modalId);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                const modalId = activeModal.id.replace('-modal', '');
                closeModal(modalId);
            }
        }
    });
}

// Call this function to initialize modals when the page is loaded
document.addEventListener('DOMContentLoaded', initProjectModals);



// Utility function to check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn-primary, button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            anime({
                targets: this,
                scale: [1, 0.95, 1],
                duration: 150,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Animate navigation links on hover
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -2,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
const debouncedScrollAnimations = debounce(() => {
    initScrollAnimations();
    initSkillBars();
}, 100);

window.addEventListener('scroll', debouncedScrollAnimations);

// Add loading animation
window.addEventListener('load', function() {
    // Fade in the page content
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });
    
    // Stagger animate elements
    const staggerElements = document.querySelectorAll('.card-hover, .project-card, .skill-card');
    anime({
        targets: staggerElements,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });
});

console.log('Main.js loaded successfully!');
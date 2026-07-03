/**
 * PixelForge Studio - Modern Online Portfolio Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon if fontawesome/unicode is used
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // Close mobile nav when link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
                const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });

    // 2. Sticky Navbar Scroll Effect & Active Navigation Link Highlight
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active section highlight in navigation
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset navbar height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                // If direct link matches or starts with hash
                const href = item.getAttribute('href');
                if (href && (href === `#${currentSectionId}` || href.endsWith(`#${currentSectionId}`))) {
                    navItems.forEach(n => n.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        }
    });

    // 3. Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. FAQ Accordion panel expansion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = question.classList.contains('active');
                
                // Close other open FAQ panels
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.maxHeight = null;
                    a.classList.remove('show');
                });

                // Toggle current FAQ panel
                if (!isActive) {
                    question.classList.add('active');
                    answer.classList.add('show');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // 5. Portfolio Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from buttons and set current
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterCategory = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterCategory === 'all' || cardCategory === filterCategory) {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // 6. Intersection Observer for Numeric Counters
    const counterItems = document.querySelectorAll('.stat-num');
    if (counterItems.length > 0) {
        const runCounters = (entry) => {
            const target = parseInt(entry.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            let start = 0;
            const stepTime = Math.abs(Math.floor(duration / target));
            
            const timer = setInterval(() => {
                start += 1;
                entry.textContent = start + (entry.dataset.suffix || '');
                if (start >= target) {
                    entry.textContent = target + (entry.dataset.suffix || '');
                    clearInterval(timer);
                }
            }, Math.max(stepTime, 15));
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterItems.forEach(item => counterObserver.observe(item));
    }

    // 7. Intersection Observer for Skills Progress Bars
    const progressLines = document.querySelectorAll('.skill-progress-line');
    if (progressLines.length > 0) {
        const progressObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const line = entry.target;
                    const percent = line.getAttribute('data-progress');
                    line.style.width = percent + '%';
                    observer.unobserve(line);
                }
            });
        }, { threshold: 0.5 });

        progressLines.forEach(line => progressObserver.observe(line));
    }

    // 8. Contact Form mock action
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email && subject && message) {
                alert(`Thank you, ${name}! Your response has been simulated successfully. We'll be in touch soon!`);
                contactForm.reset();
            } else {
                alert('Please fill out all required fields.');
            }
        });
    }

    // 9. Newsletter Form mock action
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Perfect! ${emailInput.value} has been registered to the PixelForge Newsletter mock system.`);
                emailInput.value = '';
            }
        });
    }
});

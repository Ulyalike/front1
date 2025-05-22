document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .work-card, .skill-card, .stat-item');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.7';
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '60px';
                cursorFollower.style.borderWidth = '2px';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.borderWidth = '1px';
            });
        });
    }

    // Magnetic buttons
    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--x', `${x / rect.width * 100}%`);
            button.style.setProperty('--y', `${y / rect.height * 100}%`);
        });

        button.addEventListener('mouseleave', () => {
            button.style.setProperty('--x', '50%');
            button.style.setProperty('--y', '50%');
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Animate hero title on load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('animate');
        }, 500);
    }

    // Animate stats counting
    const statItems = document.querySelectorAll('.stat-item');

    if (statItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statItems.forEach(item => {
                        const target = +item.getAttribute('data-count');
                        const count = +item.innerText;
                        const increment = target / 50;

                        if (count < target) {
                            const timer = setInterval(() => {
                                item.innerText = Math.ceil(count + increment);
                                if (+item.innerText >= target) {
                                    item.innerText = target;
                                    clearInterval(timer);
                                }
                            }, 20);
                        }
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.about-stats'));
    }

    // Animate skill bars
    const skillProgress = document.querySelectorAll('.skill-progress');

    if (skillProgress.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgress.forEach(progress => {
                        const width = progress.getAttribute('data-width');
                        progress.style.width = width + '%';
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(document.querySelector('.skills-grid'));
    }

    // Work filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    if (filterButtons.length > 0 && workCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                workCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form validation
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.textContent = '');

            let isValid = true;

            // Validate name
            const nameInput = document.getElementById('name');
            if (nameInput.value.length < 2) {
                nameInput.nextElementSibling.textContent = 'Имя должно содержать минимум 2 символа';
                isValid = false;
            }

            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.nextElementSibling.textContent = 'Пожалуйста, введите корректный email';
                isValid = false;
            }

            // Validate message
            const messageInput = document.getElementById('message');
            if (messageInput.value.length < 10) {
                messageInput.nextElementSibling.textContent = 'Сообщение должно содержать минимум 10 символов';
                isValid = false;
            }

            // If all validations pass
            if (isValid) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show an alert
                alert('Сообщение успешно отправлено! Спасибо за ваше обращение.');
                contactForm.reset();

                // Reset floating labels
                const labels = document.querySelectorAll('.form-group label');
                labels.forEach(label => {
                    if (!label.previousElementSibling.value) {
                        label.style.top = '15px';
                        label.style.fontSize = '1rem';
                        label.style.color = 'var(--text-light)';
                    }
                });
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
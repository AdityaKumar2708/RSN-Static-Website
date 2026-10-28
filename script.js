
// ========================================
// MOBILE MENU TOGGLE
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}


// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ========================================
// GALLERY SCROLL
// ========================================

const galleryWrapper = document.querySelector('.gallery-wrapper');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

if (galleryWrapper && leftBtn && rightBtn) {

    leftBtn.addEventListener('click', () => {
        galleryWrapper.scrollBy({
            left: -350,
            behavior: 'smooth'
        });
    });

    rightBtn.addEventListener('click', () => {
        galleryWrapper.scrollBy({
            left: 350,
            behavior: 'smooth'
        });
    });

    function updateGalleryButtons() {
        const scrollLeft = galleryWrapper.scrollLeft;
        const maxScroll =
            galleryWrapper.scrollWidth - galleryWrapper.clientWidth;

        leftBtn.style.opacity = scrollLeft > 50 ? '1' : '0.5';
        rightBtn.style.opacity =
            scrollLeft < maxScroll - 50 ? '1' : '0.5';
    }

    galleryWrapper.addEventListener('scroll', updateGalleryButtons);
    window.addEventListener('resize', updateGalleryButtons);

    updateGalleryButtons();
}


// ========================================
// INTERSECTION OBSERVER ANIMATIONS
// ========================================

if ('IntersectionObserver' in window) {

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.product-card, .gallery-item, .contact-item'
    ).forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(element);
    });
}


// ========================================
// CONTACT FORM
// SPRING BOOT + RESEND
// EMAILJS COMPLETELY REMOVED
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {

    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', async function (e) {

        e.preventDefault();

        if (!submitBtn) {
            console.error('Contact form submit button not found.');
            return;
        }

        // Get form values
        const formData = new FormData(contactForm);

        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const phone = String(formData.get('phone') || '').trim();
        const description = String(
            formData.get('description') || ''
        ).trim();

        // Validate required fields
        if (!name || !email || !phone || !description) {
            alert('Please fill in all fields.');
            return;
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Save original button text
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {

            // Send enquiry to Spring Boot backend
            const response = await fetch(
                'https://e-commerce-backend-kyir.onrender.com/api/contact',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        description: description
                    })
                }
            );

            // Read backend response
            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                console.error('Backend error:', result);

                throw new Error(
                    result.message ||
                    result.detail ||
                    'Unable to submit your enquiry. Please try again.'
                );
            }

            // Success
            alert(
                result.message ||
                'Thank you for contacting us! We will get back to you soon.'
            );

            contactForm.reset();

        } catch (error) {

            console.error('Contact form error:', error);

            alert(
                error.message ||
                'Unable to send your enquiry right now. Please try again later.'
            );

        } finally {

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}


// ========================================
// HEADER SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {

    const header = document.querySelector('.header');

    if (!header) return;

    if (window.scrollY > 100) {

        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';

    } else {

        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});
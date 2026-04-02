export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.container, .paper-card, blockquote, .hero-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        observer.observe(el);
    });
}

export function initPageTransitions() {
    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hostname === window.location.hostname && !this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const href = this.getAttribute('href');
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
}

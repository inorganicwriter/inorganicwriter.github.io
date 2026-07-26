const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollAnimations() {
    if (prefersReducedMotion) return;

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

    const animatedElements = document.querySelectorAll('#content > blockquote, #content > h2, #content > h3, #content > ul, #content[data-layout="contact"] > p');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        observer.observe(el);
    });
}

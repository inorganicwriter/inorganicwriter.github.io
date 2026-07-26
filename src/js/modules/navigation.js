const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (!hash || hash === '#' || hash === '#!') return;
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

export function initNavbarEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

export function initMobileMenu() {
    const nav = document.querySelector('header nav');
    if (!nav) return;

    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '&#9776;';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    nav.insertBefore(menuToggle, nav.firstChild);

    menuToggle.addEventListener('click', () => {
        const ul = nav.querySelector('ul');
        if (!ul) return;
        const isOpen = ul.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            const ul = nav.querySelector('ul');
            if (ul) ul.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

export function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '&uarr;';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.display = 'none';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    backToTop.style.display = 'none';
                }
            }, 200);
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
}

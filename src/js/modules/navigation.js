export function initSmoothScroll() {
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

export function initNavbarEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
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
    menuToggle.style.display = 'none';

    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        nav.insertBefore(menuToggle, nav.firstChild);
    }

    menuToggle.addEventListener('click', () => {
        const ul = nav.querySelector('ul');
        ul.classList.toggle('show');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            const ul = nav.querySelector('ul');
            if (ul) ul.classList.remove('show');
        }
    });
}

export function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '&uarr;';
    backToTop.className = 'back-to-top';
    backToTop.style.display = 'none';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTop.style.display = 'none';
                }
            }, 200);
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

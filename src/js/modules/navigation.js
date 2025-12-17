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
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 滚动时改变导航栏背景
        if (currentScroll > 100) {
            header.style.background = 'rgba(35, 39, 57, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // 当前页面高亮
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = '#ffd587';
        }
    });
}

export function initMobileMenu() {
    const nav = document.querySelector('header nav');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
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
            nav.querySelector('ul').classList.remove('show');
        }
    });
}

export function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.display = 'none';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTop.style.display = 'none';
                }
            }, 300);
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

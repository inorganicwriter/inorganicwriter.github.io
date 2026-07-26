const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let isTransitioning = false;

const PAGE_NAMES = {
    'index.html': 'Home',
    'about.html': 'About',
    'paper.html': 'Publications',
    'contact.html': 'Contact',
    '404.html': 'Not Found'
};

// Never intercept these — let the browser handle them natively
const SKIP_EXT = /\.(pdf|jpe?g|png|gif|svg|webp|docx?|xlsx?|zip|tar|gz|rar)$/i;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function typeText(el, text, speed) {
    return new Promise(resolve => {
        let i = 0;
        function step() {
            if (i < text.length) {
                const span = document.createElement('span');
                span.className = 'paper-char';
                span.textContent = text.charAt(i);
                el.appendChild(span);
                i++;
                setTimeout(step, speed);
            } else {
                resolve();
            }
        }
        step();
    });
}

async function performTransition(href) {
    isTransitioning = true;
    let overlay = null;

    // Safety net: if navigation doesn't unload the page within 3s
    // (e.g. browser downloaded a file instead of navigating), force
    // a cleanup so the overlay never traps the user.
    const safetyNet = setTimeout(() => {
        if (overlay) overlay.remove();
        isTransitioning = false;
    }, 3000);

    try {
        const pageName = PAGE_NAMES[href] || href.replace(/\.html$/, '');
        const text = '> loading ' + pageName + '...';

        overlay = document.createElement('div');
        overlay.className = 'typewriter-transition';

        const sheet = document.createElement('div');
        sheet.className = 'paper-sheet';

        const bar = document.createElement('div');
        bar.className = 'paper-bar';

        const bodyEl = document.createElement('div');
        bodyEl.className = 'paper-body';

        const line = document.createElement('span');
        line.className = 'paper-typed-text';

        const cursor = document.createElement('span');
        cursor.className = 'paper-cursor';

        bodyEl.appendChild(line);
        bodyEl.appendChild(cursor);
        sheet.appendChild(bar);
        sheet.appendChild(bodyEl);
        overlay.appendChild(sheet);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            sheet.classList.add('active');
        });

        await wait(440);
        await typeText(line, text, 32);
        await wait(360);

        sheet.classList.add('exit');
        await wait(80);
        overlay.classList.add('solid');
        await wait(300);

        try {
            sessionStorage.setItem('tw-transition', Date.now().toString());
        } catch (e) {}
        clearTimeout(safetyNet);
        window.location.href = href;
    } catch (err) {
        clearTimeout(safetyNet);
        if (overlay) overlay.remove();
        isTransitioning = false;
        console.error('[transition] failed, falling back', err);
        window.location.href = href;
    }
}

function shouldIntercept(link) {
    if (isTransitioning) return false;

    const href = link.getAttribute('href');
    if (!href) return false;
    if (link.target === '_blank') return false;
    if (link.hasAttribute('download')) return false;
    if (link.classList.contains('pdf-link')) return false;
    if (link.hostname !== window.location.hostname) return false;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (SKIP_EXT.test(href)) return false;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (href === currentPath) return false;

    return true;
}

export function initTypewriterTransition() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (!shouldIntercept(this)) return;
            e.preventDefault();
            performTransition(this.getAttribute('href'));
        });
    });
}

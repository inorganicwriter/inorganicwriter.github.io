import { prepare, layout } from '@chenglou/pretext';

/**
 * 1. Hero Typewriter Effect - Homepage name + subtitle typing animation.
 *    Targets the pure-Markdown hero: the first <h1> is the name and the
 *    paragraph two steps after it (image p, name h1, aka p, subtitle p) is
 *    the subtitle. No HTML classes required.
 */
export function initHeroTypewriter() {
    const home = document.querySelector('#content[data-layout="home"]');
    if (!home) return;

    const nameEl = home.querySelector('h1');
    const subtitleEl = home.querySelector('h1 + p + p');
    if (!nameEl || !subtitleEl) return;

    const nameText = nameEl.textContent;
    const subtitleText = subtitleEl.textContent.trim();

    nameEl.textContent = '';
    subtitleEl.textContent = '';
    nameEl.style.opacity = '1';
    subtitleEl.style.opacity = '1';

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    nameEl.appendChild(cursor);

    let charIndex = 0;
    const nameSpeed = 60;

    function typeName() {
        if (charIndex < nameText.length) {
            // Insert text before cursor
            const textNode = document.createTextNode(nameText.charAt(charIndex));
            nameEl.insertBefore(textNode, cursor);
            charIndex++;
            setTimeout(typeName, nameSpeed);
        } else {
            // Move cursor to subtitle
            nameEl.removeChild(cursor);
            subtitleEl.appendChild(cursor);
            charIndex = 0;
            setTimeout(typeSubtitle, 300);
        }
    }

    const subtitleSpeed = 20;
    function typeSubtitle() {
        if (charIndex < subtitleText.length) {
            const textNode = document.createTextNode(subtitleText.charAt(charIndex));
            subtitleEl.insertBefore(textNode, cursor);
            charIndex++;
            setTimeout(typeSubtitle, subtitleSpeed);
        } else {
            // Blink cursor for a while then remove
            setTimeout(() => {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
                cursor.style.transition = 'opacity 0.5s ease';
            }, 2000);
        }
    }

    setTimeout(typeName, 400);
}

/**
 * 2. Nav Underline - width measured via pretext
 */
export function initNavUnderlines() {
    const navLinks = document.querySelectorAll('header nav a');
    if (!navLinks.length) return;

    navLinks.forEach(link => {
        const text = link.textContent.trim();

        // Add underline element
        const underline = document.createElement('span');
        underline.className = 'nav-underline';
        link.appendChild(underline);

        try {
            const font = window.getComputedStyle(link).font || '15px "Helvetica Neue"';
            const prepared = prepare(text, { font });
            const result = layout(prepared, 1000, 20);
            if (typeof result.width !== 'number') throw new Error('pretext: no width');
            link.style.setProperty('--text-width', result.width + 'px');
        } catch (e) {
            // Fallback: canvas text measurement
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = window.getComputedStyle(link).font || '15px "Helvetica Neue"';
            link.style.setProperty('--text-width', ctx.measureText(text).width + 'px');
        }
    });

    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

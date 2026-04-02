import { prepare, layout } from '@chenglou/pretext';

/**
 * 1. Hero Typewriter Effect - Homepage title typing animation
 */
export function initHeroTypewriter() {
    const nameEl = document.getElementById('hero-name');
    const subtitleEl = document.getElementById('hero-subtitle');
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
 * 2. Paper Title Hover Underline - Precise width using pretext
 */
export function initPaperTitleUnderlines() {
    const paperCards = document.querySelectorAll('.paper-card');
    if (!paperCards.length) return;

    paperCards.forEach(card => {
        const h3 = card.querySelector('h3');
        if (!h3) return;

        const titleText = h3.textContent.trim();

        // Use pretext to measure the text width
        try {
            const font = window.getComputedStyle(h3).font || '17px Georgia';
            const prepared = prepare(titleText, font);
            const containerWidth = h3.offsetWidth;
            const result = layout(prepared, containerWidth, 24);

            // Store measured info for CSS
            h3.style.setProperty('--title-width', containerWidth + 'px');
        } catch (e) {
            // Fallback: just use 100%
            h3.style.setProperty('--title-width', '100%');
        }

        // Add underline element
        const underline = document.createElement('span');
        underline.className = 'title-underline';
        h3.appendChild(underline);
    });
}

/**
 * 3. Nav Underline - Precise text width measurement
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
            const prepared = prepare(text, font);
            // For single-line nav text, measure at a very wide width
            const result = layout(prepared, 500, 20);

            // Use canvas to get precise single-line width
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = font;
            const measured = ctx.measureText(text);
            link.style.setProperty('--text-width', measured.width + 'px');
        } catch (e) {
            // Fallback
            link.style.setProperty('--text-width', 'calc(100% - 40px)');
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

/**
 * 4. Smart Text Container - Smooth height transitions for language switch
 */
export function initSmartTextContainer() {
    const enText = document.getElementById('profile-text-en');
    const zhText = document.getElementById('profile-text-zh');
    if (!enText || !zhText) return;

    const container = enText.parentElement;
    if (!container) return;

    // Pre-measure both text heights using pretext
    try {
        const font = window.getComputedStyle(enText).font || '15px Georgia';
        const containerWidth = container.offsetWidth;

        const enPrepared = prepare(enText.textContent.trim(), font);
        const zhPrepared = prepare(zhText.textContent.trim(), font);

        const enResult = layout(enPrepared, containerWidth, 24);
        const zhResult = layout(zhPrepared, containerWidth, 24);

        // Store heights for smooth transitions
        container.dataset.enHeight = enResult.height;
        container.dataset.zhHeight = zhResult.height;
    } catch (e) {
        // Pretext measurement failed, will use natural height
    }

    // Add smooth transition to container
    container.style.transition = 'height 0.3s ease';
    container.style.overflow = 'hidden';
}

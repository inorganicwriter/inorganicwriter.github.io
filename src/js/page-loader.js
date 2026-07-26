// Academic typewriter loading animation — a sheet of paper rises and types
// the loading message, matching the page-transition aesthetic.
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function createLoader() {
        if (document.getElementById('page-loader')) return;

        const overlay = document.createElement('div');
        overlay.id = 'page-loader';
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

        const mount = document.body || document.documentElement;
        mount.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('active');
            sheet.classList.add('active');
        });

        const fullText = '> loading inorganicwriter.github.io';

        if (prefersReducedMotion) {
            line.textContent = fullText;
            return;
        }

        let charIndex = 0;
        const typingSpeed = 40;

        function typeChar() {
            if (charIndex < fullText.length) {
                const span = document.createElement('span');
                span.className = 'paper-char';
                span.textContent = fullText.charAt(charIndex);
                line.appendChild(span);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }

        setTimeout(typeChar, 440);
    }

    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.4s ease';
                setTimeout(() => {
                    loader.style.display = 'none';
                    loader.remove();
                }, 400);
            }, 300);
        }
    }

    function fixScrollPosition() {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }

    function init() {
        if (prefersReducedMotion) {
            fixScrollPosition();
            return;
        }

        // Skip the loader if we just arrived via a typewriter transition —
        // the transition overlay already provided the visual handoff, and
        // this module executes after prerendered content is already visible.
        try {
            const ts = sessionStorage.getItem('tw-transition');
            if (ts && Date.now() - parseInt(ts, 10) < 5000) {
                sessionStorage.removeItem('tw-transition');
                fixScrollPosition();
                return;
            }
        } catch (e) {}

        createLoader();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createLoader);
        }

        window.addEventListener('load', function () {
            fixScrollPosition();
            hideLoader();
        });
    }

    init();
})();

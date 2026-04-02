// Academic typewriter loading animation
(function () {
    'use strict';

    function createLoader() {
        if (document.getElementById('page-loader')) return;

        const loader = document.createElement('div');
        loader.id = 'page-loader';

        const textContainer = document.createElement('div');
        textContainer.className = 'loader-text';

        const textSpan = document.createElement('span');
        textSpan.id = 'loader-typed-text';
        textContainer.appendChild(textSpan);

        const cursor = document.createElement('span');
        cursor.className = 'loader-cursor';
        textContainer.appendChild(cursor);

        loader.appendChild(textContainer);

        if (document.body) {
            document.body.insertAdjacentElement('afterbegin', loader);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.insertAdjacentElement('afterbegin', loader);
            });
        }

        // Typewriter effect
        const fullText = '> loading inorganicwriter.github.io';
        let charIndex = 0;
        const typingSpeed = 40;

        function typeChar() {
            if (charIndex < fullText.length) {
                textSpan.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }

        setTimeout(typeChar, 200);
    }

    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
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

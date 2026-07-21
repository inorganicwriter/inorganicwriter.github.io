import { renderLayout } from './modules/layout.js';
import { initScrollAnimations, initPageTransitions } from './modules/animations.js';
import { initSmoothScroll, initNavbarEffects, initMobileMenu, createBackToTop, initLanguageToggle } from './modules/navigation.js';
import { initHeroTypewriter, initNavUnderlines } from './modules/text-effects.js';
import { loadContent } from './modules/markdown-loader.js';

const page = document.body.dataset.page || 'home';

// Effects that depend on the rendered Markdown content. Re-run on every
// (re)render so language switches animate the freshly injected DOM.
function applyPageEffects() {
    if (page === 'home') initHeroTypewriter();
    initScrollAnimations();
}

async function renderPage(lang) {
    const container = document.getElementById('content');
    if (!container) return;

    container.innerHTML = '<div class="content-loading">Loading…</div>';
    try {
        const meta = await loadContent(container, page, lang);
        if (meta && meta.title) document.title = meta.title;
        applyPageEffects();
    } catch (err) {
        console.error('[content] failed to render page', err);
        container.innerHTML = '<p class="markdown-error">内容加载失败：' + page + '.' + lang + '.md</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Page fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);

    // Render shared chrome (nav + footer), then wire architecture behaviour
    renderLayout();
    initSmoothScroll();
    initNavbarEffects();
    initMobileMenu();
    createBackToTop();
    initNavUnderlines();

    // Load the page content for the stored language, then enable toggling
    const lang = localStorage.getItem('site-lang') || 'en';
    renderPage(lang).then(() => initPageTransitions());
    initLanguageToggle(renderPage);
});

import { renderLayout } from './modules/layout.js';
import { initScrollAnimations } from './modules/animations.js';
import { initSmoothScroll, initNavbarEffects, initMobileMenu, createBackToTop } from './modules/navigation.js';
import { initHeroTypewriter, initNavUnderlines } from './modules/text-effects.js';
import { loadContent } from './modules/markdown-loader.js';
import { initTypewriterTransition } from './modules/transition.js';

const page = document.body.dataset.page || 'home';

// Effects that depend on the rendered Markdown content. Run after content
// is injected so they target the freshly rendered DOM.
function applyPageEffects() {
    if (page === 'home') initHeroTypewriter();

    // Skip scroll-in animations when arriving via a typewriter transition —
    // prerendered content is already visible and re-hiding it causes a flash.
    let viaTransition = false;
    try {
        const ts = sessionStorage.getItem('tw-transition');
        if (ts && Date.now() - parseInt(ts, 10) < 5000) {
            viaTransition = true;
            sessionStorage.removeItem('tw-transition');
        }
    } catch (e) {}

    if (!viaTransition) initScrollAnimations();
}

async function renderPage() {
    const container = document.getElementById('content');
    if (!container) return;

    if (container.dataset.prerendered !== 'true') {
        container.innerHTML = '<div class="content-loading">Loading…</div>';
    }
    try {
        const meta = await loadContent(container, page);
        if (meta && meta.title) document.title = meta.title;
        applyPageEffects();
    } catch (err) {
        console.error('[content] failed to render page', err);
        container.innerHTML = '<p class="markdown-error">内容加载失败：' + page + '.md</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Render shared chrome (nav + footer), then wire architecture behaviour
    renderLayout();
    initSmoothScroll();
    initNavbarEffects();
    initMobileMenu();
    createBackToTop();
    initNavUnderlines();

    // Load the page content, then wire page transitions
    renderPage().then(() => initTypewriterTransition());
});

import { initScrollAnimations, initPageTransitions } from './modules/animations.js';
import { initSmoothScroll, initNavbarEffects, initMobileMenu, createBackToTop } from './modules/navigation.js';
import { initHeroTypewriter, initPaperTitleUnderlines, initNavUnderlines, initSmartTextContainer } from './modules/text-effects.js';
import { initLazyLoading } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Page fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);

    // Core navigation
    initSmoothScroll();
    initNavbarEffects();
    initMobileMenu();
    createBackToTop();

    // Pretext-powered effects
    initNavUnderlines();
    initHeroTypewriter();
    initPaperTitleUnderlines();
    initSmartTextContainer();

    // Animations
    initScrollAnimations();
    initPageTransitions();

    // Utils
    initLazyLoading();
});

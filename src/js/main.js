import { initScrollAnimations, initTypingEffect, initCardAnimations, initPageTransitions } from './modules/animations.js';
import { initParticleBackground } from './modules/particles.js';
import { initSmoothScroll, initNavbarEffects, initMobileMenu, createBackToTop } from './modules/navigation.js';
import { initCursorEffect } from './modules/cursor.js';
import { initLazyLoading } from './modules/utils.js';

// Import Styles (Optional, if we want JS to drive CSS loading, but we used <link> in HTML)
// import '../styles/main.scss'; 

document.addEventListener('DOMContentLoaded', () => {
    // Page Fade In
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Initialization
    initScrollAnimations();
    initParticleBackground();
    initTypingEffect();
    initSmoothScroll();
    initNavbarEffects();
    initCardAnimations();
    initCursorEffect();
    initMobileMenu();
    initLazyLoading();
    createBackToTop();
    initPageTransitions();
});

import { initAuthModals } from './components/auth/authModals.js';
import { initNavbar } from './components/navbar.js';
import { initSmoothScroll } from './components/smoothScroll.js';
import { initNavbarAuth } from './components/auth/navbarAuth.js';
import { initCtaSection } from './components/sections/ctaSection.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initAuthModals();
    initNavbar();
    initNavbarAuth();
    initSmoothScroll();
    initCtaSection();
});
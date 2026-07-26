import { marked } from 'marked';
import { parseFrontmatter } from './frontmatter.js';

function enhanceContent(container, layout) {
    if (layout === 'home') {
        const firstP = container.querySelector('p:first-child');
        if (firstP && firstP.querySelector('img')) firstP.classList.add('hero-avatar');
        const h1 = container.querySelector('h1');
        if (h1) {
            h1.classList.add('hero-name');
            const aka = h1.nextElementSibling;
            if (aka && aka.tagName === 'P') aka.classList.add('hero-tagline');
            const bio = aka && aka.nextElementSibling;
            if (bio && bio.tagName === 'P') bio.classList.add('hero-bio');
            const links = bio && bio.nextElementSibling;
            if (links && links.tagName === 'P') links.classList.add('hero-links');
        }
    } else if (layout === 'profile') {
        const firstP = container.querySelector('p:first-child');
        if (firstP && firstP.querySelector('img')) firstP.classList.add('profile-avatar');
    } else if (layout === 'papers') {
        container.querySelectorAll('h3').forEach(h3 => {
            const meta = h3.nextElementSibling;
            if (meta && meta.tagName === 'P') meta.classList.add('paper-meta');
            const detail = meta && meta.nextElementSibling;
            if (detail && detail.tagName === 'P') detail.classList.add('paper-detail');
            const links = detail && detail.nextElementSibling;
            if (links && links.tagName === 'P') links.classList.add('paper-links');
        });
    }
}

function stylePdfLinks(container) {
    container.querySelectorAll('a[href$=".pdf"]').forEach(a => {
        a.classList.add('pdf-link');
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
        if (!a.querySelector('.pdf-icon')) {
            const icon = document.createElement('span');
            icon.className = 'pdf-icon';
            icon.setAttribute('aria-hidden', 'true');
            a.insertBefore(icon, a.firstChild);
        }
    });
}

function fadeInImages(container) {
    container.querySelectorAll('.hero-avatar img, .profile-avatar img').forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            requestAnimationFrame(() => { img.style.opacity = '1'; });
        } else {
            img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
            img.addEventListener('error', () => { img.style.opacity = '1'; }, { once: true });
        }
    });
}

export async function loadContent(container, page) {
    if (container.dataset.prerendered === 'true') {
        const layout = container.dataset.layout || null;
        enhanceContent(container, layout);
        stylePdfLinks(container);
        fadeInImages(container);
        return { title: null, layout };
    }

    const file = page + '.md';
    const url = new URL('content/' + file, document.baseURI).href;

    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' while loading ' + file);

    const raw = await res.text();
    const { data, content } = parseFrontmatter(raw);

    container.innerHTML = marked.parse(content);
    container.classList.add('markdown-body', 'markdown-ready');
    if (data.layout) container.dataset.layout = data.layout;

    enhanceContent(container, data.layout);
    stylePdfLinks(container);
    fadeInImages(container);

    return { title: data.title || null, layout: data.layout || null };
}

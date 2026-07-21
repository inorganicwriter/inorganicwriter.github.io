// Renders the shared site chrome (header nav + language toggle, footer) into
// the minimal HTML shells. This keeps all structural/layout markup in one
// place (architecture) instead of duplicating it across every page.

const NAV_ITEMS = [
    { href: 'index.html', key: 'home', label: 'Home' },
    { href: 'about.html', key: 'about', label: 'About' },
    { href: 'paper.html', key: 'paper', label: 'Publications' },
    { href: 'contact.html', key: 'contact', label: 'Contact' }
];

export function renderLayout() {
    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');
    const page = document.body.dataset.page || 'home';

    if (header) {
        const nav = document.createElement('nav');

        const inner = document.createElement('div');
        const ul = document.createElement('ul');
        NAV_ITEMS.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            if (item.key === page) a.classList.add('active');
            li.appendChild(a);
            ul.appendChild(li);
        });
        inner.appendChild(ul);
        nav.appendChild(inner);

        const toggle = document.createElement('button');
        toggle.id = 'lang-toggle';
        toggle.className = 'lang-toggle';
        toggle.type = 'button';
        nav.appendChild(toggle);

        header.appendChild(nav);
    }

    if (footer) {
        const p = document.createElement('p');
        const year = new Date().getFullYear();
        p.innerHTML = '&copy; ' + year + ' Sirun Li. All rights reserved.';
        footer.appendChild(p);
    }
}

import { marked } from 'marked';
import { readFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import { parseFrontmatter } from '../src/js/modules/frontmatter.js';

function enhanceRenderedHtml(html, layout) {
    let result = html;

    if (layout === 'home') {
        result = result.replace('<p><img', '<p class="hero-avatar"><img');
        result = result.replace('<h1>', '<h1 class="hero-name">');
    } else if (layout === 'profile') {
        result = result.replace('<p><img', '<p class="profile-avatar"><img');
    }

    result = result.replace(
        /<a href="([^"]*\.pdf)"/g,
        '<a class="pdf-link" href="$1" target="_blank" rel="noopener"'
    );

    return result;
}

export function prerenderPlugin() {
    return {
        name: 'prerender-markdown',
        transformIndexHtml: {
            order: 'pre',
            handler(html, ctx) {
                const htmlName = basename(ctx.path);
                const pageName = htmlName === 'index.html' ? 'home' : htmlName.replace('.html', '');
                const mdPath = resolve(process.cwd(), 'public/content', pageName + '.md');
                if (!existsSync(mdPath)) return html;

                const raw = readFileSync(mdPath, 'utf8');
                const { data, content } = parseFrontmatter(raw);
                let rendered = marked.parse(content);
                rendered = enhanceRenderedHtml(rendered, data.layout);

                let result = html.replace(
                    /<main id="content" class="markdown-body">\s*<\/main>/,
                    `<main id="content" class="markdown-body markdown-ready" data-layout="${data.layout || ''}" data-prerendered="true">${rendered}</main>`
                );

                if (data.title) {
                    result = result.replace(/<title>.*?<\/title>/, `<title>${data.title}</title>`);
                }

                if (data.layout === 'home' || data.layout === 'profile') {
                    const critical =
                        '<style>' +
                        '#content .hero-avatar img,#content .profile-avatar img{opacity:0;transition:opacity .5s ease}' +
                        '</style>' +
                        '<noscript><style>#content img{opacity:1!important}</style></noscript>';
                    result = result.replace('</head>', critical + '</head>');
                }

                return result;
            }
        },
        configureServer(server) {
            const contentDir = resolve(process.cwd(), 'public/content');
            server.watcher.add(contentDir);
            server.watcher.on('change', (file) => {
                if (file.endsWith('.md') && file.includes('content')) {
                    server.ws.send({ type: 'full-reload' });
                }
            });
        }
    };
}

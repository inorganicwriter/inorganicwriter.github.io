import { marked } from 'marked';

// Parse a simple YAML-ish frontmatter block (key: value pairs) and return the
// remaining Markdown body. This keeps page metadata (title, layout) in the
// content file while the architecture reads it at runtime.
export function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return { data: {}, content: raw };

    const fm = match[1];
    const content = raw.slice(match[0].length);
    const data = {};

    fm.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx === -1) return;
        const key = line.slice(0, idx).trim();
        if (!key) return;
        let val = line.slice(idx + 1).trim();
        if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
        ) {
            val = val.slice(1, -1);
        }
        data[key] = val;
    });

    return { data, content };
}

// Fetch a content Markdown file (content/{page}.md), strip its
// frontmatter, render the body with marked, and inject it into `container`.
// Returns the parsed frontmatter so the caller can set the document title etc.
export async function loadContent(container, page) {
    const file = page + '.md';
    const url = new URL('content/' + file, document.baseURI).href;

    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' while loading ' + file);

    const raw = await res.text();
    const { data, content } = parseFrontmatter(raw);

    container.innerHTML = marked.parse(content);
    container.classList.add('markdown-body', 'markdown-ready');
    if (data.layout) container.dataset.layout = data.layout;

    return { title: data.title || null, layout: data.layout || null };
}

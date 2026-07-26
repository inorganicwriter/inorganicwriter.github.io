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

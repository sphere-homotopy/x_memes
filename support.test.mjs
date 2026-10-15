import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const supportTarget = 'https://ko-fi.com/sphere_homotopy';

// All standalone projects live at / or in top-level directories. The /go/
// tree contains tracking redirects, not projects; docs and scripts are not apps.
const excluded = new Set(['go', 'docs', 'scripts', 'analytics', 'node_modules']);

const pages = [{ path: 'index.html', slug: 'mirrors', prefix: './' }];
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith('.') || excluded.has(entry.name)) continue;
  const path = `${entry.name}/index.html`;
  try {
    await readFile(new URL(path, root), 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  pages.push({ path, slug: entry.name, prefix: '../' });
}

for (const { path, slug, prefix } of pages) {
  test(`${path} uses the shared tracked Ko-fi support control and analytics`, async () => {
    const html = await readFile(new URL(path, root), 'utf8');
    assert.ok(html.includes(`href="${prefix}support.css"`), 'missing shared Ko-fi stylesheet');
    assert.ok(html.includes(`src="${prefix}analytics.js"`), 'missing Cloudflare analytics loader');
    assert.ok(html.includes(`href="${prefix}go/kofi/${slug}/"`), 'missing project-specific tracked Ko-fi link');
    assert.match(html, /class="support-project-wrap"/);
    assert.match(html, /class="support-project"/);
    assert.match(html, /rel="noopener noreferrer"/);
  });

  test(`${slug} has a tracked, noindex Ko-fi redirect`, async () => {
    const html = await readFile(new URL(`go/kofi/${slug}/index.html`, root), 'utf8');
    assert.ok(html.includes(`data-target="${supportTarget}"`));
    assert.ok(html.includes('src="../../../analytics.js"'));
    assert.ok(html.includes('name="robots" content="noindex,nofollow"'));
    assert.match(html, /setTimeout\(.*location\.replace/);
  });
}

test('shared support control displays the Ko-fi label and cup mark without an arrow', async () => {
  const css = await readFile(new URL('./support.css', import.meta.url), 'utf8');
  assert.match(css, /font-size:0/);
  assert.match(css, /data:image\/svg\+xml/);
  assert.match(css, /content:"Support me on Ko-fi"/);
  assert.doesNotMatch(css, /content:[^;}]*↗/);
});

test('Ko-fi mark sits close to the label', async () => {
  const css = await readFile(new URL('./support.css', import.meta.url), 'utf8');
  assert.match(css, /gap:4px/);
});

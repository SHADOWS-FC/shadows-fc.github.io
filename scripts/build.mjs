import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFile(path.join(root, name), 'utf8');
const [html, baseCss, designCss, data, app, icon] = await Promise.all([
  read('index.html'), read('styles.css'), read('editorial.css'), read('data.js'), read('app.js'), read('favicon.svg'),
]);
const embedded = new Map();
async function embed(file) {
  if (!embedded.has(file)) {
    const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }[path.extname(file).toLowerCase()];
    if (!mime) throw new Error(`Unsupported asset: ${file}`);
    embedded.set(file, `data:${mime};base64,${(await readFile(path.join(root, file))).toString('base64')}`);
  }
  return embedded.get(file);
}
let css = `${baseCss}\n${designCss}`;
// CSS custom-property values have a browser size limit. The PNG data URL is
// larger than that limit: embed it directly into the background declarations
// instead of routing it through --pitch-image in the standalone build.
css = css.replace(/--pitch-image:url\(['"]?assets\/night-pitch\.png['"]?\);/, '')
  .replaceAll('var(--pitch-image)', "url('assets/night-pitch.png')");
for (const [full, asset] of [...css.matchAll(/url\(['"]?(assets\/[^'"\)]+)['"]?\)/g)]) {
  css = css.replaceAll(full, `url("${await embed(asset)}")`);
}
let embeddedData = data;
for (const [full, asset] of [...data.matchAll(/photo:\s*'(assets\/[^']+)'/g)]) {
  embeddedData = embeddedData.replaceAll(full, `photo: ${JSON.stringify(await embed(asset))}`);
}
const script = `${embeddedData.replace(/^export /gm, '')}\n${app.replace(/^import .* from '\.\/data.js';\n/m, '')}`;
let output = html
  .replace('<link rel="stylesheet" href="styles.css">', () => `<style>\n${css}\n</style>`)
  .replace('<link rel="stylesheet" href="editorial.css">', '')
  .replace('<link rel="preload" as="image" href="assets/night-pitch.png">', '')
  .replace('<script type="module" src="app.js"></script>', '')
  .replace('href="favicon.svg"', () => `href="data:image/svg+xml,${encodeURIComponent(icon.trim())}"`)
  .replace('</body>', () => `<script>\n${script.replace(/<\/script/gi, '<\\/script')}\n</script>\n</body>`);
for (const [full, asset] of [...output.matchAll(/src="(assets\/[^"<>]+)"/g)]) {
  output = output.replaceAll(full, `src="${await embed(asset)}"`);
}
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), output);
console.log('Built dist/index.html — self-contained website; no external assets or build dependencies.');

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFile(path.join(root, name), 'utf8');
const [html, baseCss, designCss, paletteCss, galleryCss, backgroundCss, themeCss, careerCss, crestCss, languageCss, competitionCss, data, i18n, app] = await Promise.all([
  read('index.html'), read('styles.css'), read('editorial.css'), read('black-pink.css'), read('gallery.css'), read('background-details.css'), read('theme.css'), read('career.css'), read('crest-display.css'), read('language.css'), read('competition.css'), read('data.js'), read('i18n.js'), read('app.js'),
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
let css = `${baseCss}\n${designCss}\n${paletteCss}\n${galleryCss}\n${backgroundCss}\n${themeCss}\n${careerCss}\n${crestCss}\n${languageCss}\n${competitionCss}`;
// CSS custom-property values have a browser size limit. The PNG data URL is
// larger than that limit: embed it directly into the background declarations
// instead of routing it through --pitch-image in the standalone build.
css = css.replace(/--pitch-image:url\(['"]?assets\/night-pitch\.png['"]?\);/, '')
  .replaceAll('var(--pitch-image)', "url('assets/night-pitch.png')");
for (const [full, asset] of [...css.matchAll(/url\(['"]?(assets\/[^'"\)]+)['"]?\)/g)]) {
  css = css.replaceAll(full, `url("${await embed(asset)}")`);
}
let embeddedData = data;
for (const [full, property, asset] of [...data.matchAll(/(photo|logo|matchLogo):\s*'(assets\/[^']+)'/g)]) {
  embeddedData = embeddedData.replaceAll(full, `${property}: ${JSON.stringify(await embed(asset))}`);
}
const script = `${embeddedData.replace(/^export /gm, '')}\n${i18n.replace(/^export /gm, '')}\n${app.replace(/^import .* from '\.\/(?:data|i18n)\.js(?:\?[^']*)?';\n/gm, '')}`;
let output = html
  .replace(/<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?">/, () => `<style>\n${css}\n</style>`)
  .replace(/<link rel="stylesheet" href="editorial\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="black-pink\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="gallery\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="background-details\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="theme\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="career\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="crest-display\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="language\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="stylesheet" href="competition\.css(?:\?[^"]*)?">/, '')
  .replace(/<link rel="preload" as="image" href="assets\/[^"]+">/, '')
  .replace(/<script type="module" src="app\.js(?:\?[^"]*)?"><\/script>/, '')
  .replace('</body>', () => `<script>\n${script.replace(/<\/script/gi, '<\\/script')}\n</script>\n</body>`);
for (const [full, attribute, asset] of [...output.matchAll(/(src|href)="(assets\/[^"<>]+)"/g)]) {
  output = output.replaceAll(full, `${attribute}="${await embed(asset)}"`);
}
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), output);
console.log('Built dist/index.html — self-contained website; no external assets or build dependencies.');

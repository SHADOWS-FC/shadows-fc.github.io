// Display-only alpha masks: original club files and their artwork stay intact.
// Flood from the image edge, so enclosed white/black details remain untouched.
const crestMasks = new Map();

export function createCrestMask(source) {
  if (crestMasks.has(source)) return crestMasks.get(source);
  const pending = (async () => {
    const image = new Image();
    image.src = source;
    await image.decode();
    const scale = Math.min(1, 1536 / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height);
    const rgba = pixels.data;
    const corners = [0, width - 1, width * (height - 1), width * height - 1];
    // A badge already cut out must retain its existing alpha and border.
    if (corners.some(index => rgba[index * 4 + 3] < 32)) return null;
    const background = [0, 1, 2].map(channel => corners.reduce((sum, index) => sum + rgba[index * 4 + channel], 0) / 4);
    const distance = index => Math.max(Math.abs(rgba[index * 4] - background[0]), Math.abs(rgba[index * 4 + 1] - background[1]), Math.abs(rgba[index * 4 + 2] - background[2]));
    // Non-uniform photographic surroundings need an approved cutout, not a guess.
    if (corners.some(index => distance(index) > 45)) return null;
    const queue = new Uint32Array(width * height);
    let head = 0, tail = 0;
    function add(index) {
      if (rgba[index * 4 + 3] === 0 || distance(index) > 48) return;
      rgba[index * 4 + 3] = 0;
      queue[tail++] = index;
    }
    for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
    for (let y = 1; y < height - 1; y++) { add(y * width); add(y * width + width - 1); }
    while (head < tail) {
      const index = queue[head++], x = index % width;
      if (x) add(index - 1);
      if (x < width - 1) add(index + 1);
      if (index >= width) add(index - width);
      if (index < width * (height - 1)) add(index + width);
    }
    context.putImageData(pixels, 0, 0);
    return canvas.toDataURL('image/png');
  })().catch(() => null);
  crestMasks.set(source, pending);
  return pending;
}

export function renderCrestMasks() {
  document.querySelectorAll('.brand-crest,.footer-seal img,.match-crest,.career-logo img').forEach(image => {
    if (image.dataset.crestMask) return;
    image.dataset.crestMask = 'pending';
    const source = image.getAttribute('src');
    createCrestMask(source).then(mask => {
      if (mask) {
        image.style.maskImage = `url("${mask}")`;
        image.style.maskMode = 'alpha';
        image.style.maskSize = getComputedStyle(image).objectFit === 'cover' ? 'cover' : 'contain';
        image.style.maskPosition = getComputedStyle(image).objectPosition;
        image.style.maskRepeat = 'no-repeat';
        if (image.classList.contains('brand-crest')) {
          const icon = document.querySelector('link[rel="icon"]');
          if (icon) { icon.href = mask; icon.type = 'image/png'; }
        }
      }
      image.dataset.crestMask = mask ? 'ready' : 'native';
    });
  });
}

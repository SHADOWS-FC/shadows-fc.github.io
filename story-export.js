// Story artwork uses the current club records and local assets. The PNG itself
// cannot contain Instagram's interactive link sticker; the sharing UI adds that
// instruction and provides a separate destination URL.
const WIDTH = 1080;
const HEIGHT = 1920;
const PINK = '#ff3299';
const WHITE = '#fff4fb';
const MUTED = '#bdadbd';
const DISPLAY = '"Shadows Condensed", "Arial Narrow", Arial, sans-serif';
const images = new Map();

function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (!images.has(src)) {
    const pending = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to load a story crest.'));
      image.src = src;
    }).catch(error => { images.delete(src); throw error; });
    images.set(src, pending);
  }
  return images.get(src);
}

function text(ctx, value, x, y, { size = 32, width = 952, color = WHITE, align = 'left', weight = 700, min = 18 } = {}) {
  const label = String(value ?? '');
  ctx.fillStyle = color;
  ctx.textAlign = align;
  while (size > min) {
    ctx.font = `${weight} ${size}px ${DISPLAY}`;
    if (ctx.measureText(label).width <= width) break;
    size--;
  }
  ctx.font = `${weight} ${size}px ${DISPLAY}`;
  ctx.fillText(label, x, y, width);
}

function lines(ctx, value, x, y, { size = 80, width = 952, lineHeight = 88, align = 'left', color = WHITE } = {}) {
  const words = String(value ?? '').split(/\s+/);
  ctx.font = `900 ${size}px ${DISPLAY}`;
  const rows = [];
  let row = '';
  for (const word of words) {
    const candidate = row ? `${row} ${word}` : word;
    if (row && ctx.measureText(candidate).width > width) { rows.push(row); row = word; }
    else row = candidate;
  }
  if (row) rows.push(row);
  rows.forEach((label, index) => text(ctx, label, x, y + lineHeight * index, { size, width, align, color, weight: 900 }));
  return rows.length;
}

function badge(ctx, image, x, y, size, shape, fallback = '') {
  if (!image) {
    ctx.strokeStyle = '#5b4255';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
    text(ctx, fallback, x + size / 2, y + size * .64, { size: size * .42, min: 12, width: size * .8, align: 'center', color: MUTED });
    return;
  }
  if (shape === 'legrena') {
    // Frame only the empty portrait margins, like the supplied crest on site.
    const crop = Math.min(image.naturalWidth, image.naturalHeight);
    ctx.drawImage(image, (image.naturalWidth - crop) / 2, (image.naturalHeight - crop) * .6, crop, crop, x, y, size, size);
    return;
  }
  const scale = Math.min(size / image.naturalWidth, size / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  ctx.drawImage(image, x + (size - width) / 2, y + (size - height) / 2, width, height);
}

function background(ctx) {
  ctx.fillStyle = '#09070c';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const glow = ctx.createRadialGradient(960, 650, 50, 960, 650, 1200);
  glow.addColorStop(0, '#40172f');
  glow.addColorStop(1, '#09070c');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = '#ff32990b';
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(610, 0); ctx.lineTo(0, 920); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#ff32993b';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(610, 0); ctx.lineTo(0, 920); ctx.stroke();
  ctx.fillStyle = '#ff32990a';
  ctx.beginPath(); ctx.moveTo(1080, 1120); ctx.lineTo(1080, 1920); ctx.lineTo(520, 1920); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#ff32992b';
  ctx.beginPath(); ctx.moveTo(1080, 1120); ctx.lineTo(520, 1920); ctx.stroke();
  text(ctx, '16671', 1016, 1830, { size: 105, color: '#ff329912', align: 'right', width: 380, weight: 900 });
}

function header(ctx, clubImage, labels, language, kind) {
  ctx.fillStyle = PINK;
  ctx.fillRect(64, 178, 72, 5);
  badge(ctx, clubImage, 64, 208, 84);
  text(ctx, 'SHADOWS', 171, 271, { size: 78, weight: 900, width: 400 });
  text(ctx, 'FC', 570, 271, { size: 78, weight: 900, width: 140, color: PINK });
  text(ctx, labels.league, 64, 336, { size: 27, width: 952, color: MUTED });
  const title = String(labels.title).toLocaleUpperCase(language);
  lines(ctx, title, 64, kind === 'standings' ? 404 : 434, { size: kind === 'standings' ? 68 : 92, lineHeight: kind === 'standings' ? 72 : 98 });
}

function footer(ctx, labels) {
  ctx.fillStyle = '#ff329966';
  ctx.fillRect(64, 1525, 952, 2);
  text(ctx, labels.website, 540, 1584, { size: 34, width: 952, align: 'center', color: PINK });
  text(ctx, labels.linkHint, 540, 1636, { size: 30, width: 900, align: 'center', color: MUTED });
  // Keep 1660–1760 clear for Instagram's actual Link sticker.
}

function standingsArtwork(ctx, standings, logos, labels, displayTeam) {
  const left = 64;
  const top = 506;
  const width = 952;
  const rankWidth = 48;
  const teamWidth = 328;
  const statWidth = (width - rankWidth - teamWidth) / 7;
  const headerHeight = 58;
  const rowHeight = 76;
  ctx.fillStyle = '#120d15';
  ctx.fillRect(left, top, width, headerHeight + rowHeight * standings.length);
  ctx.strokeStyle = '#6b3454';
  ctx.lineWidth = 1;
  ctx.strokeRect(left, top, width, headerHeight + rowHeight * standings.length);
  text(ctx, '#', left + rankWidth / 2, top + 37, { size: 23, width: 36, align: 'center', color: MUTED });
  text(ctx, labels.team, left + rankWidth + 14, top + 37, { size: 23, width: teamWidth - 28, color: MUTED });
  [labels.played, labels.wins, labels.losses, labels.draws, labels.goalsFor, labels.goalsAgainst, labels.points].forEach((label, index) => {
    text(ctx, label, left + rankWidth + teamWidth + statWidth * (index + .5), top + 37, { size: 23, min: 15, width: statWidth - 12, align: 'center', color: MUTED });
  });
  standings.forEach((team, index) => {
    const y = top + headerHeight + rowHeight * index;
    const ours = team.id === 'shadows';
    if (ours) {
      ctx.fillStyle = '#ff32991e'; ctx.fillRect(left, y, width, rowHeight);
      ctx.fillStyle = PINK; ctx.fillRect(left, y, 5, rowHeight);
    }
    ctx.strokeStyle = '#493042';
    ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(left + width, y); ctx.stroke();
    const color = ours ? PINK : WHITE;
    text(ctx, team.position, left + rankWidth / 2, y + 48, { size: 27, width: 36, align: 'center', color: ours ? PINK : MUTED });
    const name = displayTeam(team.name);
    const fallback = String(name).split(/\s+/).slice(0, 2).map(word => word[0]).join('');
    badge(ctx, logos[index], left + rankWidth + 12, y + 14, 48, team.crestShape, fallback);
    text(ctx, name, left + rankWidth + 74, y + 47, { size: 28, min: 21, width: teamWidth - 88, color, weight: ours ? 900 : 700 });
    [team.played, team.won, team.lost, team.drawn, team.goalsFor, team.goalsAgainst, team.points].forEach((value, column) => {
      text(ctx, value, left + rankWidth + teamWidth + statWidth * (column + .5), y + 49, { size: column === 6 ? 35 : 31, width: statWidth - 12, align: 'center', color: column === 6 ? PINK : WHITE, weight: ours || column === 6 ? 900 : 700 });
    });
  });
}

function fixtureArtwork(ctx, fixture, clubImage, opponentImage, labels, displayTeam) {
  badge(ctx, clubImage, 106, 594, 314);
  badge(ctx, opponentImage, 660, 594, 314, fixture.crestShape);
  text(ctx, '×', 540, 790, { size: 76, width: 130, align: 'center', color: PINK });
  lines(ctx, 'SHADOWS FC', 263, 984, { size: 49, width: 365, align: 'center', lineHeight: 54 });
  lines(ctx, displayTeam(fixture.opponent), 817, 984, { size: 49, width: 365, align: 'center', lineHeight: 54 });
  text(ctx, labels.weekday, 540, 1117, { size: 44, width: 900, align: 'center', color: MUTED });
  text(ctx, fixture.date, 540, 1269, { size: 154, width: 850, align: 'center', weight: 900 });
  text(ctx, fixture.time, 540, 1431, { size: 172, width: 900, align: 'center', color: PINK, weight: 900 });
}

export async function createStoryImage({ kind, language = 'en', club, fixture, standings, labels, displayTeam = name => name }) {
  if (!['standings', 'fixture'].includes(kind)) throw new Error('Unknown story type.');
  if (kind === 'fixture' && !fixture) throw new Error('No scheduled fixture is available.');
  if (kind === 'standings' && (!standings?.length || standings.length > 12)) throw new Error('The story layout supports one to twelve league teams.');
  const copy = {
    title: kind === 'standings' ? 'League standings' : 'Next match', league: 'MASTER LEAGUE · VOULA',
    weekday: '', team: 'TEAM', played: 'P', wins: 'W', losses: 'L', draws: 'D', goalsFor: 'GF', goalsAgainst: 'GA', points: 'PTS',
    website: 'zachos7.github.io/SHADOWS-FC', linkHint: 'Visit our website', ...labels,
  };
  if (document.fonts) {
    await Promise.all([
      document.fonts.load(`900 92px ${DISPLAY}`, `${copy.title} SHADOWS`),
      document.fonts.load(`700 32px ${DISPLAY}`, `${copy.team} ${copy.weekday} Σωτήρης`),
    ]).catch(() => {});
    await document.fonts.ready;
  }
  const ownSource = kind === 'fixture' ? club.matchLogo || club.logo : club.logo;
  const [clubImage, logos] = await Promise.all([
    loadImage(ownSource),
    kind === 'standings' ? Promise.all(standings.map(team => loadImage(team.logo))) : loadImage(fixture.logo),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH; canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Story export is unavailable in this browser.');
  ctx.imageSmoothingQuality = 'high';
  background(ctx);
  header(ctx, clubImage, copy, language, kind);
  if (kind === 'standings') standingsArtwork(ctx, standings, logos, copy, displayTeam);
  else fixtureArtwork(ctx, fixture, clubImage, logos, copy, displayTeam);
  footer(ctx, copy);
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Unable to create story image.')), 'image/png'));
}

import { club, matches, upcomingMatches, leagueStandings, squad, announcements, getSummary, getScorers, getRankings, playerName, matchOutcome, selectMatches, getScoringHistory } from './data.js?v=20261029-blue-fish-result';
import { messages, localizedName, localizedCareer, localizedOpponent, languageLocales, announcementTranslations } from './i18n.js?v=20261029-blue-fish-result';

let language = 'el';
try { const saved = localStorage.getItem('shadows-language'); if (Object.hasOwn(messages, saved)) language = saved; } catch { /* Storage may be disabled. */ }
const PAGE_SIZE = 8;
const archive = { page: 1 };
let galleryIndex = 0;
let dialogContent = null;
let dialogTrigger = null;
let closingFromHistory = false;
const $ = selector => document.querySelector(selector);
const t = key => messages[language][key];
const displayName = name => localizedName(name, language);
const displayOpponent = name => localizedOpponent(name, language);
let theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

function renderTheme() {
  document.documentElement.dataset.theme = theme;
  $('meta[name="theme-color"]').content = theme === 'light' ? '#ffffff' : '#08070b';
  document.querySelectorAll('.theme-control').forEach(control => control.setAttribute('aria-label', t('themeLabel')));
  document.querySelectorAll('[data-theme-choice]').forEach(button => {
    button.textContent = t(button.dataset.themeChoice === 'light' ? 'themeLightShort' : 'themeDarkShort');
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
    button.setAttribute('aria-label', t(button.dataset.themeChoice === 'light' ? 'themeLight' : 'themeDark'));
  });
}

function setTheme(next) {
  if (!['dark', 'light'].includes(next)) return;
  theme = next;
  try { localStorage.setItem('shadows-theme', theme); } catch { /* The choice still works without storage. */ }
  renderTheme();
}
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const initials = name => name.replace(/[^\p{L}\s]/gu, '').split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
const outcome = matchOutcome;
const positionLabel = code => ({ GK: t('goalkeeper'), CB: t('centerBack'), CM: t('centerMidfielder'), RW: t('rightWinger'), LW: t('leftWinger'), CAM: t('attackingMidfielder'), ST: t('striker') })[code] || code || '';

function renderArrows() {
  // Draw arrows as vectors so they don't depend on an installed symbol font.
  document.querySelectorAll('span[aria-hidden="true"]').forEach(span => {
    if (span.textContent.trim() !== '↗') return;
    span.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="vertical-align:middle"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" stroke-width="1.5"/></svg>';
  });
}

const scorerProfile = name => squad.find(player => (player.scorerName || player.name) === playerName(name));

function readArchiveUrl() {
  const params = new URL(location.href).searchParams;
  archive.page = Math.max(1, Math.min(10000, Number.parseInt(params.get('page'), 10) || 1));
}

function dialogFromUrl() {
  const params = new URL(location.href).searchParams;
  if (announcements.some(item => item.id === params.get('announcement'))) return { type: 'announcement', id: params.get('announcement') };
  if (matches.some(match => match.id === params.get('match'))) return { type: 'match', id: params.get('match') };
  if (matches.some(match => match.id === params.get('fixture'))) return { type: 'match', id: params.get('fixture') };
  if (upcomingMatches.some(match => match.id === params.get('fixture'))) return { type: 'fixture', id: params.get('fixture') };
  if (squad.some(player => String(player.number) === params.get('player'))) return { type: 'player', id: Number(params.get('player')) };
  if (getScorers().some(scorer => scorer.name === params.get('scorer'))) return { type: 'scorer', name: params.get('scorer') };
  return null;
}

function writeUrl(push = false) {
  const url = new URL(location.href);
  for (const key of ['q', 'month', 'result', 'sort', 'view', 'page', 'match', 'fixture', 'player', 'scorer', 'announcement']) url.searchParams.delete(key);
  if (archive.page > 1) url.searchParams.set('page', archive.page);
  if (dialogContent) url.searchParams.set(dialogContent.type, dialogContent.id ?? dialogContent.name);
  if (dialogContent?.type === 'announcement') url.hash = 'announcements';
  if (url.href !== location.href) {
    try { history[push ? 'pushState' : 'replaceState'](null, '', url); } catch { /* Browsing still works when history is unavailable. */ }
  }
}

// One shared crest area keeps different badge proportions aligned across views.
function crestMarkup(logo, fallback = '', shape = '') {
  return `<span class="crest-frame${['shadows', 'legrena', 'shield', 'black', 'cutout'].includes(shape) ? ` crest-frame-${shape}` : ''}">${logo
    ? `<img class="match-crest${shape === 'shield' ? ' crest-shield' : shape === 'legrena' ? ' crest-legrena' : shape === 'shadows' ? ' crest-shadows' : ''}" src="${esc(logo)}" alt="" loading="lazy">`
    : `<span class="crest-fallback" aria-hidden="true">${esc(fallback)}</span>`}</span>`;
}

function scoreMarkup(match) {
  return `<span class="score-for">${match.goalsFor}</span><span class="score-divider">–</span><span class="score-against">${match.goalsAgainst}</span>`;
}

function renderUpcomingMatches() {
  $('#upcoming-match-list').innerHTML = upcomingMatches.map(match => `<button class="match-row fixture-card" data-open-fixture="${esc(match.id)}" aria-label="${esc(t('nextFixture'))}: SHADOWS FC × ${esc(displayOpponent(match.opponent))}, ${t(match.weekday)} ${match.date}, ${match.time}">
    <span class="match-date"><strong><time datetime="${esc(match.calendarDate)}">${match.date.replace('/', '.')}</time></strong><small>${t('nextFixture')}</small></span>
    <span class="match-team">${crestMarkup(club.matchLogo || club.logo, '', club.crestShape)}<span>SHADOWS FC</span></span>
    <span class="fixture-time"><strong>${match.time}</strong><small>${t(match.weekday)}</small></span>
    <span class="match-team away">${crestMarkup(match.logo, '', match.crestShape)}<span>${esc(displayOpponent(match.opponent))}</span></span>
    <span class="match-outcome"><span class="fixture-status">${t('scheduled')}</span></span>
    <span class="match-card-footer"><span>${t('leagueLocation')}</span><span>${t('detail')} <span class="row-arrow" aria-hidden="true">↗</span></span></span>
  </button>`).join('');
  $('#upcoming-match-list').hidden = !upcomingMatches.length;
  $('#completed-fixtures-heading').hidden = !upcomingMatches.length;
}

function renderStandings() {
  $('#standings-rows').innerHTML = leagueStandings.map(team => `<tr data-standing-team="${esc(team.id)}"${team.id === 'shadows' ? ' class="standings-our-team"' : ''}>
    <td class="standings-position">${team.position}</td><th scope="row"><span class="standings-team">${crestMarkup(team.logo, initials(displayOpponent(team.name)), team.crestShape)}<span>${esc(displayOpponent(team.name))}</span></span></th>
    <td>${team.played}</td><td>${team.won}</td><td>${team.lost}</td><td>${team.drawn}</td><td>${team.goalsFor}</td><td>${team.goalsAgainst}</td><td class="standings-points">${team.points}</td>
  </tr>`).join('');
  document.querySelectorAll('[data-i18n-title]').forEach(element => { element.title = t(element.dataset.i18nTitle); element.setAttribute('aria-label', t(element.dataset.i18nTitle)); });
}

function renderMatches() {
  const visible = selectMatches();
  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  archive.page = Math.min(archive.page, pages);
  const start = (archive.page - 1) * PAGE_SIZE;
  const pageMatches = visible.slice(start, start + PAGE_SIZE);
  $('#match-list').innerHTML = pageMatches.map(match => {
    const result = outcome(match);
    return `<button class="match-row" data-result="${result}" data-open-match="${esc(match.id)}" aria-label="${esc(t('detail'))}: SHADOWS FC ${match.goalsFor}–${match.goalsAgainst} ${esc(displayOpponent(match.opponent))}, ${match.date}, ${t(result + 'Full')}">
      <span class="match-date"><strong>${match.date.replace('/', '.')}</strong><small>${t('leagueLocation')} · ${t('matchdayShort')} ${String(match.round).padStart(2, '0')}</small></span>
      <span class="match-team">${crestMarkup(club.matchLogo || club.logo, '', club.crestShape)}<span>SHADOWS FC</span></span>
      <span class="match-score"><span class="score-value">${scoreMarkup(match)}</span><small>${t('fullTime')}</small></span>
      <span class="match-team away">${crestMarkup(match.logo, match.initials, match.crestShape)}<span>${esc(displayOpponent(match.opponent))}</span></span>
      <span class="match-outcome"><span class="outcome-tag ${result}" aria-hidden="true">${t(result)}</span></span><span class="match-card-footer"><span>${match.time} · ${t('venueShort')}</span><span>${t('detail')} <span class="row-arrow" aria-hidden="true">↗</span></span></span></button>`;
  }).join('') || `<div class="empty-results"><p>${t('noResults')}</p></div>`;
  $('#results-status').textContent = `${visible.length} ${t('matchCount')} · ${t('newestFirst')}`;
  $('#archive-total').textContent = `${visible.length} ${t('matchCount').toLocaleUpperCase()}`;
  $('.archive-pagination').hidden = pages === 1;
  $('.archive-pagination').setAttribute('aria-label', t('paginationLabel'));
  $('#page-status').textContent = `${visible.length ? start + 1 : 0}–${Math.min(start + PAGE_SIZE, visible.length)} / ${visible.length}`;
  $('#previous-page').disabled = archive.page === 1;
  $('#next-page').disabled = archive.page === pages;
  renderArrows();
}

function renderScorers() {
  const selected = matches;
  const rankings = getRankings(selected);
  const leaders = rankings.filter(player => player.rank === 1);
  const total = getSummary(selected).goalsFor;
  $('#scorers-total').textContent = `${total} ${t('goals')} · ${selected.length} ${t('matchCount').toLocaleUpperCase()}`;
  $('#scorer-scope-note').textContent = t('fullScope');
  $('#scoring-leaders').innerHTML = leaders.length ? `<span class="eyebrow">${t(leaders.length > 1 ? 'jointLeaders' : 'topScorer')}</span><div class="top-scorer-number">${leaders[0].goals}<span>${t(leaders.length > 1 ? 'goalsEach' : 'goals')}</span></div><h3>${leaders.map(player => esc(displayName(player.name)).toLocaleUpperCase()).join('<br><span>&</span> ')}</h3><p>${t('scoringNote')}</p>` : `<p class="eyebrow">${t('topScorer')}</p><h3>—</h3><p>${t('noScoring')}</p>`;
  $('#scorer-rows').innerHTML = rankings.map(player => `<tr style="--goals:${player.goals};--scoring-share:${player.goals / (rankings[0]?.goals || 1)}"><td>${String(player.rank).padStart(2, '0')}</td><td><button class="scorer-name scorer-link" data-open-scorer="${esc(player.name)}"><span class="scorer-initials" aria-hidden="true">${initials(displayName(player.name))}</span>${esc(displayName(player.name))}<span class="scorer-chevron" aria-hidden="true">↗</span></button></td><td>${player.goals}</td></tr>`).join('') || `<tr><td colspan="3" class="empty-scorers">${t('noScoring')}</td></tr>`;
}

function renderSquad() {
  const groups = [
    { id: 'goalkeepers', title: 'squadGoalkeepers', positions: ['GK'] },
    { id: 'defenders', title: 'squadDefenders', positions: ['CB'] },
    { id: 'midfielders', title: 'squadMidfielders', positions: ['CM', 'CAM'] },
    { id: 'forwards', title: 'squadForwards', positions: ['RW', 'LW', 'ST'] },
  ];
  const playerCard = player => `<button class="player-card${player.photo ? ' has-photo' : ''}" data-player="${player.number}" aria-label="${esc(displayName(player.name))}, ${t(player.confirmed ? 'confirmedShirtNumber' : 'shirtNumber')} ${player.number}${player.position ? `, ${esc(positionLabel(player.position))}` : ''}"><span class="player-card-art">${player.photo ? `<img class="player-portrait" src="${esc(player.photo)}" alt="${esc(displayName(player.name))}" loading="lazy" width="450" height="560">` : ''}<span class="small-brand">SHADOWS / FC</span><span class="player-number" aria-hidden="true">${String(player.number).padStart(2, '0')}</span></span><span class="player-info"><span class="player-name-group"><strong>${esc(displayName(player.name))}</strong>${player.position ? `<small class="player-position">${esc(positionLabel(player.position))}</small>` : ''}</span><span aria-hidden="true">↗</span></span></button>`;
  $('#squad-grid').innerHTML = groups.map(group => {
    const players = squad.filter(player => group.positions.includes(player.position));
    return `<section class="squad-group" data-squad-group="${group.id}" aria-labelledby="squad-group-${group.id}"><div class="squad-group-heading"><h3 id="squad-group-${group.id}">${t(group.title)}</h3><span class="squad-group-count">${players.length} ${t('playerCount')}</span></div><div class="squad-group-grid squad-grid">${players.map(playerCard).join('')}</div></section>`;
  }).join('');
  $('#squad-count').textContent = `${squad.length} ${t('playerCount').toLocaleUpperCase()}`;
  renderArrows();
}

const galleryTrack = $('#team-gallery-track');
const gallerySlides = [...galleryTrack.querySelectorAll('.gallery-slide')];
const photoDialog = $('#photo-dialog');
let photoIndex = 0;
let requestedPhotoIndex = 0;
let museumGeneration = 0;
let museumMoving = false;
let museumAnimations = [];
const museumMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function museumView(index) {
  $('.museum-room-architecture').style.transform = `translate3d(${index ? -2.5 : 2.5}%,0,0) scale(1.06)`;
  $('.museum-room-depth').style.transform = `translate3d(${index ? -4 : 4}%,0,0) scale(1.10)`;
}
function clearMuseumAnimations() {
  museumAnimations.forEach(animation => animation.cancel());
  museumAnimations = [];
}
function stopMuseumTravel() {
  museumGeneration++;
  clearMuseumAnimations();
  museumMoving = false;
  requestedPhotoIndex = photoIndex;
  photoDialog.setAttribute('aria-busy', 'false');
  museumView(photoIndex);
}
function commitMuseumPhoto(index) {
  photoIndex = index;
  showGalleryPhoto(index, true);
  renderPhotoViewer();
}
function museumAnimate(element, frames, duration) {
  const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' });
  animation.finished.catch(() => {});
  museumAnimations.push(animation);
  return animation;
}
async function travelMuseum() {
  if (museumMoving) return;
  museumMoving = true;
  const generation = ++museumGeneration;
  photoDialog.setAttribute('aria-busy', 'true');
  try {
    while (photoDialog.open && generation === museumGeneration && requestedPhotoIndex !== photoIndex) {
      const target = requestedPhotoIndex;
      const source = gallerySlides[target].querySelector('.team-photo');
      const preload = new Image(); preload.src = source.src;
      await preload.decode().catch(() => {});
      if (!photoDialog.open || generation !== museumGeneration) return;
      if (target !== requestedPhotoIndex) continue;
      const direction = target > photoIndex ? 1 : -1;
      const distance = Math.min(260, Math.max(110, innerWidth * .2));
      const start = photoIndex ? -2.5 : 2.5, end = target ? -2.5 : 2.5;
      const room = museumAnimate($('.museum-room-architecture'), [
        { transform: `translate3d(${start}%,0,0) scale(1.06)` },
        { transform: `translate3d(${(start + end) / 2}%,0,0) scale(1.11)`, offset: .45 },
        { transform: `translate3d(${end}%,0,0) scale(1.06)` }
      ], 880);
      const depth = museumAnimate($('.museum-room-depth'), [
        { transform: `translate3d(${start * 1.6}%,0,0) scale(1.10)` },
        { transform: `translate3d(${end * 1.6}%,0,0) scale(1.10)` }
      ], 880);
      const exit = museumAnimate($('.museum-artwork'), [
        { transform: 'perspective(1400px) translate3d(0,0,0) rotateY(0deg)', opacity: 1 },
        { transform: `perspective(1400px) translate3d(${-direction * distance}px,8px,-160px) rotateY(${direction * 14}deg)`, opacity: 0 }
      ], 320);
      await exit.finished;
      if (!photoDialog.open || generation !== museumGeneration) return;
      commitMuseumPhoto(target);
      const enter = museumAnimate($('.museum-artwork'), [
        { transform: `perspective(1400px) translate3d(${direction * distance}px,8px,-160px) rotateY(${-direction * 14}deg)`, opacity: 0 },
        { transform: 'perspective(1400px) translate3d(0,0,0) rotateY(0deg)', opacity: 1 }
      ], 560);
      await Promise.all([enter.finished, room.finished, depth.finished]);
      if (!photoDialog.open || generation !== museumGeneration) return;
      clearMuseumAnimations();
      museumView(photoIndex);
    }
  } catch {
    if (photoDialog.open && generation === museumGeneration) commitMuseumPhoto(requestedPhotoIndex);
  } finally {
    if (generation === museumGeneration) {
      clearMuseumAnimations();
      museumMoving = false;
      photoDialog.setAttribute('aria-busy', 'false');
      museumView(photoIndex);
    }
  }
}
function goToMuseumPhoto(index) {
  requestedPhotoIndex = Math.max(0, Math.min(gallerySlides.length - 1, index));
  if (museumMotion.matches || typeof $('.museum-artwork').animate !== 'function') {
    const target = requestedPhotoIndex;
    stopMuseumTravel();
    requestedPhotoIndex = target;
    commitMuseumPhoto(target);
    museumView(target);
  } else if (requestedPhotoIndex !== photoIndex || museumMoving) {
    void travelMuseum();
  }
}
function settleMuseumTravel() {
  if (!museumMoving) return;
  const target = requestedPhotoIndex;
  stopMuseumTravel();
  requestedPhotoIndex = target;
  commitMuseumPhoto(target);
  museumView(target);
}
museumMotion.addEventListener('change', () => { if (museumMotion.matches) settleMuseumTravel(); });
window.addEventListener('resize', settleMuseumTravel);
let photoTrigger = null;
let suppressGalleryClick = false;

function renderGallery() {
  $('.team-gallery').setAttribute('aria-label', t('galleryLabel'));
  $('.team-gallery').setAttribute('aria-roledescription', t('galleryRole'));
  galleryTrack.setAttribute('aria-label', t('galleryInstructions'));
  $('#gallery-prev').setAttribute('aria-label', t('galleryPrevious'));
  $('#gallery-next').setAttribute('aria-label', t('galleryNext'));
  $('#gallery-prev').disabled = galleryIndex === 0;
  $('#gallery-next').disabled = galleryIndex === gallerySlides.length - 1;
  $('.gallery-thumbnails').setAttribute('aria-label', t('galleryThumbnails'));
  gallerySlides.forEach((slide, index) => {
    const label = `${t('galleryPhoto')} ${index + 1} ${t('galleryOf')} ${gallerySlides.length}`;
    slide.setAttribute('aria-label', label);
    slide.setAttribute('aria-roledescription', t('gallerySlide'));
    slide.setAttribute('aria-hidden', String(index !== galleryIndex));
    slide.querySelector('.gallery-zoom').tabIndex = index === galleryIndex ? 0 : -1;
    const dot = $(`[data-gallery-index="${index}"]`);
    dot.setAttribute('aria-label', label);
    dot.querySelector('.sr-only').textContent = label;
    if (index === galleryIndex) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
    const thumbnail = $(`[data-gallery-thumbnail="${index}"]`);
    thumbnail.setAttribute('aria-label', label);
    if (index === galleryIndex) thumbnail.setAttribute('aria-current', 'true');
    else thumbnail.removeAttribute('aria-current');
  });
  $('#gallery-counter').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(gallerySlides.length).padStart(2, '0')}`;
  $('#gallery-status').textContent = `${t('galleryPhoto')} ${galleryIndex + 1} ${t('galleryOf')} ${gallerySlides.length}`;
  if (photoDialog.open) renderPhotoViewer();
}

function renderPhotoViewer() {
  const focusedControl = document.activeElement;
  const source = gallerySlides[photoIndex].querySelector('.team-photo');
  const image = $('#photo-viewer-image');
  image.src = source.src;
  image.alt = source.alt;
  image.width = Number(source.getAttribute('width'));
  image.height = Number(source.getAttribute('height'));
  $('.museum-artwork').style.setProperty('--artwork-ratio', Number(source.getAttribute('width')) / Number(source.getAttribute('height')));
  $('#photo-viewer-title').textContent = t(photoIndex === 0 ? 'museumTeamTitle' : 'museumCelebrationTitle');
  $('#close-photo-dialog').setAttribute('aria-label', t('galleryClose'));
  $('#photo-viewer-prev').setAttribute('aria-label', t('galleryPrevious'));
  $('#photo-viewer-next').setAttribute('aria-label', t('galleryNext'));
  $('#photo-viewer-prev').disabled = photoIndex === 0;
  $('#photo-viewer-next').disabled = photoIndex === gallerySlides.length - 1;
  if (photoDialog.open && photoDialog.contains(focusedControl) && focusedControl.disabled) {
    $('#close-photo-dialog').focus({ preventScroll: true });
  }
  $('#photo-viewer-counter').textContent = `${t('galleryPhoto')} ${photoIndex + 1} ${t('galleryOf')} ${gallerySlides.length}`;
}

function openPhoto(index = galleryIndex, trigger = galleryTrack) {
  stopMuseumTravel();
  photoIndex = Math.max(0, Math.min(gallerySlides.length - 1, index));
  requestedPhotoIndex = photoIndex;
  museumView(photoIndex);
  photoTrigger = trigger;
  showGalleryPhoto(photoIndex, true);
  renderPhotoViewer();
  if (!photoDialog.open) photoDialog.showModal();
  document.body.style.overflow = 'hidden';
  $('#close-photo-dialog').focus({ preventScroll: true });
}

function stepPhoto(step) {
  goToMuseumPhoto(requestedPhotoIndex + step);
}

function showGalleryPhoto(index, instant = false) {
  if (!galleryTrack.clientWidth) return;
  const next = Math.max(0, Math.min(gallerySlides.length - 1, index));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  galleryTrack.scrollTo({ left: next * galleryTrack.clientWidth, behavior: instant || reducedMotion ? 'instant' : 'smooth' });
  if (instant || reducedMotion) {
    galleryIndex = next;
    renderGallery();
  }
}

let galleryScrollFrame = 0;
galleryTrack.addEventListener('scroll', () => {
  if (galleryScrollFrame || !galleryTrack.clientWidth) return;
  galleryScrollFrame = requestAnimationFrame(() => {
    galleryScrollFrame = 0;
    if (!galleryTrack.clientWidth) return;
    const next = Math.max(0, Math.min(gallerySlides.length - 1, Math.round(galleryTrack.scrollLeft / galleryTrack.clientWidth)));
    if (next !== galleryIndex) { galleryIndex = next; renderGallery(); }
  });
}, { passive: true });
$('#gallery-prev').addEventListener('click', () => showGalleryPhoto(galleryIndex - 1));
$('#gallery-next').addEventListener('click', () => showGalleryPhoto(galleryIndex + 1));
document.querySelectorAll('[data-gallery-index]').forEach(dot => dot.addEventListener('click', () => showGalleryPhoto(Number(dot.dataset.galleryIndex))));
document.querySelectorAll('[data-gallery-thumbnail]').forEach(thumbnail => thumbnail.addEventListener('click', () => showGalleryPhoto(Number(thumbnail.dataset.galleryThumbnail))));
galleryTrack.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target === galleryTrack) {
    event.preventDefault();
    openPhoto(galleryIndex, galleryTrack);
    return;
  }
  const target = { ArrowLeft: galleryIndex - 1, ArrowRight: galleryIndex + 1, Home: 0, End: gallerySlides.length - 1 }[event.key];
  if (target == null) return;
  event.preventDefault();
  showGalleryPhoto(target);
});
let galleryDrag = null;
galleryTrack.addEventListener('pointerdown', event => {
  suppressGalleryClick = false;
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  if (event.target.closest('button')) return;
  galleryDrag = { x: event.clientX, left: galleryTrack.scrollLeft, moved: false };
  galleryTrack.classList.add('is-dragging');
  galleryTrack.setPointerCapture(event.pointerId);
});
galleryTrack.addEventListener('pointermove', event => {
  if (galleryDrag) {
    if (Math.abs(galleryDrag.x - event.clientX) > 6) galleryDrag.moved = true;
    galleryTrack.scrollLeft = galleryDrag.left + galleryDrag.x - event.clientX;
  }
});
function finishGalleryDrag() {
  if (!galleryDrag) return;
  suppressGalleryClick = galleryDrag.moved;
  galleryDrag = null;
  galleryTrack.classList.remove('is-dragging');
  if (!galleryTrack.clientWidth) return;
  showGalleryPhoto(Math.round(galleryTrack.scrollLeft / galleryTrack.clientWidth));
}
galleryTrack.addEventListener('pointerup', finishGalleryDrag);
galleryTrack.addEventListener('pointercancel', finishGalleryDrag);
galleryTrack.addEventListener('lostpointercapture', finishGalleryDrag);
galleryTrack.addEventListener('click', event => {
  if (suppressGalleryClick) { suppressGalleryClick = false; event.preventDefault(); return; }
  if (!event.target.closest('button')) openPhoto(galleryIndex, galleryTrack);
});
$('#close-photo-dialog').addEventListener('click', () => photoDialog.close());
$('#photo-viewer-prev').addEventListener('click', () => stepPhoto(-1));
$('#photo-viewer-next').addEventListener('click', () => stepPhoto(1));
document.addEventListener('keydown', event => {
  if (!photoDialog.open) return;
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'Home') goToMuseumPhoto(0);
  else if (event.key === 'End') goToMuseumPhoto(gallerySlides.length - 1);
  else stepPhoto(event.key === 'ArrowLeft' ? -1 : 1);
});
photoDialog.addEventListener('click', event => {
  if (event.target !== photoDialog) return;
  const rect = photoDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) photoDialog.close();
});
photoDialog.addEventListener('close', () => {
  if (photoDialog.open) return;
  stopMuseumTravel();
  document.body.style.overflow = dialog.open ? 'hidden' : '';
  if (dialog.open) return;
  const target = photoTrigger?.isConnected && !photoTrigger.closest('[aria-hidden="true"]') ? photoTrigger : galleryTrack;
  if (target.isConnected && target.getBoundingClientRect().width) target.focus({ preventScroll: true });
});
if ('ResizeObserver' in window) new ResizeObserver(() => showGalleryPhoto(galleryIndex, true)).observe(galleryTrack);
else window.addEventListener('resize', () => showGalleryPhoto(galleryIndex, true));

const announcementText = (item, field) => announcementTranslations[item.id]?.[language]?.[field] ?? item[field]?.[language] ?? item[field]?.el ?? item[field]?.en;

function announcementPhotoMarkup(item, card = false) {
  return item.photo ? `<img class="announcement-photo${card ? ' announcement-card-photo' : ''}" src="${esc(item.photo)}" alt="${esc(announcementText(item, 'photoAlt') || announcementText(item, 'title'))}" width="1280" height="1232"${card ? ' loading="lazy"' : ''}>` : '';
}

function renderAnnouncements() {
  const ordered = [...announcements].sort((a, b) => b.order - a.order);
  $('#announcements-count').textContent = `${ordered.length} ${t(ordered.length === 1 ? 'announcementSingular' : 'announcementCount').toLocaleUpperCase()}`;
  $('#announcement-list').innerHTML = ordered.map(item => `<article class="announcement-card"><button data-open-announcement="${esc(item.id)}">${announcementPhotoMarkup(item, true)}<span class="announcement-card-meta"><span>${t('officialAnnouncement')}</span>${item.date ? `<time>${esc(item.date)}</time>` : ''}</span><h2>${esc(announcementText(item, 'title'))}</h2><p>${esc(announcementText(item, 'summary') || '')}</p><span class="announcement-card-link">${t('readAnnouncement')} <span aria-hidden="true">↗</span></span></button></article>`).join('') || `<div class="announcements-empty"><span class="eyebrow">SHADOWS FC</span><p>${t('noAnnouncements')}</p></div>`;
  renderArrows();
}

function renderPageView() {
  const isNews = location.hash === '#announcements' || dialogContent?.type === 'announcement';
  const isStandings = !isNews && location.hash === '#standings';
  document.querySelectorAll('[data-home-section]').forEach(section => { section.hidden = isNews; });
  $('#announcements').hidden = !isNews;
  for (const [hash, active] of [['announcements', isNews], ['standings', isStandings]]) {
    const link = $(`#navigation a[href="#${hash}"]`);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

const dialog = $('#detail-dialog');

function scoringHistoryMarkup(name) {
  const history = getScoringHistory(name);
  const total = history.reduce((sum, entry) => sum + entry.goals, 0);
  return `${history.length ? `<div class="profile-stats history-totals"><div><strong>${total}</strong><small>${t('confirmedGoals')}</small></div><div><strong>${history.length}</strong><small>${t('scoringMatches')}</small></div></div>` : ''}
    <h3 class="dialog-subhead">${t('scoringHistory')}</h3><p class="dialog-note">${t('scopeNote')}</p>
    <div class="scoring-history">${history.map(({ match, goals }) => `<button data-open-match="${esc(match.id)}"><span><small>${match.date} · ${t('matchdayShort')} ${String(match.round).padStart(2, '0')}</small><strong>${esc(displayOpponent(match.opponent))}</strong></span><span class="history-score" data-result="${outcome(match)}">${scoreMarkup(match)}</span><span class="history-goals"><b>${goals}</b> ${t('goalsUnit')} <span aria-hidden="true">↗</span></span></button>`).join('') || `<p class="dialog-note">${t('noScoringHistory')}</p>`}</div>`;
}

function lineupMarkup(match) {
  if (!match.lineup) return `<section class="match-lineup-section"><h3 class="dialog-subhead">${t('lineupTitle')}</h3><p class="dialog-note">${t('lineupNotRecorded')}</p></section>`;
  const lineup = match.lineup;
  const players = entries => `<ul class="match-lineup-list">${entries.map(player => `<li><span class="lineup-marker">${player.position ? esc(language === 'el' ? ({GK:'ΤΦ',CB:'ΚΑ',CM:'ΚΜ',RW:'ΔΕ',LW:'ΑΕ',CAM:'ΕΜ',ST:'ΕΠ'}[player.position] || player.position) : player.position) : player.number != null ? '#' + player.number : '—'}</span><span class="lineup-name">${esc(displayName(player.name))}</span></li>`).join('')}</ul>`;
  return `<section class="match-lineup-section"><h3 class="dialog-subhead">${t(lineup.type === 'starting' ? 'startingSeven' : lineup.type === 'played' ? 'playersPlayed' : 'matchdayPlayers')}</h3>${players(lineup.players)}
    ${lineup.substitutes?.length ? `<h4 class="lineup-subheading">${t('substitutes')}</h4>${players(lineup.substitutes)}` : ''}
    ${lineup.staff?.length ? `<h4 class="lineup-subheading">${t('coachingStaff')}</h4><ul class="match-staff-list">${lineup.staff.map(person => `<li><span>${esc(displayName(person.name))}</span>${person.role ? `<small>${t(person.role)}</small>` : ''}</li>`).join('')}</ul>` : ''}</section>`;
}

function injuryMarkup(match, playerNumber = null) {
  const injuries = (match.injuries || []).filter(injury => playerNumber == null || injury.playerNumber === playerNumber);
  return injuries.map(injury => `<aside class="injury-update"><h3>${t('injuryUpdate')}</h3><strong>${esc(displayName(injury.name))}</strong><p>${t('injuredInMatch')} ${esc(displayOpponent(match.opponent))} · ${match.date}.</p><p>${t('estimatedAbsence')}: ${injury.absenceMonths.toLocaleString(languageLocales[language])} ${t('monthsUnit')}</p><p class="injury-return">${t('estimatedReturn')}: <b>${t(injury.expectedReturn)}</b>.</p></aside>`).join('');
}

function playerCareerMarkup(player) {
  if (!player.career?.length) return '';
  return `<section class="player-biography" aria-label="${t('playerBiography')}"><ol class="career-timeline">${player.career.map(entry => {
    const period = entry.from === entry.to ? entry.from : `${entry.from}/${entry.to}`;
    return `<li class="career-entry"><span class="career-line"><span class="career-period">${period}</span> - <span class="career-club">${esc(localizedCareer(entry.label, language))}</span></span>${entry.logo ? `<span class="career-logo${entry.logoCanvas ? ` career-logo--${esc(entry.logoCanvas)}` : ''}"><img src="${esc(entry.logo)}" alt="" width="44" height="44" loading="lazy"></span>` : ''}</li>`;
  }).join('')}</ol></section>`;
}

function renderDialog() {
  if (!dialogContent) return;
  if (dialogContent.type === 'announcement') {
    const item = announcements.find(entry => entry.id === dialogContent.id);
    if (!item) return;
    $('#dialog-category').textContent = t('officialAnnouncement');
    $('#dialog-body').innerHTML = `<article class="announcement-detail"><h2 id="dialog-title">${esc(announcementText(item, 'title'))}</h2><p class="announcement-byline">SHADOWS FC${item.date ? ` · ${esc(item.date)}` : ''}</p>${announcementPhotoMarkup(item)}<div class="announcement-body">${(announcementText(item, 'body') || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}</div></article>`;
  } else if (dialogContent.type === 'fixture') {
    const match = upcomingMatches.find(item => item.id === dialogContent.id);
    if (!match) return;
    $('#dialog-category').textContent = t('nextFixture');
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">SHADOWS FC<br>× ${esc(displayOpponent(match.opponent))}</h2><p class="dialog-meta">${t('leagueDetail')}<br><time datetime="${esc(match.calendarDate)}">${t(match.weekday)} ${match.date}</time> · ${match.time}</p><div class="dialog-scoreboard fixture-scoreboard">${crestMarkup(club.matchLogo || club.logo, '', club.crestShape)}<div class="fixture-time"><strong>${match.time}</strong><small>${t('scheduled')}</small></div>${crestMarkup(match.logo, '', match.crestShape)}</div><p class="dialog-note">${t('fixturePending')}</p>`;
  } else if (dialogContent.type === 'match') {
    const match = matches.find(item => item.id === dialogContent.id);
    if (!match) return;
    const ordered = selectMatches(matches, { sort: 'oldest' });
    const index = ordered.findIndex(item => item.id === match.id);
    $('#dialog-category').textContent = `${t('matchday')} ${String(match.round).padStart(2, '0')} / ${t('fullTime')}`;
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">SHADOWS FC<br>× ${esc(displayOpponent(match.opponent))}</h2><p class="dialog-meta">${t('leagueDetail')}<br>${match.date} · ${match.time}<br>${esc(t('matchVenueName'))}</p><div class="dialog-scoreboard">${crestMarkup(club.matchLogo || club.logo, '', club.crestShape)}<div class="dialog-score" data-result="${outcome(match)}">${scoreMarkup(match)}</div>${crestMarkup(match.logo, match.initials, match.crestShape)}</div>
      ${lineupMarkup(match)}${injuryMarkup(match)}<h3 class="dialog-subhead">${t('scorerList')}</h3><ul class="dialog-scorers">${match.scorers.map(player => `<li><button class="dialog-scorer-link" data-open-scorer="${esc(playerName(player.name))}">${esc(displayName(playerName(player.name)))} <span aria-hidden="true">↗</span></button><b>${player.goals}</b></li>`).join('')}</ul>${match.mvp ? `<p class="dialog-meta">${t('mvp')} <strong>${esc(displayName(match.mvp))}</strong></p>` : ''}
      <nav class="match-navigation" aria-label="${t('browseMatches')}"><button data-step-match="${esc(ordered[index - 1]?.id || '')}" ${index === 0 ? 'disabled' : ''}>${t('previousMatch')}</button><span>${index + 1} / ${ordered.length}</span><button data-step-match="${esc(ordered[index + 1]?.id || '')}" ${index === ordered.length - 1 ? 'disabled' : ''}>${t('nextMatch')}</button></nav>`;
  } else if (dialogContent.type === 'player') {
    const player = squad.find(item => item.number === dialogContent.id);
    if (!player) return;
    $('#dialog-category').textContent = t('playerProfile');
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">${esc(displayName(player.name))}</h2>${player.photo ? `<img class="profile-portrait" src="${esc(player.photo)}" alt="${esc(displayName(player.name))}" width="450" height="560">` : ''}<div class="profile-number">#${player.number}</div><p class="dialog-meta">${t('confirmedShirtNumber')}</p>${player.position ? `<p class="profile-position"><span>${t('position')}</span><strong>${esc(positionLabel(player.position))}</strong></p>` : ''}${playerCareerMarkup(player)}${matches.map(match => injuryMarkup(match, player.number)).join('')}${scoringHistoryMarkup(player.scorerName || player.name)}`;
  } else {
    $('#dialog-category').textContent = t('scorerHistory');
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">${esc(displayName(dialogContent.name))}</h2>${scoringHistoryMarkup(dialogContent.name)}`;
  }
  $('#dialog-body').insertAdjacentHTML('beforeend', `<div class="share-detail"><button id="copy-detail-link">${t('copyLink')} <span aria-hidden="true">↗</span></button><p id="share-status" role="status" aria-live="polite"></p><label class="share-fallback" hidden><span>${t('copyManually')}</span><input type="text" readonly aria-label="${t('copyLink')}"></label></div>`);
  renderArrows();
}

function openDialog(content, trigger = null, push = true) {
  if (!dialog.open) dialogTrigger = trigger;
  dialogContent = content;
  if (push) writeUrl(true);
  renderPageView();
  renderDialog();
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  // A scorer-to-match transition replaces the dialog content. Give the new
  // title focus so keyboard and screen-reader users can follow the drill-down.
  $('#dialog-title').tabIndex = -1;
  $('#dialog-title').focus({ preventScroll: true });
}

function showScorer(name, trigger) {
  const profile = scorerProfile(name);
  openDialog(profile ? { type: 'player', id: profile.number } : { type: 'scorer', name: playerName(name) }, trigger);
}

function setMenu(open) {
  $('#navigation').classList.toggle('open', open);
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  $('#menu-toggle').setAttribute('aria-label', t(open ? 'closeMenu' : 'openMenu'));
}

function render() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = t(element.dataset.i18n);
    if (value.includes('\n')) {
      element.replaceChildren(...value.split('\n').flatMap((line, index) => index ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    } else element.textContent = value;
  });
  $('#language-toggle').innerHTML = `${{ el: 'ΕΛ', en: 'EN', sq: 'SQ', es: 'ES' }[language]} <span aria-hidden="true">⌄</span>`;
  $('#language-toggle').setAttribute('aria-label', t('languageLabel'));
  $('#language-options').setAttribute('aria-label', t('languageLabel'));
  document.querySelectorAll('[data-language-choice]').forEach(button => button.setAttribute('aria-checked', String(button.dataset.languageChoice === language)));
  $('.wordmark').setAttribute('aria-label', t('homeLabel'));
  document.title = `SHADOWS FC — ${t('locationMark')}`;
  $('meta[name="description"]').content = t('clubDescription');
  $('#close-dialog').setAttribute('aria-label', t('close'));
  $('#navigation').setAttribute('aria-label', t('mainNavigation'));
  $('#menu-toggle').setAttribute('aria-label', t($('#menu-toggle').getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'openMenu'));
  document.querySelectorAll('[data-i18n-alt]').forEach(image => { image.alt = t(image.dataset.i18nAlt); });
  renderTheme(); renderGallery(); renderUpcomingMatches(); renderMatches(); renderScorers(); renderSquad(); renderStandings(); renderAnnouncements(); renderPageView(); renderDialog();
}

function setLanguageMenu(open, focusChoice = false) {
  $('#language-options').hidden = !open;
  $('#language-toggle').setAttribute('aria-expanded', String(open));
  if (open && focusChoice) document.querySelector(`[data-language-choice="${language}"]`).focus();
}
$('#language-toggle').addEventListener('click', () => setLanguageMenu($('#language-options').hidden, true));
$('.language-picker').addEventListener('keydown', event => {
  const buttons = [...document.querySelectorAll('[data-language-choice]')];
  if (event.key === 'Escape') {
    setLanguageMenu(false); $('#language-toggle').focus(); event.stopPropagation();
  } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    event.preventDefault(); setLanguageMenu(true);
    const current = buttons.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1
      : (current + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
  }
});
document.addEventListener('click', event => { if (!event.target.closest('.language-picker')) setLanguageMenu(false); });
$('.language-picker').addEventListener('focusout', event => { if (!event.currentTarget.contains(event.relatedTarget)) setLanguageMenu(false); });
for (const [id, step] of [['previous-page', -1], ['next-page', 1]]) {
  $('#' + id).addEventListener('click', () => {
    archive.page += step; renderMatches(); writeUrl();
    $('#results-status').tabIndex = -1;
    $('#results-status').focus({ preventScroll: true });
    $('#results-status').scrollIntoView({ block: 'start' });
  });
}
document.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-language-choice')) {
    const next = button.dataset.languageChoice;
    if (!Object.hasOwn(messages, next)) return;
    language = next;
    try { localStorage.setItem('shadows-language', language); } catch { /* Selection works without storage. */ }
    setLanguageMenu(false); render(); $('#language-toggle').focus();
  } else if (button.hasAttribute('data-theme-choice')) setTheme(button.dataset.themeChoice);
  else if (button.hasAttribute('data-open-photo')) openPhoto(Number(button.dataset.openPhoto), button);
  else if (button.hasAttribute('data-open-announcement')) openDialog({ type: 'announcement', id: button.dataset.openAnnouncement }, button);
  else if (button.hasAttribute('data-open-match')) openDialog({ type: 'match', id: button.dataset.openMatch }, button);
  else if (button.hasAttribute('data-open-fixture')) openDialog({ type: 'fixture', id: button.dataset.openFixture }, button);
  else if (button.hasAttribute('data-open-scorer')) showScorer(button.dataset.openScorer, button);
  else if (button.hasAttribute('data-player')) openDialog({ type: 'player', id: Number(button.dataset.player) }, button);
  else if (button.hasAttribute('data-step-match') && button.dataset.stepMatch) {
    openDialog({ type: 'match', id: button.dataset.stepMatch }, button, false); writeUrl();
  } else if (button.id === 'copy-detail-link') {
    const status = $('#share-status');
    const fallback = $('.share-fallback');
    const link = location.href;
    try { await navigator.clipboard.writeText(link); if (status?.isConnected) status.textContent = t('linkCopied'); }
    catch {
      if (fallback?.isConnected) {
        fallback.hidden = false;
        const input = fallback.querySelector('input'); input.value = link; input.select();
      }
    }
  }
});
window.addEventListener('popstate', () => {
  if (photoDialog.open) photoDialog.close();
  readArchiveUrl(); renderMatches();
  const requested = dialogFromUrl();
  if (requested) openDialog(requested, null, false);
  else if (dialog.open) { closingFromHistory = true; dialog.close(); }
  renderPageView();
});
window.addEventListener('hashchange', () => {
  renderPageView();
  const target = document.getElementById(location.hash.slice(1));
  if (target && !target.hidden) {
    target.scrollIntoView({ block: 'start' });
    if (['announcements', 'standings'].includes(target.id)) $(`#${target.id}-title`).focus({ preventScroll: true });
  }
});
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  if (dialog.open) { closingFromHistory = false; return; }
  document.body.style.overflow = photoDialog.open ? 'hidden' : '';
  dialogContent = null;
  if (!closingFromHistory) writeUrl();
  renderPageView();
  closingFromHistory = false;
  if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
});
$('#menu-toggle').addEventListener('click', () => setMenu($('#menu-toggle').getAttribute('aria-expanded') !== 'true'));
$('#navigation').addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 800) setMenu(false); });
readArchiveUrl();
render();
const initialDialog = dialogFromUrl();
if (initialDialog) openDialog(initialDialog, null, false);
writeUrl();

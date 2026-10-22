import { club, matches, squad, getSummary, getScorers, getRankings, playerName } from './data.js';

const messages = {
  el: {
    skip: 'Μετάβαση στο περιεχόμενο', navResults: 'Αποτελέσματα', navScorers: 'Σκόρερ', navSquad: 'Ομάδα', navClub: 'Ο σύλλογος',
    heroDescription: 'Μια παρέα. Μια ομάδα. Η δική μας ιστορία, μέσα κι έξω από το γήπεδο.', viewResults: 'Δες τους αγώνες',
    heroFootnote: 'ΑΠΟ ΤΗ ΒΟΥΛΙΑΓΜΕΝΗ. ΓΙΑ ΤΗΝ ΟΜΑΔΑ.', latestResult: 'ΤΕΛΕΥΤΑΙΟ ΑΠΟΤΕΛΕΣΜΑ', fullTime: 'ΤΕΛΙΚΟ',
    firstWin: 'Η ΠΡΩΤΗ ΝΙΚΗ. ΚΑΙ ΣΥΝΕΧΙΖΟΥΜΕ.', goals: 'ΓΚΟΛ', soFar: 'Η ΠΟΡΕΙΑ ΜΑΣ', seasonNumbers: 'Η ομάδα σε αριθμούς.',
    summaryScope: 'Στους 4 αγώνες που έχουν καταγραφεί.', resultsTitle: 'Κάθε ματς, μια ιστορία.', fourMatches: '4 ΑΓΩΝΕΣ · ΟΛΑ ΤΑ ΑΠΟΤΕΛΕΣΜΑΤΑ',
    allGames: 'Όλοι οι αγώνες', wins: 'Νίκες', losses: 'Ήττες', clickMatch: 'Επίλεξε αγώνα για τους σκόρερ ↗',
    mvpTitle: 'Τρία γκολ.\nΜια μεγάλη βραδιά.', mvpDescription: 'Χατ τρικ στη νίκη με 7–6 απέναντι στη Savralliolid FC. Ο Γκούμας είναι ο MVP του τελευταίου μας αγώνα.',
    matchGoals: 'ΓΚΟΛ ΣΤΟΝ ΑΓΩΝΑ', recordedGoals: 'ΓΚΟΛ ΣΤΑ 4 ΜΑΤΣ', allScorers: 'Όλοι οι σκόρερ', scorersTitle: 'Οι σκόρερ μας.',
    scorersAside: '21 ΓΚΟΛ. ΟΜΑΔΙΚΗ ΥΠΟΘΕΣΗ.', jointLeaders: 'ΣΤΗΝ ΚΟΡΥΦΗ ΜΑΖΙ', goalsEach: 'ΓΚΟΛ Ο ΚΑΘΕΝΑΣ',
    scoringNote: 'Τα γκολ μετράνε. Η ομάδα περισσότερο.', scorerCaption: 'Γκολ ανά παίκτη στους καταγεγραμμένους αγώνες', player: 'ΠΑΙΚΤΗΣ',
    squadTitle: 'Η ομάδα μας.', squadNote: 'Οι παίκτες πίσω από τη φανέλα. Γνώρισε την ομάδα των SHADOWS FC.',
    searchLabel: 'Αναζήτηση παίκτη', searchPlaceholder: 'Αναζήτηση παίκτη…',
    clubDescription: 'Οι SHADOWS FC αγωνίζονται στη Master League στη Βούλα. Μαύρο και ροζ, κοινές στιγμές και μια ιστορία που συνεχίζει να γράφεται.',
    competition: 'ΤΟ ΠΡΩΤΑΘΛΗΜΑ', leagueLocation: 'MASTER LEAGUE · ΒΟΥΛΑ', leagueDetail: 'Master League · Βούλα',
    basedIn: 'Η ΒΑΣΗ ΜΑΣ', vouliagmeni: 'Βουλιαγμένη, Αθήνα', matchVenue: 'ΤΟ ΓΗΠΕΔΟ', newTab: ' (ανοίγει σε νέα καρτέλα)', backTop: 'Στην κορυφή',
    played: 'ΑΓΩΝΕΣ', victories: 'ΝΙΚΕΣ', goalsFor: 'ΓΚΟΛ ΥΠΕΡ', goalsAgainst: 'ΓΚΟΛ ΚΑΤΑ', draws: 'ισοπαλίες', defeats: 'ήττες',
    win: 'Ν', loss: 'Η', draw: 'Ι', winFull: 'Νίκη', lossFull: 'Ήττα', drawFull: 'Ισοπαλία', matchday: 'ΑΓΩΝΑΣ', scorerList: 'ΣΚΟΡΕΡ SHADOWS FC',
    close: 'Κλείσιμο', openMenu: 'Άνοιγμα μενού', closeMenu: 'Κλείσιμο μενού', matchCount: 'αγώνες', noPlayers: 'Δεν βρέθηκε παίκτης.',
    playerCount: 'παίκτες', squadProfile: 'ΑΠΟΣΤΟΛΗ / 21.10', shirtNumber: 'Αριθμός φανέλας στο τελευταίο ματς',
    playerProfile: 'ΠΡΟΦΙΛ ΠΑΙΚΤΗ', confirmedShirtNumber: 'Αριθμός φανέλας', goalkeeper: 'Τερματοφύλακας', centerBack: 'Κεντρικός αμυντικός', position: 'ΘΕΣΗ',
    centerMidfielder: 'Κεντρικός μέσος', rightWinger: 'Δεξιός εξτρέμ', leftWinger: 'Αριστερός εξτρέμ',
    attackingMidfielder: 'Επιτελικός μέσος', striker: 'Επιθετικός',
    confirmedGoals: 'ΓΚΟΛ ΣΤΑ 4 ΚΑΤΑΓΕΓΡΑΜΜΕΝΑ ΜΑΤΣ', unknownGoals: 'Δεν έχει επιβεβαιωθεί αντιστοίχιση με τους σκόρερ των αναρτήσεων.',
    detail: 'Λεπτομέρειες', noResults: 'Δεν υπάρχουν αποτελέσματα για αυτό το φίλτρο.',
    scopeNote: 'Οι αριθμοί αφορούν τους τέσσερις καταγεγραμμένους αγώνες.', mvp: 'MVP ΤΟΥ ΑΓΩΝΑ',
    goalDifference: 'διαφορά γκολ', record: 'Ν–Ι–Η',
  },
  en: {
    skip: 'Skip to content', navResults: 'Results', navScorers: 'Scorers', navSquad: 'Squad', navClub: 'The club',
    heroDescription: 'One group of friends. One team. Our own story, on and off the pitch.', viewResults: 'Explore the matches',
    heroFootnote: 'FROM VOULIAGMENI. FOR THE TEAM.', latestResult: 'LATEST RESULT', fullTime: 'FULL TIME', firstWin: 'THE FIRST WIN. WE GO AGAIN.',
    goals: 'GOALS', soFar: 'THE STORY SO FAR', seasonNumbers: 'The team in numbers.', summaryScope: 'Across the 4 recorded matches.',
    resultsTitle: 'Every match, a story.', fourMatches: '4 MATCHES · EVERY RESULT', allGames: 'All matches', wins: 'Wins', losses: 'Losses',
    clickMatch: 'Select a match to see the scorers ↗', mvpTitle: 'Three goals.\nOne big night.',
    mvpDescription: 'A hat-trick in the 7–6 win against Savralliolid FC. Gkoumas is our player of the match.',
    matchGoals: 'MATCH GOALS', recordedGoals: 'GOALS IN 4 MATCHES', allScorers: 'All goalscorers', scorersTitle: 'On the scoresheet.',
    scorersAside: '21 GOALS. A TEAM EFFORT.', jointLeaders: 'SHARING THE TOP SPOT', goalsEach: 'GOALS EACH',
    scoringNote: 'The goals matter. The team matters more.', scorerCaption: 'Player goals across the recorded matches', player: 'PLAYER',
    squadTitle: 'Meet the squad.', squadNote: 'The people behind the shirt. Get to know SHADOWS FC.',
    searchLabel: 'Search players', searchPlaceholder: 'Search players…',
    clubDescription: 'SHADOWS FC play in the Master League in Voula. Black and pink, shared moments, and a story we’re still writing.',
    competition: 'THE LEAGUE', leagueLocation: 'MASTER LEAGUE · VOULA', leagueDetail: 'Master League · Voula',
    basedIn: 'OUR HOME', vouliagmeni: 'Vouliagmeni, Athens', matchVenue: 'THE PITCH', newTab: ' (opens in a new tab)', backTop: 'Back to top',
    played: 'MATCHES', victories: 'WINS', goalsFor: 'GOALS FOR', goalsAgainst: 'GOALS AGAINST', draws: 'draws', defeats: 'losses',
    win: 'W', loss: 'L', draw: 'D', winFull: 'Win', lossFull: 'Loss', drawFull: 'Draw', matchday: 'MATCHDAY', scorerList: 'SHADOWS FC SCORERS',
    close: 'Close', openMenu: 'Open menu', closeMenu: 'Close menu', matchCount: 'matches', noPlayers: 'No player found.',
    playerCount: 'players', squadProfile: 'MATCHDAY SQUAD / 21.10', shirtNumber: 'Shirt number in the latest match',
    playerProfile: 'PLAYER PROFILE', confirmedShirtNumber: 'Shirt number', goalkeeper: 'Goalkeeper', centerBack: 'Centre-back', position: 'POSITION',
    centerMidfielder: 'Central midfielder', rightWinger: 'Right winger', leftWinger: 'Left winger',
    attackingMidfielder: 'Attacking midfielder', striker: 'Striker',
    confirmedGoals: 'GOALS IN THE 4 RECORDED MATCHES', unknownGoals: 'A link to the scorer names in the club posts has not been confirmed.',
    detail: 'Details', noResults: 'No results for this filter.', scopeNote: 'Statistics cover the four recorded matches.', mvp: 'PLAYER OF THE MATCH',
    goalDifference: 'goal difference', record: 'W–D–L',
  },
};

let language = 'el';
try { if (localStorage.getItem('shadows-language') === 'en') language = 'en'; } catch { /* Storage may be disabled. */ }
let activeFilter = 'all';
const $ = selector => document.querySelector(selector);
const t = key => messages[language][key];
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const initials = name => name.replace(/[^\p{L}\s]/gu, '').split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
const outcome = match => match.goalsFor > match.goalsAgainst ? 'win' : match.goalsFor < match.goalsAgainst ? 'loss' : 'draw';
const positionLabel = code => ({ GK: t('goalkeeper'), CB: t('centerBack'), CM: t('centerMidfielder'), RW: t('rightWinger'), LW: t('leftWinger'), CAM: t('attackingMidfielder'), ST: t('striker') })[code] || code || '';

function renderArrows() {
  // Draw arrows as vectors so they don't depend on an installed symbol font.
  document.querySelectorAll('span[aria-hidden="true"]').forEach(span => {
    if (span.textContent.trim() !== '↗') return;
    span.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="vertical-align:middle"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" stroke-width="1.5"/></svg>';
  });
}

function renderSummary() {
  const stats = getSummary();
  const difference = stats.goalsFor - stats.goalsAgainst;
  const cards = [
    [stats.played, 'played', `${stats.won}–${stats.drawn}–${stats.lost} ${t('record')}`],
    [stats.won, 'victories', `${stats.drawn} ${t('draws')} · ${stats.lost} ${t('defeats')}`],
    [stats.goalsFor, 'goalsFor', 'SHADOWS FC'],
    [stats.goalsAgainst, 'goalsAgainst', `${difference > 0 ? '+' : ''}${difference} ${t('goalDifference')}`],
  ];
  $('#summary-stats').innerHTML = cards.map(([value, label, sub], index) => `<div class="stat"><strong class="stat-number${index === 1 ? ' pink' : ''}">${value}</strong><span class="stat-label">${t(label)}</span><small class="stat-sub">${sub}</small></div>`).join('');
}

function renderMatches() {
  const visible = [...matches].reverse().filter(match => activeFilter === 'all' || outcome(match) === activeFilter);
  $('#match-list').innerHTML = visible.map(match => {
    const result = outcome(match);
    return `<button class="match-row" data-match="${match.id}" aria-label="${esc(t('detail'))}: SHADOWS FC ${match.goalsFor}–${match.goalsAgainst} ${esc(match.opponent)}, ${match.date}, ${t(result + 'Full')}">
      <span class="match-date"><strong>${match.date.replace('/', '.')}</strong><small>MD ${String(match.round).padStart(2, '0')}<br>${match.time}</small></span>
      <span class="match-team"><img class="match-crest club-crest" src="${esc(club.logo)}" alt="" width="600" height="600" loading="lazy"><span>SHADOWS FC</span></span>
      <span class="match-score">${match.goalsFor}<span class="dash">–</span>${match.goalsAgainst}</span>
      <span class="match-team away">${match.logo ? `<img class="match-crest" src="${esc(match.logo)}" alt="" loading="lazy">` : `<span class="mini-emblem opponent" style="--team-color:${match.color}" aria-hidden="true">${esc(match.initials)}</span>`}<span>${esc(match.opponent)}</span></span>
      <span class="match-outcome"><span class="outcome-tag ${result}" aria-hidden="true">${t(result)}</span><span class="row-arrow" aria-hidden="true">↗</span></span></button>`;
  }).join('') || `<p class="empty-results">${t('noResults')}</p>`;
  $('#results-status').textContent = `${visible.length} ${t('matchCount')}`;
  document.querySelectorAll('[data-filter]').forEach(button => {
    const active = button.dataset.filter === activeFilter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderArrows();
}

function renderScorers() {
  $('#scorer-rows').innerHTML = getRankings().map(player => `<tr style="--goals:${player.goals}"><td>${String(player.rank).padStart(2, '0')}</td><td><span class="scorer-name"><span class="scorer-initials" aria-hidden="true">${initials(player.name)}</span>${esc(player.name)}</span></td><td>${player.goals}</td></tr>`).join('');
}

function renderSquad() {
  const query = $('#player-search').value.trim().toLocaleLowerCase();
  const visible = squad.filter(player => `${player.name} ${player.number} ${player.position || ''} ${positionLabel(player.position)}`.toLocaleLowerCase().includes(query));
  $('#squad-grid').innerHTML = visible.map(player => `<button class="player-card${player.photo ? ' has-photo' : ''}" data-player="${player.number}" aria-label="${esc(player.name)}, ${t(player.confirmed ? 'confirmedShirtNumber' : 'shirtNumber')} ${player.number}${player.position ? `, ${esc(positionLabel(player.position))}` : ''}"><span class="player-card-art">${player.photo ? `<img class="player-portrait" src="${esc(player.photo)}" alt="${esc(player.name)}" loading="lazy" width="450" height="560">` : ''}<span class="small-brand">SHADOWS / FC</span><span class="player-number" aria-hidden="true">${String(player.number).padStart(2, '0')}</span></span><span class="player-info"><span class="player-name-group"><strong>${esc(player.name)}</strong>${player.position ? `<small class="player-position">${esc(positionLabel(player.position))}</small>` : ''}</span><span aria-hidden="true">↗</span></span></button>`).join('');
  $('#squad-status').textContent = query ? visible.length ? `${visible.length} ${t('playerCount')}` : t('noPlayers') : '';
  renderArrows();
}

let dialogContent = null;
let dialogTrigger = null;
const dialog = $('#detail-dialog');

function renderDialog() {
  if (!dialogContent) return;
  if (dialogContent.type === 'match') {
    const match = matches.find(item => item.id === dialogContent.id);
    $('#dialog-category').textContent = `${t('matchday')} ${String(match.round).padStart(2, '0')} / ${t('fullTime')}`;
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">SHADOWS FC<br>× ${esc(match.opponent)}</h2><p class="dialog-meta">${t('leagueDetail')}<br>${match.date} · ${match.time}<br>${esc(club.venue)}</p><div class="dialog-score">${match.goalsFor} – ${match.goalsAgainst}</div><h3 class="dialog-subhead">${t('scorerList')}</h3><ul class="dialog-scorers">${match.scorers.map(player => `<li><span>${esc(playerName(player.name))}</span><b>${player.goals}</b></li>`).join('')}</ul>${match.mvp ? `<p class="dialog-meta">${t('mvp')} <strong>${esc(match.mvp)}</strong></p>` : ''}`;
  } else {
    const player = squad.find(item => item.number === dialogContent.id);
    const scorer = getScorers().find(item => item.name === (player.scorerName || player.name));
    $('#dialog-category').textContent = t(player.confirmed ? 'playerProfile' : 'squadProfile');
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">${esc(player.name)}</h2>${player.photo ? `<img class="profile-portrait" src="${esc(player.photo)}" alt="${esc(player.name)}" width="450" height="560">` : ''}<div class="profile-number">#${player.number}</div><p class="dialog-meta">${t(player.confirmed ? 'confirmedShirtNumber' : 'shirtNumber')}</p>${player.position ? `<p class="profile-position"><span>${t('position')}</span><strong>${esc(positionLabel(player.position))}</strong></p>` : ''}${scorer ? `<div class="profile-stats"><div><strong>${scorer.goals}</strong><small>${t('confirmedGoals')}</small></div></div><p class="dialog-note">${t('scopeNote')}</p>` : player.confirmed ? '' : `<p class="dialog-note">${t('unknownGoals')}</p>`}`;
  }
}

function openDialog(content, trigger) {
  dialogContent = content;
  dialogTrigger = trigger;
  renderDialog();
  dialog.showModal();
  document.body.style.overflow = 'hidden';
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
  $('#language-toggle').innerHTML = `${language === 'el' ? 'EN' : 'ΕΛ'} <span aria-hidden="true">↗</span>`;
  $('#language-toggle').setAttribute('aria-label', language === 'el' ? 'Switch to English' : 'Αλλαγή στα Ελληνικά');
  $('#player-search').placeholder = t('searchPlaceholder');
  $('#player-search').setAttribute('aria-label', t('searchLabel'));
  $('#close-dialog').setAttribute('aria-label', t('close'));
  $('#navigation').setAttribute('aria-label', language === 'el' ? 'Κύρια πλοήγηση' : 'Main navigation');
  $('.filter-group').setAttribute('aria-label', language === 'el' ? 'Φίλτρο αποτελεσμάτων' : 'Filter results');
  $('#menu-toggle').setAttribute('aria-label', t($('#menu-toggle').getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'openMenu'));
  renderSummary(); renderMatches(); renderScorers(); renderSquad(); renderDialog();
}

$('#language-toggle').addEventListener('click', () => {
  language = language === 'el' ? 'en' : 'el';
  try { localStorage.setItem('shadows-language', language); } catch { /* Keep the toggle usable without storage. */ }
  render();
});
$('.filter-group').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderMatches();
});
$('#match-list').addEventListener('click', event => {
  const button = event.target.closest('[data-match]');
  if (button) openDialog({ type: 'match', id: button.dataset.match }, button);
});
$('#squad-grid').addEventListener('click', event => {
  const button = event.target.closest('[data-player]');
  if (button) openDialog({ type: 'player', id: Number(button.dataset.player) }, button);
});
$('#player-search').addEventListener('input', renderSquad);
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  dialogContent = null;
  if (dialogTrigger?.isConnected) dialogTrigger.focus();
});
$('#menu-toggle').addEventListener('click', () => setMenu($('#menu-toggle').getAttribute('aria-expanded') !== 'true'));
$('#navigation').addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 800) setMenu(false); });
render();

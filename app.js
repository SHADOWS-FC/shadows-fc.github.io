import { club, matches, squad, getSummary, getScorers, getRankings, playerName, matchOutcome, selectMatches, getMatchMonths, getScoringHistory } from './data.js?v=20261022-season-explorer';

const messages = {
  el: {
    opponentSearch: 'Αναζήτηση αντιπάλου', matchSearchPlaceholder: 'π.χ. Savralliolid', monthLabel: 'Μήνας', allMonths: 'Όλοι οι μήνες',
    sortLabel: 'Ταξινόμηση', newest: 'Πιο πρόσφατα', oldest: 'Παλαιότερα πρώτα', mostGoals: 'Περισσότερα γκολ SHADOWS',
    drawsLabel: 'Ισοπαλίες', cardsView: 'Κάρτες', listView: 'Λίστα', resetFilters: 'Καθαρισμός φίλτρων',
    recentForm: 'ΠΡΟΣΦΑΤΗ ΦΟΡΜΑ', formHint: 'Πάτησε ένα αποτέλεσμα για τον αγώνα',
    previousPage: 'Προηγούμενη', nextPage: 'Επόμενη', selectedMatches: 'ΑΓΩΝΕΣ ΣΤΗΝ ΕΠΙΛΟΓΗ',
    selectionRecord: 'Ν–Ι–Η ΣΤΗΝ ΕΠΙΛΟΓΗ', selectionGoals: 'ΓΚΟΛ ΥΠΕΡ / ΚΑΤΑ', averageGoals: 'ΓΚΟΛ ΥΠΕΡ / ΑΓΩΝΑ',
    selectionScope: 'Στατιστικά για την παραπάνω επιλογή αγώνων.', fullScope: 'Στατιστικά για όλους τους καταγεγραμμένους αγώνες.',
    changeSelection: 'Αλλαγή επιλογής αγώνων ↑', topScorer: 'ΣΤΗΝ ΚΟΡΥΦΗ', noScoring: 'Δεν υπάρχουν γκολ σε αυτή την επιλογή.',
    goalsUnit: 'γκολ', scoringMatches: 'ΑΓΩΝΕΣ ΜΕ ΚΑΤΑΓΕΓΡΑΜΜΕΝΑ ΓΚΟΛ', scoringHistory: 'ΤΑ ΓΚΟΛ ΑΝΑ ΑΓΩΝΑ',
    scorerHistory: 'ΙΣΤΟΡΙΚΟ ΣΚΟΡΕΡ', noScoringHistory: 'Δεν υπάρχουν καταγεγραμμένα γκολ για αυτόν τον παίκτη.',
    previousMatch: '← Προηγούμενος αγώνας', nextMatch: 'Επόμενος αγώνας →', copyLink: 'Αντιγραφή συνδέσμου',
    linkCopied: 'Ο σύνδεσμος αντιγράφηκε.', copyManually: 'Αντίγραψε αυτόν τον σύνδεσμο:', backToPlayer: '← Επιστροφή στον παίκτη',
    browseMatches: 'Περιήγηση αγώνων', viewLabel: 'Προβολή αγώνων', paginationLabel: 'Σελίδες αγώνων',

    skip: 'Μετάβαση στο περιεχόμενο', navResults: 'Αποτελέσματα', navScorers: 'Σκόρερ', navSquad: 'Ομάδα', navClub: 'Ο σύλλογος', navPartners: 'Χορηγοί',
    partnersTitle: 'Οι συνεργάτες μας.', partnersAside: 'ΟΙ ΑΝΘΡΩΠΟΙ ΠΙΣΩ ΑΠΟ ΤΟ ΕΜΒΛΗΜΑ', partnerFront: 'ΜΠΡΟΣΤΑ ΣΤΗ ΦΑΝΕΛΑ', partnerSleeve: 'ΧΟΡΗΓΟΣ ΜΑΝΙΚΙΟΥ', partnerBack: 'ΠΙΣΩ ΣΤΗ ΦΑΝΕΛΑ', partnerKit: 'ΧΡΥΣΗ ΕΜΦΑΝΙΣΗ',
    heroDescription: 'Από τη Βουλιαγμένη. Για το έμβλημα. Μια ομάδα, μια κοινή ιστορία.', viewResults: 'Δες τους αγώνες',
    heroFootnote: 'ΑΠΟ ΤΗ ΒΟΥΛΙΑΓΜΕΝΗ. ΓΙΑ ΤΗΝ ΟΜΑΔΑ.', latestResult: 'ΤΕΛΕΥΤΑΙΟ ΑΠΟΤΕΛΕΣΜΑ', fullTime: 'ΤΕΛΙΚΟ',
    firstWin: 'Η ΠΡΩΤΗ ΝΙΚΗ. ΚΑΙ ΣΥΝΕΧΙΖΟΥΜΕ.', goals: 'ΓΚΟΛ', soFar: 'Η ΠΟΡΕΙΑ ΜΑΣ', seasonNumbers: 'Η ομάδα σε αριθμούς.',
    resultsTitle: 'Κάθε ματς, μια ιστορία.',
    allGames: 'Όλοι οι αγώνες', wins: 'Νίκες', losses: 'Ήττες', clickMatch: 'Επίλεξε αγώνα για τους σκόρερ ↗',
    mvpTitle: 'Τρία γκολ.\nΜια μεγάλη βραδιά.', mvpDescription: 'Χατ τρικ στη νίκη με 7–6 απέναντι στη Savralliolid FC. Ο Γκούμας αναδείχθηκε MVP του αγώνα.',
    matchGoals: 'ΓΚΟΛ ΣΤΟΝ ΑΓΩΝΑ', recordedGoals: 'ΣΥΝΟΛΙΚΑ ΓΚΟΛ', allScorers: 'Όλοι οι σκόρερ', scorersTitle: 'Οι σκόρερ μας.',
    jointLeaders: 'ΣΤΗΝ ΚΟΡΥΦΗ ΜΑΖΙ', goalsEach: 'ΓΚΟΛ Ο ΚΑΘΕΝΑΣ',
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
    confirmedGoals: 'ΚΑΤΑΓΕΓΡΑΜΜΕΝΑ ΓΚΟΛ', unknownGoals: 'Δεν έχει επιβεβαιωθεί αντιστοίχιση με τους σκόρερ των αναρτήσεων.',
    detail: 'Λεπτομέρειες', noResults: 'Δεν υπάρχουν αποτελέσματα για αυτό το φίλτρο.',
    scopeNote: 'Οι αριθμοί αφορούν τους καταγεγραμμένους αγώνες.', mvp: 'MVP ΤΟΥ ΑΓΩΝΑ',
    goalDifference: 'διαφορά γκολ', record: 'Ν–Ι–Η',
  },
  en: {
    opponentSearch: 'Search opponents', matchSearchPlaceholder: 'e.g. Savralliolid', monthLabel: 'Month', allMonths: 'All months',
    sortLabel: 'Sort by', newest: 'Newest first', oldest: 'Oldest first', mostGoals: 'Most SHADOWS goals',
    drawsLabel: 'Draws', cardsView: 'Cards', listView: 'List', resetFilters: 'Clear filters',
    recentForm: 'RECENT FORM', formHint: 'Select a result to explore the match',
    previousPage: 'Previous', nextPage: 'Next', selectedMatches: 'MATCHES SELECTED',
    selectionRecord: 'W–D–L IN SELECTION', selectionGoals: 'GOALS FOR / AGAINST', averageGoals: 'GOALS FOR / MATCH',
    selectionScope: 'Statistics for the match selection above.', fullScope: 'Statistics for all recorded matches.',
    changeSelection: 'Change match selection ↑', topScorer: 'TOP SCORER', noScoring: 'No goals in this selection.',
    goalsUnit: 'goals', scoringMatches: 'GAMES WITH RECORDED GOALS', scoringHistory: 'GOALS BY MATCH',
    scorerHistory: 'SCORER HISTORY', noScoringHistory: 'No goals have been recorded for this player.',
    previousMatch: '← Previous match', nextMatch: 'Next match →', copyLink: 'Copy link',
    linkCopied: 'Link copied.', copyManually: 'Copy this link:', backToPlayer: '← Back to player',
    browseMatches: 'Browse matches', viewLabel: 'Match view', paginationLabel: 'Match pages',

    skip: 'Skip to content', navResults: 'Results', navScorers: 'Scorers', navSquad: 'Squad', navClub: 'The club', navPartners: 'Partners',
    partnersTitle: 'Backed by our people.', partnersAside: 'THE PEOPLE BEHIND THE BADGE', partnerFront: 'FRONT OF SHIRT', partnerSleeve: 'SLEEVE PARTNER', partnerBack: 'BACK OF SHIRT', partnerKit: 'GOLD KIT PARTNER',
    heroDescription: 'Built in Vouliagmeni. Driven by the badge. One team, one shared story.', viewResults: 'Explore the matches',
    heroFootnote: 'FROM VOULIAGMENI. FOR THE TEAM.', latestResult: 'LATEST RESULT', fullTime: 'FULL TIME', firstWin: 'THE FIRST WIN. WE GO AGAIN.',
    goals: 'GOALS', soFar: 'THE STORY SO FAR', seasonNumbers: 'The team in numbers.',
    resultsTitle: 'Every match, a story.', allGames: 'All matches', wins: 'Wins', losses: 'Losses',
    clickMatch: 'Select a match to see the scorers ↗', mvpTitle: 'Three goals.\nOne big night.',
    mvpDescription: 'A hat-trick in the 7–6 win against Savralliolid FC. Gkoumas was named player of the match.',
    matchGoals: 'MATCH GOALS', recordedGoals: 'TOTAL RECORDED GOALS', allScorers: 'All goalscorers', scorersTitle: 'On the scoresheet.',
    jointLeaders: 'SHARING THE TOP SPOT', goalsEach: 'GOALS EACH',
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
    confirmedGoals: 'RECORDED GOALS', unknownGoals: 'A link to the scorer names in the club posts has not been confirmed.',
    detail: 'Details', noResults: 'No results for this filter.', scopeNote: 'Statistics cover the recorded matches.', mvp: 'PLAYER OF THE MATCH',
    goalDifference: 'goal difference', record: 'W–D–L',
  },
};

let language = 'el';
try { if (localStorage.getItem('shadows-language') === 'en') language = 'en'; } catch { /* Storage may be disabled. */ }
const PAGE_SIZE = 8;
const archive = { query: '', month: '', result: 'all', sort: 'newest', view: 'cards', page: 1 };
let dialogContent = null;
let dialogTrigger = null;
let closingFromHistory = false;
const $ = selector => document.querySelector(selector);
const t = key => messages[language][key];
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

const monthName = month => new Intl.DateTimeFormat(language === 'el' ? 'el-GR' : 'en-GB', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, Number(month) - 1, 1)));
const selectedMatches = () => selectMatches(matches, archive);
const hasFilters = () => Boolean(archive.query.trim() || archive.month || archive.result !== 'all');
const scorerProfile = name => squad.find(player => (player.scorerName || player.name) === playerName(name));

function readArchiveUrl() {
  const params = new URL(location.href).searchParams;
  archive.query = (params.get('q') || '').slice(0, 100);
  archive.month = getMatchMonths().includes(params.get('month')) ? params.get('month') : '';
  archive.result = ['win', 'draw', 'loss'].includes(params.get('result')) ? params.get('result') : 'all';
  archive.sort = ['oldest', 'goals'].includes(params.get('sort')) ? params.get('sort') : 'newest';
  archive.view = params.get('view') === 'list' ? 'list' : 'cards';
  archive.page = Math.max(1, Math.min(10000, Number.parseInt(params.get('page'), 10) || 1));
}

function dialogFromUrl() {
  const params = new URL(location.href).searchParams;
  if (matches.some(match => match.id === params.get('match'))) return { type: 'match', id: params.get('match') };
  if (squad.some(player => String(player.number) === params.get('player'))) return { type: 'player', id: Number(params.get('player')) };
  if (getScorers().some(scorer => scorer.name === params.get('scorer'))) return { type: 'scorer', name: params.get('scorer') };
  return null;
}

function writeUrl(push = false) {
  const url = new URL(location.href);
  for (const key of ['q', 'month', 'result', 'sort', 'view', 'page', 'match', 'player', 'scorer']) url.searchParams.delete(key);
  if (archive.query.trim()) url.searchParams.set('q', archive.query.trim());
  if (archive.month) url.searchParams.set('month', archive.month);
  if (archive.result !== 'all') url.searchParams.set('result', archive.result);
  if (archive.sort !== 'newest') url.searchParams.set('sort', archive.sort);
  if (archive.view !== 'cards') url.searchParams.set('view', archive.view);
  if (archive.page > 1) url.searchParams.set('page', archive.page);
  if (dialogContent) url.searchParams.set(dialogContent.type === 'match' ? 'match' : dialogContent.type === 'player' ? 'player' : 'scorer', dialogContent.id ?? dialogContent.name);
  if (url.href !== location.href) {
    try { history[push ? 'pushState' : 'replaceState'](null, '', url); } catch { /* Browsing still works when history is unavailable. */ }
  }
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
  $('#summary-scope').textContent = language === 'el' ? `Καταγεγραμμένοι αγώνες: ${stats.played}.` : `${stats.played} recorded matches.`;
  $('#archive-total').textContent = `${stats.played} ${t('matchCount').toLocaleUpperCase()}`;
  $('#recent-form').innerHTML = selectMatches(matches, { sort: 'oldest' }).slice(-5).map(match => `<button class="form-result ${outcome(match)}" data-open-match="${esc(match.id)}" aria-label="${esc(`${match.date}, ${match.opponent}, ${match.goalsFor}–${match.goalsAgainst}, ${t(outcome(match) + 'Full')}`)}" title="${esc(`${match.date} · ${match.opponent} · ${match.goalsFor}–${match.goalsAgainst}`)}">${t(outcome(match))}</button>`).join('');
}

// One shared crest area keeps different badge proportions aligned across views.
function crestMarkup(logo, fallback = '', shape = '') {
  return `<span class="crest-frame">${logo
    ? `<img class="match-crest${shape === 'shield' ? ' crest-shield' : ''}" src="${esc(logo)}" alt="" loading="lazy">`
    : `<span class="crest-fallback" aria-hidden="true">${esc(fallback)}</span>`}</span>`;
}

function renderLatest() {
  const latest = selectMatches()[0];
  if (!latest) return;
  $('.hero-match').setAttribute('aria-label', `SHADOWS FC — ${latest.opponent}`);
  $('.hero-match').innerHTML = `<div class="match-topline"><span class="eyebrow">${t('latestResult')}</span><span class="result-badge">${t('fullTime')}</span></div>
    <div class="match-meta"><span>MASTER LEAGUE</span><span>${latest.date.replace('/', '.')} · ${latest.time}</span></div>
    <div class="hero-teams"><div class="hero-team">${crestMarkup(club.logo)}<strong>SHADOWS FC</strong><small>VOULIAGMENI</small></div>
    <div class="hero-score" aria-label="SHADOWS FC ${latest.goalsFor}, ${esc(latest.opponent)} ${latest.goalsAgainst}"><span>${latest.goalsFor}</span><i>–</i><span>${latest.goalsAgainst}</span></div>
    <div class="hero-team">${crestMarkup(latest.logo, latest.initials, latest.crestShape)}<strong>${esc(latest.opponent.replace(/ FC$/, ''))}</strong><small>FC</small></div></div>
    <p class="scoreboard-venue">STAR SPORT CLUB · VOULA</p>
    <div class="win-note"><span class="status-dot"></span><span>${t(outcome(latest) + 'Full').toLocaleUpperCase()} · ${t('matchday')} ${String(latest.round).padStart(2, '0')}</span></div>
    <div class="hero-scorers"><span>${t('goals')}</span>${latest.scorers.map(scorer => `<strong>${esc(playerName(scorer.name))} <b>${scorer.goals}</b></strong>`).join('')}</div>
    <button class="hero-open-match" data-open-match="${esc(latest.id)}">${t('detail')} <span aria-hidden="true">↗</span></button>`;
}

function renderMatches() {
  const visible = selectedMatches();
  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  archive.page = Math.min(archive.page, pages);
  const start = (archive.page - 1) * PAGE_SIZE;
  const pageMatches = visible.slice(start, start + PAGE_SIZE);
  $('#match-list').classList.toggle('compact-view', archive.view === 'list');
  $('#match-list').innerHTML = pageMatches.map(match => {
    const result = outcome(match);
    return `<button class="match-row" data-open-match="${esc(match.id)}" aria-label="${esc(t('detail'))}: SHADOWS FC ${match.goalsFor}–${match.goalsAgainst} ${esc(match.opponent)}, ${match.date}, ${t(result + 'Full')}">
      <span class="match-date"><strong>${match.date.replace('/', '.')}</strong><small>MASTER LEAGUE · MD ${String(match.round).padStart(2, '0')}</small></span>
      <span class="match-team">${crestMarkup(club.logo)}<span>SHADOWS FC</span></span>
      <span class="match-score"><span class="score-value">${match.goalsFor}<span class="dash">–</span>${match.goalsAgainst}</span><small>${t('fullTime')}</small></span>
      <span class="match-team away">${crestMarkup(match.logo, match.initials, match.crestShape)}<span>${esc(match.opponent)}</span></span>
      <span class="match-outcome"><span class="outcome-tag ${result}" aria-hidden="true">${t(result)}</span></span><span class="match-card-footer"><span>${match.time} · STAR SPORT CLUB</span><span>${t('detail')} <span class="row-arrow" aria-hidden="true">↗</span></span></span></button>`;
  }).join('') || `<div class="empty-results"><p>${t('noResults')}</p><button class="reset-filters" data-reset-filters>${t('resetFilters')}</button></div>`;
  $('#results-status').textContent = language === 'el' ? `${visible.length} από ${matches.length} αγώνες${archive.month ? ' · ' + monthName(archive.month) : ''}` : `${visible.length} of ${matches.length} matches${archive.month ? ' · ' + monthName(archive.month) : ''}`;
  $('#reset-filters').hidden = !hasFilters();
  $('#match-search').value = archive.query;
  $('#match-month').innerHTML = `<option value="">${t('allMonths')}</option>${getMatchMonths().map(month => `<option value="${month}">${monthName(month)}</option>`).join('')}`;
  $('#match-month').value = archive.month;
  $('#match-sort').value = archive.sort;
  document.querySelectorAll('[data-filter]').forEach(button => {
    const active = button.dataset.filter === archive.result;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === archive.view)));
  const stats = getSummary(visible);
  const metrics = [[stats.played, 'selectedMatches'], [`${stats.won}–${stats.drawn}–${stats.lost}`, 'selectionRecord'], [`${stats.goalsFor} / ${stats.goalsAgainst}`, 'selectionGoals'], [stats.played ? (stats.goalsFor / stats.played).toLocaleString(language === 'el' ? 'el-GR' : 'en-GB', { maximumFractionDigits: 1 }) : '—', 'averageGoals']];
  $('#selection-stats').innerHTML = metrics.map(([value, label]) => `<div><strong>${value}</strong><small>${t(label)}</small></div>`).join('');
  $('.archive-pagination').hidden = pages === 1;
  $('.archive-pagination').setAttribute('aria-label', t('paginationLabel'));
  $('#page-status').textContent = `${visible.length ? start + 1 : 0}–${Math.min(start + PAGE_SIZE, visible.length)} / ${visible.length}`;
  $('#previous-page').disabled = archive.page === 1;
  $('#next-page').disabled = archive.page === pages;
  renderScorers();
  renderArrows();
}

function renderScorers() {
  const selected = selectedMatches();
  const rankings = getRankings(selected);
  const leaders = rankings.filter(player => player.rank === 1);
  const total = getSummary(selected).goalsFor;
  $('#scorers-total').textContent = `${total} ${t('goals')} · ${selected.length} ${t('matchCount').toLocaleUpperCase()}`;
  $('#scorer-scope-note').textContent = t(hasFilters() ? 'selectionScope' : 'fullScope');
  $('#scoring-leaders').innerHTML = leaders.length ? `<span class="eyebrow">${t(leaders.length > 1 ? 'jointLeaders' : 'topScorer')}</span><div class="top-scorer-number">${leaders[0].goals}<span>${t(leaders.length > 1 ? 'goalsEach' : 'goals')}</span></div><h3>${leaders.map(player => esc(player.name).toLocaleUpperCase()).join('<br><span>&</span> ')}</h3><p>${t('scoringNote')}</p>` : `<p class="eyebrow">${t('topScorer')}</p><h3>—</h3><p>${t('noScoring')}</p>`;
  $('#scorer-rows').innerHTML = rankings.map(player => `<tr style="--goals:${player.goals};--scoring-share:${player.goals / (rankings[0]?.goals || 1)}"><td>${String(player.rank).padStart(2, '0')}</td><td><button class="scorer-name scorer-link" data-open-scorer="${esc(player.name)}"><span class="scorer-initials" aria-hidden="true">${initials(player.name)}</span>${esc(player.name)}<span class="scorer-chevron" aria-hidden="true">↗</span></button></td><td>${player.goals}</td></tr>`).join('') || `<tr><td colspan="3" class="empty-scorers">${t('noScoring')}</td></tr>`;
  $('#mvp-total-goals').textContent = getScorers().find(player => player.name === 'Gkoumas')?.goals ?? 0;
}

function renderSquad() {
  const query = $('#player-search').value.trim().toLocaleLowerCase();
  const visible = squad.filter(player => `${player.name} ${player.number} ${player.position || ''} ${positionLabel(player.position)}`.toLocaleLowerCase().includes(query));
  $('#squad-grid').innerHTML = visible.map(player => `<button class="player-card${player.photo ? ' has-photo' : ''}" data-player="${player.number}" aria-label="${esc(player.name)}, ${t(player.confirmed ? 'confirmedShirtNumber' : 'shirtNumber')} ${player.number}${player.position ? `, ${esc(positionLabel(player.position))}` : ''}"><span class="player-card-art">${player.photo ? `<img class="player-portrait" src="${esc(player.photo)}" alt="${esc(player.name)}" loading="lazy" width="450" height="560">` : ''}<span class="small-brand">SHADOWS / FC</span><span class="player-number" aria-hidden="true">${String(player.number).padStart(2, '0')}</span></span><span class="player-info"><span class="player-name-group"><strong>${esc(player.name)}</strong>${player.position ? `<small class="player-position">${esc(positionLabel(player.position))}</small>` : ''}</span><span aria-hidden="true">↗</span></span></button>`).join('');
  $('#squad-status').textContent = query ? visible.length ? `${visible.length} ${t('playerCount')}` : t('noPlayers') : '';
  renderArrows();
}

const dialog = $('#detail-dialog');

function scoringHistoryMarkup(name) {
  const history = getScoringHistory(name);
  const total = history.reduce((sum, entry) => sum + entry.goals, 0);
  return `${history.length ? `<div class="profile-stats history-totals"><div><strong>${total}</strong><small>${t('confirmedGoals')}</small></div><div><strong>${history.length}</strong><small>${t('scoringMatches')}</small></div></div>` : ''}
    <h3 class="dialog-subhead">${t('scoringHistory')}</h3><p class="dialog-note">${t('scopeNote')}</p>
    <div class="scoring-history">${history.map(({ match, goals }) => `<button data-open-match="${esc(match.id)}"><span><small>${match.date} · MD ${String(match.round).padStart(2, '0')}</small><strong>${esc(match.opponent)}</strong></span><span class="history-score">${match.goalsFor}–${match.goalsAgainst}</span><span class="history-goals"><b>${goals}</b> ${t('goalsUnit')} <span aria-hidden="true">↗</span></span></button>`).join('') || `<p class="dialog-note">${t('noScoringHistory')}</p>`}</div>`;
}

function renderDialog() {
  if (!dialogContent) return;
  if (dialogContent.type === 'match') {
    const match = matches.find(item => item.id === dialogContent.id);
    if (!match) return;
    const ordered = selectMatches(matches, { sort: 'oldest' });
    const index = ordered.findIndex(item => item.id === match.id);
    $('#dialog-category').textContent = `${t('matchday')} ${String(match.round).padStart(2, '0')} / ${t('fullTime')}`;
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">SHADOWS FC<br>× ${esc(match.opponent)}</h2><p class="dialog-meta">${t('leagueDetail')}<br>${match.date} · ${match.time}<br>${esc(club.venue)}</p><div class="dialog-scoreboard">${crestMarkup(club.logo)}<div class="dialog-score">${match.goalsFor} – ${match.goalsAgainst}</div>${crestMarkup(match.logo, match.initials, match.crestShape)}</div>
      <h3 class="dialog-subhead">${t('scorerList')}</h3><ul class="dialog-scorers">${match.scorers.map(player => `<li><button class="dialog-scorer-link" data-open-scorer="${esc(playerName(player.name))}">${esc(playerName(player.name))} <span aria-hidden="true">↗</span></button><b>${player.goals}</b></li>`).join('')}</ul>${match.mvp ? `<p class="dialog-meta">${t('mvp')} <strong>${esc(match.mvp)}</strong></p>` : ''}
      <nav class="match-navigation" aria-label="${t('browseMatches')}"><button data-step-match="${esc(ordered[index - 1]?.id || '')}" ${index === 0 ? 'disabled' : ''}>${t('previousMatch')}</button><span>${index + 1} / ${ordered.length}</span><button data-step-match="${esc(ordered[index + 1]?.id || '')}" ${index === ordered.length - 1 ? 'disabled' : ''}>${t('nextMatch')}</button></nav>`;
  } else if (dialogContent.type === 'player') {
    const player = squad.find(item => item.number === dialogContent.id);
    if (!player) return;
    $('#dialog-category').textContent = t('playerProfile');
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">${esc(player.name)}</h2>${player.photo ? `<img class="profile-portrait" src="${esc(player.photo)}" alt="${esc(player.name)}" width="450" height="560">` : ''}<div class="profile-number">#${player.number}</div><p class="dialog-meta">${t('confirmedShirtNumber')}</p>${player.position ? `<p class="profile-position"><span>${t('position')}</span><strong>${esc(positionLabel(player.position))}</strong></p>` : ''}${scoringHistoryMarkup(player.scorerName || player.name)}`;
  } else {
    $('#dialog-category').textContent = t('scorerHistory');
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">${esc(dialogContent.name)}</h2>${scoringHistoryMarkup(dialogContent.name)}`;
  }
  $('#dialog-body').insertAdjacentHTML('beforeend', `<div class="share-detail"><button id="copy-detail-link">${t('copyLink')} <span aria-hidden="true">↗</span></button><p id="share-status" role="status" aria-live="polite"></p><label class="share-fallback" hidden><span>${t('copyManually')}</span><input type="text" readonly aria-label="${t('copyLink')}"></label></div>`);
  renderArrows();
}

function openDialog(content, trigger = null, push = true) {
  if (!dialog.open) dialogTrigger = trigger;
  dialogContent = content;
  if (push) writeUrl(true);
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
  $('#language-toggle').innerHTML = `${language === 'el' ? 'EN' : 'ΕΛ'} <span aria-hidden="true">↗</span>`;
  $('#language-toggle').setAttribute('aria-label', language === 'el' ? 'Switch to English' : 'Αλλαγή στα Ελληνικά');
  $('#player-search').placeholder = t('searchPlaceholder');
  $('#player-search').setAttribute('aria-label', t('searchLabel'));
  $('#close-dialog').setAttribute('aria-label', t('close'));
  $('#navigation').setAttribute('aria-label', language === 'el' ? 'Κύρια πλοήγηση' : 'Main navigation');
  $('.filter-group').setAttribute('aria-label', language === 'el' ? 'Φίλτρο αποτελεσμάτων' : 'Filter results');
  $('#menu-toggle').setAttribute('aria-label', t($('#menu-toggle').getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'openMenu'));
  $('#match-search').placeholder = t('matchSearchPlaceholder');
  $('.view-switch').setAttribute('aria-label', t('viewLabel'));
  renderSummary(); renderLatest(); renderMatches(); renderSquad(); renderDialog();
}

$('#language-toggle').addEventListener('click', () => {
  language = language === 'el' ? 'en' : 'el';
  try { localStorage.setItem('shadows-language', language); } catch { /* Keep the toggle usable without storage. */ }
  render();
});
function updateArchive(resetPage = true) {
  if (resetPage) archive.page = 1;
  renderMatches();
  writeUrl();
}
function resetArchive() {
  Object.assign(archive, { query: '', month: '', result: 'all', sort: 'newest', page: 1 });
  updateArchive();
}
$('.filter-group').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (button) { archive.result = button.dataset.filter; updateArchive(); }
});
$('#match-search').addEventListener('input', event => { archive.query = event.target.value; updateArchive(); });
$('#match-month').addEventListener('change', event => { archive.month = event.target.value; updateArchive(); });
$('#match-sort').addEventListener('change', event => { archive.sort = event.target.value; updateArchive(); });
$('.view-switch').addEventListener('click', event => {
  const button = event.target.closest('[data-view]');
  if (button) { archive.view = button.dataset.view; updateArchive(false); }
});
$('#reset-filters').addEventListener('click', resetArchive);
for (const [id, step] of [['previous-page', -1], ['next-page', 1]]) {
  $('#' + id).addEventListener('click', () => {
    archive.page += step; updateArchive(false);
    $('#results-status').tabIndex = -1;
    $('#results-status').focus({ preventScroll: true });
    $('#results-status').scrollIntoView({ block: 'start' });
  });
}
document.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-open-match')) openDialog({ type: 'match', id: button.dataset.openMatch }, button);
  else if (button.hasAttribute('data-open-scorer')) showScorer(button.dataset.openScorer, button);
  else if (button.hasAttribute('data-player')) openDialog({ type: 'player', id: Number(button.dataset.player) }, button);
  else if (button.hasAttribute('data-step-match') && button.dataset.stepMatch) {
    openDialog({ type: 'match', id: button.dataset.stepMatch }, button, false); writeUrl();
  } else if (button.hasAttribute('data-reset-filters')) { resetArchive(); $('#match-search').focus(); }
  else if (button.id === 'copy-detail-link') {
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
  readArchiveUrl(); renderMatches();
  const requested = dialogFromUrl();
  if (requested) openDialog(requested, null, false);
  else if (dialog.open) { closingFromHistory = true; dialog.close(); }
});
$('#player-search').addEventListener('input', renderSquad);
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  if (dialog.open) { closingFromHistory = false; return; }
  document.body.style.overflow = '';
  dialogContent = null;
  if (!closingFromHistory) writeUrl();
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

import { club, matches, squad, announcements, getSummary, getScorers, getRankings, playerName, matchOutcome, selectMatches, getScoringHistory } from './data.js?v=20261022-gold-lines';

const messages = {
  el: {
    squadGoalkeepers: 'Τερματοφύλακες', squadDefenders: 'Αμυντικοί', squadMidfielders: 'Μέσοι', squadForwards: 'Επιθετικοί',
    galleryLabel: 'Φωτογραφίες ομάδας', galleryRole: 'συλλογή φωτογραφιών', gallerySlide: 'φωτογραφία',
    galleryInstructions: 'Σύρε ή χρησιμοποίησε τα πλήκτρα με τα βέλη για αλλαγή φωτογραφίας',
    galleryPrevious: 'Προηγούμενη φωτογραφία', galleryNext: 'Επόμενη φωτογραφία', galleryPhoto: 'Φωτογραφία', galleryOf: 'από',
    galleryHint: 'Σύρε ή πάτησε τα βελάκια', celebrationPhotoAlt: 'Η ομάδα των SHADOWS FC στο γήπεδο με κύπελλο και μετάλλια',
    navAnnouncements: 'Ανακοινώσεις', announcementsTitle: 'Ανακοινώσεις ομάδας.',
    announcementsIntro: 'Όλες οι επίσημες ενημερώσεις της ομάδας, σε ένα σημείο.',
    officialAnnouncement: 'ΕΠΙΣΗΜΗ ΑΝΑΚΟΙΝΩΣΗ', announcementCount: 'ανακοινώσεις', announcementSingular: 'ανακοίνωση',
    readAnnouncement: 'Διάβασε την ανακοίνωση', noAnnouncements: 'Οι ανακοινώσεις της ομάδας θα εμφανίζονται εδώ.', backHome: 'Αρχική σελίδα',
    startingSeven: 'ΑΡΧΙΚΗ ΕΠΤΑΔΑ', matchdayPlayers: 'ΑΠΟΣΤΟΛΗ ΑΓΩΝΑ', substitutes: 'ΑΝΑΠΛΗΡΩΜΑΤΙΚΟΙ',
    coachingStaff: 'ΠΡΟΠΟΝΗΤΙΚΟ ΕΠΙΤΕΛΕΙΟ', headCoach: 'Προπονητής', lineupTitle: 'ΣΥΝΘΕΣΗ ΟΜΑΔΑΣ',
    lineupNotRecorded: 'Δεν έχει καταχωριστεί ακόμη η σύνθεση για αυτόν τον αγώνα.',
    injuryUpdate: 'ΤΡΑΥΜΑΤΙΣΜΟΣ', injuredInMatch: 'Τραυματίστηκε στον αγώνα με', estimatedAbsence: 'Εκτιμώμενη απουσία',
    monthsUnit: 'μήνες', estimatedReturn: 'Εκτιμώμενη επιστροφή',
    'mid-November': 'μέσα Νοεμβρίου',

    teamPhotoAlt: 'Η ομάδα των SHADOWS FC στο γήπεδο', newestFirst: 'Από τον πιο πρόσφατο αγώνα',
    opponentSearch: 'Αναζήτηση αντιπάλου', matchSearchPlaceholder: 'π.χ. Savralliolid', monthLabel: 'Μήνας', allMonths: 'Όλοι οι μήνες',
    sortLabel: 'Ταξινόμηση', newest: 'Πιο πρόσφατα', oldest: 'Παλαιότερα πρώτα', mostGoals: 'Περισσότερα γκολ SHADOWS',
    drawsLabel: 'Ισοπαλίες', cardsView: 'Κάρτες', listView: 'Λίστα', resetFilters: 'Καθαρισμός φίλτρων',
    recentForm: 'ΠΡΟΣΦΑΤΗ ΦΟΡΜΑ', formHint: 'Πάτησε ένα αποτέλεσμα για τον αγώνα',
    previousPage: 'Προηγούμενη', nextPage: 'Επόμενη', selectedMatches: 'ΑΓΩΝΕΣ ΣΤΗΝ ΕΠΙΛΟΓΗ',
    selectionRecord: 'Ν–Ι–Η ΣΤΗΝ ΕΠΙΛΟΓΗ', selectionGoals: 'ΓΚΟΛ ΥΠΕΡ / ΚΑΤΑ', averageGoals: 'ΓΚΟΛ ΥΠΕΡ / ΑΓΩΝΑ',
    selectionScope: 'Στατιστικά για την παραπάνω επιλογή αγώνων.', fullScope: 'Στατιστικά για όλους τους καταγεγραμμένους αγώνες.',
    changeSelection: 'Αλλαγή επιλογής αγώνων ↑', topScorer: 'ΣΤΗΝ ΚΟΡΥΦΗ', noScoring: 'Δεν υπάρχουν καταγεγραμμένα γκολ.',
    goalsUnit: 'γκολ', scoringMatches: 'ΑΓΩΝΕΣ ΜΕ ΚΑΤΑΓΕΓΡΑΜΜΕΝΑ ΓΚΟΛ', scoringHistory: 'ΤΑ ΓΚΟΛ ΑΝΑ ΑΓΩΝΑ',
    scorerHistory: 'ΙΣΤΟΡΙΚΟ ΣΚΟΡΕΡ', noScoringHistory: 'Δεν υπάρχουν καταγεγραμμένα γκολ για αυτόν τον παίκτη.',
    previousMatch: '← Προηγούμενος αγώνας', nextMatch: 'Επόμενος αγώνας →', copyLink: 'Αντιγραφή συνδέσμου',
    linkCopied: 'Ο σύνδεσμος αντιγράφηκε.', copyManually: 'Αντίγραψε αυτόν τον σύνδεσμο:', backToPlayer: '← Επιστροφή στον παίκτη',
    browseMatches: 'Περιήγηση αγώνων', viewLabel: 'Προβολή αγώνων', paginationLabel: 'Σελίδες αγώνων',

    skip: 'Μετάβαση στο περιεχόμενο', navResults: 'Αποτελέσματα', navScorers: 'Σκόρερ', navSquad: 'Ομάδα', navClub: 'Ο σύλλογος',

    heroDescription: 'Από τη Βουλιαγμένη. Για το έμβλημα. Μια ομάδα, μια κοινή ιστορία.', viewResults: 'Δες τους αγώνες',
    heroFootnote: 'ΑΠΟ ΤΗ ΒΟΥΛΙΑΓΜΕΝΗ. ΓΙΑ ΤΗΝ ΟΜΑΔΑ.', latestResult: 'ΤΕΛΕΥΤΑΙΟ ΑΠΟΤΕΛΕΣΜΑ', fullTime: 'ΤΕΛΙΚΟ',
    firstWin: 'Η ΠΡΩΤΗ ΝΙΚΗ. ΚΑΙ ΣΥΝΕΧΙΖΟΥΜΕ.', goals: 'ΓΚΟΛ', soFar: 'Η ΠΟΡΕΙΑ ΜΑΣ', seasonNumbers: 'Η ομάδα σε αριθμούς.',
    resultsTitle: 'Οι αγώνες μας.',
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
    detail: 'Λεπτομέρειες', noResults: 'Δεν υπάρχουν ακόμη καταγεγραμμένοι αγώνες.',
    scopeNote: 'Οι αριθμοί αφορούν τους καταγεγραμμένους αγώνες.', mvp: 'MVP',
    goalDifference: 'διαφορά γκολ', record: 'Ν–Ι–Η',
  },
  en: {
    squadGoalkeepers: 'Goalkeepers', squadDefenders: 'Defenders', squadMidfielders: 'Midfielders', squadForwards: 'Forwards',
    galleryLabel: 'Team photographs', galleryRole: 'photo gallery', gallerySlide: 'slide',
    galleryInstructions: 'Swipe or use the arrow keys to change photograph',
    galleryPrevious: 'Previous photograph', galleryNext: 'Next photograph', galleryPhoto: 'Photograph', galleryOf: 'of',
    galleryHint: 'Swipe or use the arrows', celebrationPhotoAlt: 'The SHADOWS FC team on the pitch with a trophy and medals',
    navAnnouncements: 'Announcements', announcementsTitle: 'Club announcements.',
    announcementsIntro: 'Every official team update, in one place.',
    officialAnnouncement: 'OFFICIAL ANNOUNCEMENT', announcementCount: 'announcements', announcementSingular: 'announcement',
    readAnnouncement: 'Read announcement', noAnnouncements: 'Team announcements will appear here.', backHome: 'Back to home',
    startingSeven: 'STARTING SEVEN', matchdayPlayers: 'MATCHDAY SQUAD', substitutes: 'SUBSTITUTES',
    coachingStaff: 'COACHING STAFF', headCoach: 'Head coach', lineupTitle: 'TEAM LINEUP',
    lineupNotRecorded: 'The lineup has not been recorded for this match yet.',
    injuryUpdate: 'INJURY UPDATE', injuredInMatch: 'Injured in the match against', estimatedAbsence: 'Estimated absence',
    monthsUnit: 'months', estimatedReturn: 'Estimated return',
    'mid-November': 'mid-November',

    teamPhotoAlt: 'The SHADOWS FC team on the pitch', newestFirst: 'Newest matches first',
    opponentSearch: 'Search opponents', matchSearchPlaceholder: 'e.g. Savralliolid', monthLabel: 'Month', allMonths: 'All months',
    sortLabel: 'Sort by', newest: 'Newest first', oldest: 'Oldest first', mostGoals: 'Most SHADOWS goals',
    drawsLabel: 'Draws', cardsView: 'Cards', listView: 'List', resetFilters: 'Clear filters',
    recentForm: 'RECENT FORM', formHint: 'Select a result to explore the match',
    previousPage: 'Previous', nextPage: 'Next', selectedMatches: 'MATCHES SELECTED',
    selectionRecord: 'W–D–L IN SELECTION', selectionGoals: 'GOALS FOR / AGAINST', averageGoals: 'GOALS FOR / MATCH',
    selectionScope: 'Statistics for the match selection above.', fullScope: 'Statistics for all recorded matches.',
    changeSelection: 'Change match selection ↑', topScorer: 'TOP SCORER', noScoring: 'No goals have been recorded.',
    goalsUnit: 'goals', scoringMatches: 'GAMES WITH RECORDED GOALS', scoringHistory: 'GOALS BY MATCH',
    scorerHistory: 'SCORER HISTORY', noScoringHistory: 'No goals have been recorded for this player.',
    previousMatch: '← Previous match', nextMatch: 'Next match →', copyLink: 'Copy link',
    linkCopied: 'Link copied.', copyManually: 'Copy this link:', backToPlayer: '← Back to player',
    browseMatches: 'Browse matches', viewLabel: 'Match view', paginationLabel: 'Match pages',

    skip: 'Skip to content', navResults: 'Results', navScorers: 'Scorers', navSquad: 'Squad', navClub: 'The club',

    heroDescription: 'Built in Vouliagmeni. Driven by the badge. One team, one shared story.', viewResults: 'Explore the matches',
    heroFootnote: 'FROM VOULIAGMENI. FOR THE TEAM.', latestResult: 'LATEST RESULT', fullTime: 'FULL TIME', firstWin: 'THE FIRST WIN. WE GO AGAIN.',
    goals: 'GOALS', soFar: 'THE STORY SO FAR', seasonNumbers: 'The team in numbers.',
    resultsTitle: 'Our matches.', allGames: 'All matches', wins: 'Wins', losses: 'Losses',
    clickMatch: 'Select a match to see the scorers ↗', mvpTitle: 'Three goals.\nOne big night.',
    mvpDescription: 'A hat-trick in the 7–6 win against Savralliolid FC. Gkoumas was named MVP.',
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
    detail: 'Details', noResults: 'No matches have been recorded yet.', scopeNote: 'Statistics cover the recorded matches.', mvp: 'MVP',
    goalDifference: 'goal difference', record: 'W–D–L',
  },
};

let language = 'el';
try { if (localStorage.getItem('shadows-language') === 'en') language = 'en'; } catch { /* Storage may be disabled. */ }
const PAGE_SIZE = 8;
const archive = { page: 1 };
let galleryIndex = 0;
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

const scorerProfile = name => squad.find(player => (player.scorerName || player.name) === playerName(name));

function readArchiveUrl() {
  const params = new URL(location.href).searchParams;
  archive.page = Math.max(1, Math.min(10000, Number.parseInt(params.get('page'), 10) || 1));
}

function dialogFromUrl() {
  const params = new URL(location.href).searchParams;
  if (announcements.some(item => item.id === params.get('announcement'))) return { type: 'announcement', id: params.get('announcement') };
  if (matches.some(match => match.id === params.get('match'))) return { type: 'match', id: params.get('match') };
  if (squad.some(player => String(player.number) === params.get('player'))) return { type: 'player', id: Number(params.get('player')) };
  if (getScorers().some(scorer => scorer.name === params.get('scorer'))) return { type: 'scorer', name: params.get('scorer') };
  return null;
}

function writeUrl(push = false) {
  const url = new URL(location.href);
  for (const key of ['q', 'month', 'result', 'sort', 'view', 'page', 'match', 'player', 'scorer', 'announcement']) url.searchParams.delete(key);
  if (archive.page > 1) url.searchParams.set('page', archive.page);
  if (dialogContent) url.searchParams.set(dialogContent.type, dialogContent.id ?? dialogContent.name);
  if (dialogContent?.type === 'announcement') url.hash = 'announcements';
  if (url.href !== location.href) {
    try { history[push ? 'pushState' : 'replaceState'](null, '', url); } catch { /* Browsing still works when history is unavailable. */ }
  }
}

// One shared crest area keeps different badge proportions aligned across views.
function crestMarkup(logo, fallback = '', shape = '') {
  return `<span class="crest-frame${shape === 'shadows' ? ' crest-frame-shadows' : ''}">${logo
    ? `<img class="match-crest${shape === 'shield' ? ' crest-shield' : shape === 'legrena' ? ' crest-legrena' : shape === 'shadows' ? ' crest-shadows' : ''}" src="${esc(logo)}" alt="" loading="lazy">`
    : `<span class="crest-fallback" aria-hidden="true">${esc(fallback)}</span>`}</span>`;
}

function scoreMarkup(match) {
  return `<span class="score-for">${match.goalsFor}</span><span class="score-divider">–</span><span class="score-against">${match.goalsAgainst}</span>`;
}

function renderMatches() {
  const visible = selectMatches();
  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  archive.page = Math.min(archive.page, pages);
  const start = (archive.page - 1) * PAGE_SIZE;
  const pageMatches = visible.slice(start, start + PAGE_SIZE);
  $('#match-list').innerHTML = pageMatches.map(match => {
    const result = outcome(match);
    return `<button class="match-row" data-result="${result}" data-open-match="${esc(match.id)}" aria-label="${esc(t('detail'))}: SHADOWS FC ${match.goalsFor}–${match.goalsAgainst} ${esc(match.opponent)}, ${match.date}, ${t(result + 'Full')}">
      <span class="match-date"><strong>${match.date.replace('/', '.')}</strong><small>MASTER LEAGUE · MD ${String(match.round).padStart(2, '0')}</small></span>
      <span class="match-team">${crestMarkup(club.logo, '', club.crestShape)}<span>SHADOWS FC</span></span>
      <span class="match-score"><span class="score-value">${scoreMarkup(match)}</span><small>${t('fullTime')}</small></span>
      <span class="match-team away">${crestMarkup(match.logo, match.initials, match.crestShape)}<span>${esc(match.opponent)}</span></span>
      <span class="match-outcome"><span class="outcome-tag ${result}" aria-hidden="true">${t(result)}</span></span><span class="match-card-footer"><span>${match.time} · STAR SPORT CLUB</span><span>${t('detail')} <span class="row-arrow" aria-hidden="true">↗</span></span></span></button>`;
  }).join('') || `<div class="empty-results"><p>${t('noResults')}</p></div>`;
  $('#results-status').textContent = language === 'el' ? `${visible.length} αγώνες · από τον πιο πρόσφατο` : `${visible.length} matches · newest first`;
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
  $('#scoring-leaders').innerHTML = leaders.length ? `<span class="eyebrow">${t(leaders.length > 1 ? 'jointLeaders' : 'topScorer')}</span><div class="top-scorer-number">${leaders[0].goals}<span>${t(leaders.length > 1 ? 'goalsEach' : 'goals')}</span></div><h3>${leaders.map(player => esc(player.name).toLocaleUpperCase()).join('<br><span>&</span> ')}</h3><p>${t('scoringNote')}</p>` : `<p class="eyebrow">${t('topScorer')}</p><h3>—</h3><p>${t('noScoring')}</p>`;
  $('#scorer-rows').innerHTML = rankings.map(player => `<tr style="--goals:${player.goals};--scoring-share:${player.goals / (rankings[0]?.goals || 1)}"><td>${String(player.rank).padStart(2, '0')}</td><td><button class="scorer-name scorer-link" data-open-scorer="${esc(player.name)}"><span class="scorer-initials" aria-hidden="true">${initials(player.name)}</span>${esc(player.name)}<span class="scorer-chevron" aria-hidden="true">↗</span></button></td><td>${player.goals}</td></tr>`).join('') || `<tr><td colspan="3" class="empty-scorers">${t('noScoring')}</td></tr>`;
}

function renderSquad() {
  const groups = [
    { id: 'goalkeepers', title: 'squadGoalkeepers', positions: ['GK'] },
    { id: 'defenders', title: 'squadDefenders', positions: ['CB'] },
    { id: 'midfielders', title: 'squadMidfielders', positions: ['CM', 'CAM'] },
    { id: 'forwards', title: 'squadForwards', positions: ['RW', 'LW', 'ST'] },
  ];
  const playerCard = player => `<button class="player-card${player.photo ? ' has-photo' : ''}" data-player="${player.number}" aria-label="${esc(player.name)}, ${t(player.confirmed ? 'confirmedShirtNumber' : 'shirtNumber')} ${player.number}${player.position ? `, ${esc(positionLabel(player.position))}` : ''}"><span class="player-card-art">${player.photo ? `<img class="player-portrait" src="${esc(player.photo)}" alt="${esc(player.name)}" loading="lazy" width="450" height="560">` : ''}<span class="small-brand">SHADOWS / FC</span><span class="player-number" aria-hidden="true">${String(player.number).padStart(2, '0')}</span></span><span class="player-info"><span class="player-name-group"><strong>${esc(player.name)}</strong>${player.position ? `<small class="player-position">${esc(positionLabel(player.position))}</small>` : ''}</span><span aria-hidden="true">↗</span></span></button>`;
  $('#squad-grid').innerHTML = groups.map(group => {
    const players = squad.filter(player => group.positions.includes(player.position));
    return `<section class="squad-group" data-squad-group="${group.id}" aria-labelledby="squad-group-${group.id}"><div class="squad-group-heading"><h3 id="squad-group-${group.id}">${t(group.title)}</h3><span class="squad-group-count">${players.length} ${t('playerCount')}</span></div><div class="squad-group-grid squad-grid">${players.map(playerCard).join('')}</div></section>`;
  }).join('');
  $('#squad-count').textContent = `${squad.length} ${t('playerCount').toLocaleUpperCase()}`;
  renderArrows();
}

const galleryTrack = $('#team-gallery-track');
const gallerySlides = [...galleryTrack.querySelectorAll('.gallery-slide')];

function renderGallery() {
  $('.team-gallery').setAttribute('aria-label', t('galleryLabel'));
  $('.team-gallery').setAttribute('aria-roledescription', t('galleryRole'));
  galleryTrack.setAttribute('aria-label', t('galleryInstructions'));
  $('#gallery-prev').setAttribute('aria-label', t('galleryPrevious'));
  $('#gallery-next').setAttribute('aria-label', t('galleryNext'));
  $('#gallery-prev').disabled = galleryIndex === 0;
  $('#gallery-next').disabled = galleryIndex === gallerySlides.length - 1;
  gallerySlides.forEach((slide, index) => {
    const label = `${t('galleryPhoto')} ${index + 1} ${t('galleryOf')} ${gallerySlides.length}`;
    slide.setAttribute('aria-label', label);
    slide.setAttribute('aria-roledescription', t('gallerySlide'));
    slide.setAttribute('aria-hidden', String(index !== galleryIndex));
    const dot = $(`[data-gallery-index="${index}"]`);
    dot.setAttribute('aria-label', label);
    dot.querySelector('.sr-only').textContent = label;
    if (index === galleryIndex) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
  $('#gallery-counter').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(gallerySlides.length).padStart(2, '0')}`;
  $('#gallery-status').textContent = `${t('galleryPhoto')} ${galleryIndex + 1} ${t('galleryOf')} ${gallerySlides.length}`;
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
galleryTrack.addEventListener('keydown', event => {
  const target = { ArrowLeft: galleryIndex - 1, ArrowRight: galleryIndex + 1, Home: 0, End: gallerySlides.length - 1 }[event.key];
  if (target == null) return;
  event.preventDefault();
  showGalleryPhoto(target);
});
let galleryDrag = null;
galleryTrack.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  galleryDrag = { x: event.clientX, left: galleryTrack.scrollLeft };
  galleryTrack.classList.add('is-dragging');
  galleryTrack.setPointerCapture(event.pointerId);
});
galleryTrack.addEventListener('pointermove', event => {
  if (galleryDrag) galleryTrack.scrollLeft = galleryDrag.left + galleryDrag.x - event.clientX;
});
function finishGalleryDrag() {
  if (!galleryDrag) return;
  galleryDrag = null;
  galleryTrack.classList.remove('is-dragging');
  if (!galleryTrack.clientWidth) return;
  showGalleryPhoto(Math.round(galleryTrack.scrollLeft / galleryTrack.clientWidth));
}
galleryTrack.addEventListener('pointerup', finishGalleryDrag);
galleryTrack.addEventListener('pointercancel', finishGalleryDrag);
galleryTrack.addEventListener('lostpointercapture', finishGalleryDrag);
if ('ResizeObserver' in window) new ResizeObserver(() => showGalleryPhoto(galleryIndex, true)).observe(galleryTrack);
else window.addEventListener('resize', () => showGalleryPhoto(galleryIndex, true));

const announcementText = (item, field) => item[field]?.[language] ?? item[field]?.el ?? item[field]?.en;

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
  document.querySelectorAll('[data-home-section]').forEach(section => { section.hidden = isNews; });
  $('#announcements').hidden = !isNews;
  const newsLink = $('#navigation a[href="#announcements"]');
  if (isNews) newsLink.setAttribute('aria-current', 'page');
  else newsLink.removeAttribute('aria-current');
}

const dialog = $('#detail-dialog');

function scoringHistoryMarkup(name) {
  const history = getScoringHistory(name);
  const total = history.reduce((sum, entry) => sum + entry.goals, 0);
  return `${history.length ? `<div class="profile-stats history-totals"><div><strong>${total}</strong><small>${t('confirmedGoals')}</small></div><div><strong>${history.length}</strong><small>${t('scoringMatches')}</small></div></div>` : ''}
    <h3 class="dialog-subhead">${t('scoringHistory')}</h3><p class="dialog-note">${t('scopeNote')}</p>
    <div class="scoring-history">${history.map(({ match, goals }) => `<button data-open-match="${esc(match.id)}"><span><small>${match.date} · MD ${String(match.round).padStart(2, '0')}</small><strong>${esc(match.opponent)}</strong></span><span class="history-score" data-result="${outcome(match)}">${scoreMarkup(match)}</span><span class="history-goals"><b>${goals}</b> ${t('goalsUnit')} <span aria-hidden="true">↗</span></span></button>`).join('') || `<p class="dialog-note">${t('noScoringHistory')}</p>`}</div>`;
}

function lineupMarkup(match) {
  if (!match.lineup) return `<section class="match-lineup-section"><h3 class="dialog-subhead">${t('lineupTitle')}</h3><p class="dialog-note">${t('lineupNotRecorded')}</p></section>`;
  const lineup = match.lineup;
  const players = entries => `<ul class="match-lineup-list">${entries.map(player => `<li><span class="lineup-marker">${player.position ? esc(player.position) : player.number != null ? '#' + player.number : '—'}</span><span class="lineup-name">${esc(player.name)}</span></li>`).join('')}</ul>`;
  return `<section class="match-lineup-section"><h3 class="dialog-subhead">${t(lineup.type === 'starting' ? 'startingSeven' : 'matchdayPlayers')}</h3>${players(lineup.players)}
    ${lineup.substitutes?.length ? `<h4 class="lineup-subheading">${t('substitutes')}</h4>${players(lineup.substitutes)}` : ''}
    ${lineup.staff?.length ? `<h4 class="lineup-subheading">${t('coachingStaff')}</h4><ul class="match-staff-list">${lineup.staff.map(person => `<li><span>${esc(person.name)}</span>${person.role ? `<small>${t(person.role)}</small>` : ''}</li>`).join('')}</ul>` : ''}</section>`;
}

function injuryMarkup(match, playerNumber = null) {
  const injuries = (match.injuries || []).filter(injury => playerNumber == null || injury.playerNumber === playerNumber);
  return injuries.map(injury => `<aside class="injury-update"><h3>${t('injuryUpdate')}</h3><strong>${esc(injury.name)}</strong><p>${t('injuredInMatch')} ${esc(match.opponent)} · ${match.date}.</p><p>${t('estimatedAbsence')}: ${injury.absenceMonths.toLocaleString(language === 'el' ? 'el-GR' : 'en-GB')} ${t('monthsUnit')}</p><p class="injury-return">${t('estimatedReturn')}: <b>${t(injury.expectedReturn)}</b>.</p></aside>`).join('');
}

function renderDialog() {
  if (!dialogContent) return;
  if (dialogContent.type === 'announcement') {
    const item = announcements.find(entry => entry.id === dialogContent.id);
    if (!item) return;
    $('#dialog-category').textContent = t('officialAnnouncement');
    $('#dialog-body').innerHTML = `<article class="announcement-detail"><h2 id="dialog-title">${esc(announcementText(item, 'title'))}</h2><p class="announcement-byline">SHADOWS FC${item.date ? ` · ${esc(item.date)}` : ''}</p>${announcementPhotoMarkup(item)}<div class="announcement-body">${(announcementText(item, 'body') || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}</div></article>`;
  } else if (dialogContent.type === 'match') {
    const match = matches.find(item => item.id === dialogContent.id);
    if (!match) return;
    const ordered = selectMatches(matches, { sort: 'oldest' });
    const index = ordered.findIndex(item => item.id === match.id);
    $('#dialog-category').textContent = `${t('matchday')} ${String(match.round).padStart(2, '0')} / ${t('fullTime')}`;
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">SHADOWS FC<br>× ${esc(match.opponent)}</h2><p class="dialog-meta">${t('leagueDetail')}<br>${match.date} · ${match.time}<br>${esc(club.venue)}</p><div class="dialog-scoreboard">${crestMarkup(club.logo, '', club.crestShape)}<div class="dialog-score" data-result="${outcome(match)}">${scoreMarkup(match)}</div>${crestMarkup(match.logo, match.initials, match.crestShape)}</div>
      ${lineupMarkup(match)}${injuryMarkup(match)}<h3 class="dialog-subhead">${t('scorerList')}</h3><ul class="dialog-scorers">${match.scorers.map(player => `<li><button class="dialog-scorer-link" data-open-scorer="${esc(playerName(player.name))}">${esc(playerName(player.name))} <span aria-hidden="true">↗</span></button><b>${player.goals}</b></li>`).join('')}</ul>${match.mvp ? `<p class="dialog-meta">${t('mvp')} <strong>${esc(match.mvp)}</strong></p>` : ''}
      <nav class="match-navigation" aria-label="${t('browseMatches')}"><button data-step-match="${esc(ordered[index - 1]?.id || '')}" ${index === 0 ? 'disabled' : ''}>${t('previousMatch')}</button><span>${index + 1} / ${ordered.length}</span><button data-step-match="${esc(ordered[index + 1]?.id || '')}" ${index === ordered.length - 1 ? 'disabled' : ''}>${t('nextMatch')}</button></nav>`;
  } else if (dialogContent.type === 'player') {
    const player = squad.find(item => item.number === dialogContent.id);
    if (!player) return;
    $('#dialog-category').textContent = t('playerProfile');
    $('#dialog-body').innerHTML = `<h2 id="dialog-title">${esc(player.name)}</h2>${player.photo ? `<img class="profile-portrait" src="${esc(player.photo)}" alt="${esc(player.name)}" width="450" height="560">` : ''}<div class="profile-number">#${player.number}</div><p class="dialog-meta">${t('confirmedShirtNumber')}</p>${player.position ? `<p class="profile-position"><span>${t('position')}</span><strong>${esc(positionLabel(player.position))}</strong></p>` : ''}${matches.map(match => injuryMarkup(match, player.number)).join('')}${scoringHistoryMarkup(player.scorerName || player.name)}`;
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
  $('#language-toggle').innerHTML = `${language === 'el' ? 'EN' : 'ΕΛ'} <span aria-hidden="true">↗</span>`;
  $('#language-toggle').setAttribute('aria-label', language === 'el' ? 'Switch to English' : 'Αλλαγή στα Ελληνικά');
  $('#close-dialog').setAttribute('aria-label', t('close'));
  $('#navigation').setAttribute('aria-label', language === 'el' ? 'Κύρια πλοήγηση' : 'Main navigation');
  $('#menu-toggle').setAttribute('aria-label', t($('#menu-toggle').getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'openMenu'));
  document.querySelectorAll('[data-i18n-alt]').forEach(image => { image.alt = t(image.dataset.i18nAlt); });
  renderGallery(); renderMatches(); renderScorers(); renderSquad(); renderAnnouncements(); renderPageView(); renderDialog();
}

$('#language-toggle').addEventListener('click', () => {
  language = language === 'el' ? 'en' : 'el';
  try { localStorage.setItem('shadows-language', language); } catch { /* Keep the toggle usable without storage. */ }
  render();
});
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
  if (button.hasAttribute('data-open-announcement')) openDialog({ type: 'announcement', id: button.dataset.openAnnouncement }, button);
  else if (button.hasAttribute('data-open-match')) openDialog({ type: 'match', id: button.dataset.openMatch }, button);
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
    if (target.id === 'announcements') $('#announcements-title').focus({ preventScroll: true });
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
  document.body.style.overflow = '';
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

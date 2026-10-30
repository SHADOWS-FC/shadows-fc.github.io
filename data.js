// Transcribed from club posts supplied in this conversation. No year was
// established for the full set of posts; retain day/month without inventing it.
// Match scorer names remain as printed. Only merge aliases confirmed by the club.
export const playerAliases = { Mike: 'Mixalis' };
export const playerName = name => playerAliases[name] || name;
export const club = {
  name: 'SHADOWS FC',
  instagram: 'https://www.instagram.com/shadows_fc0/',
  location: 'Vouliagmeni',
  venue: 'Star Sport Club · Voula',
  league: 'Master League',
  leagueLocation: 'Voula',
  logo: 'assets/logos/shadows-fc-2026.jpeg',
  matchLogo: 'assets/logos/shadows-fc-match-cutout.png',
  crestShape: 'cutout',
};

// Scheduled fixtures are separate from completed results and scoring totals.
export const upcomingMatches = [
  {
    id: 'flap-fc-20261104', date: '04/11', calendarDate: '2026-11-04',
    weekday: 'wednesday', time: '21:00',
    opponent: 'ΦΛΑΠ FC', initials: 'FLAP', color: '#d4ad40',
    logo: 'assets/logos/flap-fc-2026.jpeg', crestShape: 'black',
    source: 'Club-confirmed upcoming game on Wednesday 04/11/2026 at 21:00. Result and lineup have not been supplied.',
  },
];

// Last club-supplied league table, updated only for the confirmed Blue Fish
// game at the club's request. Other teams' statistics and tied-team order stay
// as supplied. SHADOWS' 27 league goals carry forward the original one-goal
// difference from the recorded match reports (28); do not silently reconcile it.
export const leagueStandings = [
  { position: 1, id: 'champminions', name: 'CHAMPMINIONS', played: 4, won: 4, lost: 0, drawn: 0, goalsFor: 25, goalsAgainst: 9, points: 12, logo: 'assets/logos/champminions-2026.jpeg', crestShape: 'black' },
  { position: 2, id: 'legrena', name: 'LEGRENA FC', played: 4, won: 4, lost: 0, drawn: 0, goalsFor: 17, goalsAgainst: 11, points: 12, logo: 'assets/logos/legrena.jpg', crestShape: 'legrena' },
  { position: 3, id: 'unathletico', name: 'UNATLETICO', played: 4, won: 3, lost: 0, drawn: 1, goalsFor: 22, goalsAgainst: 12, points: 10, logo: 'assets/logos/unathletico-2026.jpeg', crestShape: 'black' },
  { position: 4, id: 'blyzz', name: 'BLYZZ', played: 4, won: 3, lost: 1, drawn: 0, goalsFor: 24, goalsAgainst: 17, points: 9, logo: 'assets/logos/blyzz-2026.jpeg', crestShape: 'black' },
  { position: 5, id: 'fiorepeina', name: 'ΦΙΟΡΕΠΕΙΝΑ', played: 4, won: 2, lost: 1, drawn: 1, goalsFor: 16, goalsAgainst: 14, points: 7, logo: 'assets/logos/fiorepeina-2026.jpeg', crestShape: 'black' },
  { position: 6, id: 'shadows', name: 'SHADOWS', played: 5, won: 2, lost: 3, drawn: 0, goalsFor: 27, goalsAgainst: 29, points: 6, logo: 'assets/logos/shadows-fc-2026.jpeg', crestShape: 'shadows' },
  { position: 7, id: 'savralliolid', name: 'SAVRALLIOLID', played: 3, won: 1, lost: 2, drawn: 0, goalsFor: 15, goalsAgainst: 16, points: 3, logo: 'assets/logos/savralliolid-2026.jpeg', crestShape: 'black' },
  { position: 8, id: 'blue-fish', name: 'BLUE FISH', played: 5, won: 1, lost: 4, drawn: 0, goalsFor: 20, goalsAgainst: 28, points: 3, logo: 'assets/logos/blue-fish-2026.jpeg', crestShape: 'black' },
  { position: 9, id: 'aston-voula-b', name: 'ASTON VOULA B', played: 3, won: 1, lost: 2, drawn: 0, goalsFor: 10, goalsAgainst: 17, points: 3, logo: 'assets/logos/aston-voula-2026.jpeg', crestShape: 'black' },
  { position: 10, id: 'bunker-parthenr', name: 'BUNKER PARTHENR', played: 4, won: 1, lost: 3, drawn: 0, goalsFor: 17, goalsAgainst: 23, points: 3 },
  { position: 11, id: 'gates-of-olympus', name: 'GATES OF OLYMPUS', played: 4, won: 0, lost: 2, drawn: 2, goalsFor: 13, goalsAgainst: 19, points: 2, logo: 'assets/logos/gate-of-olympus-2026.jpeg', crestShape: 'black' },
  { position: 12, id: 'flap-fc', name: 'ΦΛΑΠ FC', played: 4, won: 0, lost: 4, drawn: 0, goalsFor: 6, goalsAgainst: 17, points: 0, logo: 'assets/logos/flap-fc-2026.jpeg', crestShape: 'black' },
];

// Club statements and requested articles. Higher order values appear first.
// Source metadata preserves the provenance of club-requested creative articles.
// Each entry has id, order, title/summary { el, en }, body { el: [], en: [] },
// optional photo/photoAlt, and an optional confirmed date.
export const announcements = [
  {
    "id": "blue-fish-two-wins",
    "order": 2,
    "category": "matchReport",
    photo: 'assets/announcements/coaching-staff.png',
    photoWidth: 1122,
    photoHeight: 1402,
    photoAlt: { el: 'Ο Χατζηνικολάου και ο Καρβούνης σε δηλώσεις με φόντο τα σήματα των SHADOWS FC.' },
    "title": {
      "el": "2 στα 2 η ομάδα μας με το καινούργιο τεχνικό επιτελείο. Ήταν μήπως η αλλαγή προπονητή αυτό που έλειπε από την ομάδα;"
    },
    "summary": {
      "el": "Οι SHADOWS FC επικράτησαν 7–4 της Μπλου Φις, με χατ τρικ του Μανούσου και από δύο γκολ των Ζάχου και Τάσου. Δεύτερη συνεχόμενη νίκη και μια εμφάνιση με χαρακτήρα."
    },
    "body": {
      "el": [
        "Δύο παιχνίδια, δύο νίκες και μια ομάδα που αρχίζει να πιστεύει ξανά στον εαυτό της. Μετά το 7–6 απέναντι στη Σαβραλιολίδ, οι SHADOWS FC έδωσαν συνέχεια με το 7–4 επί της Μπλου Φις στις 27/10. Με τον Χατζηνικολάου και τον Καρβούνη στο προπονητικό επιτελείο, η αντίδραση στις δύσκολες στιγμές και η αποφασιστικότητα μπροστά στην εστία έκαναν τη διαφορά.",
        "Το ξεκίνημα είχε ένταση και γρήγορο ρυθμό. Στο 3′ ο Μανούσος άνοιξε το σκορ για το 1–0, όμως η Μπλου Φις απάντησε στο 6′ και πήρε προβάδισμα στο 10′: 1–2. Οι SHADOWS δεν έχασαν την ψυχραιμία τους. Ο Ζάχος έφερε το ματς στα ίσα στο 14′, πριν οι αντίπαλοι ξαναβρούν δίχτυα στο 18′ για το 2–3.",
        "Στο δεύτερο ημίχρονο, στο 23′, ο Τάσος πήρε τη σκυτάλη και έγραψε το 3–3. Η νέα απάντηση της Μπλου Φις στο 26′, για το 3–4, έβαλε ακόμη μία δοκιμασία στην ομάδα μας. Αυτή τη φορά, όμως, η αντίδραση ήταν ολοκληρωτική. Οι αποστάσεις μίκρυναν, οι επιστροφές έγιναν πιο γρήγορες και η πίεση άρχισε να φέρνει μπάλες κοντά στην αντίπαλη περιοχή.",
        "Ο Μανούσος ισοφάρισε στο 30′ σε 4–4 και έδωσε το σύνθημα για την τελική αντεπίθεση. Στο 34′ ο Ζάχος πέτυχε το δεύτερο προσωπικό του γκολ και έβαλε ξανά μπροστά τους SHADOWS με 5–4. Ο Τάσος στο 38′ έδωσε ανάσα δύο τερμάτων, για να κλείσει ο Μανούσος τη βραδιά στο 40+1′, στις καθυστερήσεις: χατ τρικ και τελικό 7–4.",
        "Η εικόνα του τελευταίου κομματιού του αγώνα ήταν το μεγάλο κέρδος. Αντί να αρκεστεί στο προβάδισμα, η ομάδα συνέχισε να κυκλοφορεί την μπάλα και να ψάχνει τη σωστή επιλογή. Οι οδηγίες του Χατζηνικολάου και του Καρβούνη βρήκαν ανταπόκριση, με καθαρό μυαλό και αλληλοκάλυψη τη στιγμή που το παιχνίδι απαιτούσε συγκέντρωση.",
        "Η νίκη είχε πρωταγωνιστές στο σκοράρισμα, αλλά ήταν δουλειά όλων. Μαζί με τον Μανούσο, τον Ζάχο και τον Τάσο, αγωνίστηκαν ο Ντίνος, ο Δημήτρης Μπαμπάκος, ο Ρόθος και ο Βλάχος. Τρέξιμο, μονομαχίες και βοήθειες χωρίς την μπάλα έδωσαν τη βάση για να έρθουν τα γκολ. Ο Μανούσος τελείωσε με τρία, ο Ζάχος με δύο και ο Τάσος με δύο.",
        "Το 2 στα 2 δεν σημαίνει ότι λύθηκαν όλα. Σημαίνει, όμως, ότι υπάρχει αντίδραση, μεγαλύτερη συνοχή και λόγος να κοιτάμε το επόμενο παιχνίδι με αισιοδοξία. Ήταν τελικά η αλλαγή προπονητή αυτό που έλειπε; Οι δύο συνεχόμενες νίκες ανοίγουν την κουβέντα. Η συνέχεια θα δώσει την απάντηση.",
        "Ο Χατζηνικολάου για τον νέο του βοηθό, Καρβούνη: «Ο Καρβούνης έχει ήδη φέρει ενέργεια, φρέσκες ιδέες και καλύτερη επικοινωνία με τους παίκτες. Η συμβολή του στο καλό ξεκίνημά μας είναι σημαντική. Βλέπω έναν συνεργάτη με διάθεση να εξελιχθεί και πιστεύω ότι μπορεί να παίξει ουσιαστικό ρόλο στο μέλλον του τεχνικού μας επιτελείου. Συνεχίζουμε μαζί, με δουλειά και προσήλωση στην ομάδα».",
      ]
    },
    "source": "Club-requested creative match report and authored coach comment. Final score, scorers, participants and coaches are confirmed. The club confirmed a match duration of two 20-minute halves plus stoppage time; all goal minutes, score progression, descriptions of play and the coach comment are fictional narrative. Paired with the exact coaching-staff photograph supplied by the club via GitHub. Fictional events do not enter match statistics."
  },
  {
    id: 'sotiris', order: 1,
    title: { el: 'Επίσημη ανακοίνωση για τον Σωτήρη', en: 'Official statement regarding Sotiris' },
    summary: { el: 'Ανακοίνωση του Διοικητικού Συμβουλίου σχετικά με την αποχώρηση του Σωτήρη από την αποψινή αναμέτρηση.' },
    photo: 'assets/announcements/sotiris-statement.jpg',
    photoAlt: {
      el: 'Το ροζ κεντημένο έμβλημα των SHADOWS FC πάνω σε μαύρο ύφασμα',
      en: 'The embroidered pink SHADOWS FC crest on black fabric',
    },
    body: { el: [
      '🚨 ΕΠΙΣΗΜΗ ΑΝΑΚΟΙΝΩΣΗ — SHADOWS FC 🩷🖤',
      'Με αφορμή την εκ νέου αιφνιδιαστική αποχώρηση του Σωτήρη από την αποψινή αναμέτρηση, επικαλούμενος για ακόμη μία φορά αόριστους «προσωπικούς λόγους», η διοίκηση της SHADOWS FC εκφράζει την έντονη δυσαρέσκεια και την απόλυτη αγανάκτησή της για τη συνεχιζόμενη απαξίωση προς τον Σύλλογο.',
      'Το Διοικητικό Συμβούλιο αποφάσισε ομόφωνα την παραπομπή της υπόθεσης στο νομικό τμήμα της ομάδας, το οποίο εξετάζει όλα τα διαθέσιμα ένδικα μέσα, συμπεριλαμβανομένης της αποστολής εξωδίκων, της υποβολής μηνύσεων και της διεκδίκησης αποζημίωσης για ηθική βλάβη.',
      'Η SHADOWS FC δηλώνει την απόλυτη εμπιστοσύνη της στην Ελληνική Δικαιοσύνη και αναμένει την πλήρη διερεύνηση της υπόθεσης.',
      'Ο Σύλλογος απαιτεί δημόσια συγγνώμη εντός 24 ωρών και επιφυλάσσεται παντός νομίμου δικαιώματός του για την προάσπιση του κύρους και της ιστορίας του.',
      'ΚΑΝΕΙΣ ΠΑΝΩ ΑΠΟ ΤΗ SHADOWS FC.',
      'Θα ακολουθήσουν νεότερες ανακοινώσεις.',
      'ΕΚ ΤΟΥ ΔΙΟΙΚΗΤΙΚΟΥ ΣΥΜΒΟΥΛΙΟΥ ΤΗΣ SHADOWS FC 💀',
    ] },
    source: 'Official statement transcribed from the club-supplied Instagram caption screenshot; paired with the separately supplied embroidered-crest photograph. No publication date was supplied.',
  },
];

export const matches = [
  {
    id: 'legrena', round: 1, date: '29/09', time: '21:00',
    opponent: 'Legrena FC', initials: 'LFC', color: '#ad83e8',
    logo: 'assets/logos/legrena.jpg', crestShape: 'legrena',
    goalsFor: 4, goalsAgainst: 5,
    scorers: [{ name: 'Gkoumas', goals: 1 }, { name: 'Dinos', goals: 1 },
      { name: 'Zachos', goals: 1 }, { name: 'Galanis', goals: 1 }],
    mvp: 'Troka',
    source: 'First-game lineup and full-time posts. Match date from lineup, not post timestamp.',
    lineup: {
      type: 'starting',
      players: [
        { name: 'Gkoumas', position: 'GK' },
        { name: 'Babakos Dimitris', position: 'CB' },
        { name: 'Troka', position: 'CB' },
        { name: 'Zachos', position: 'CM' },
        { name: 'Mixalis', position: 'RW' },
        { name: 'Dinos', position: 'LW' },
        { name: 'Babakos Tasos', position: 'ST' },
      ],
    },
    injuries: [{ playerNumber: 5, name: 'Zachos Giannis', absenceMonths: 1.5, expectedReturn: 'mid-November', resolved: true }],
  },
  {
    id: 'aston-voula', round: 2, date: '06/10', time: '20:00',
    opponent: 'Aston Voula', initials: 'AV', color: '#8bc2e3',
    logo: 'assets/logos/aston-voula-match-cutout.png', crestShape: 'cutout',
    goalsFor: 5, goalsAgainst: 6,
    scorers: [{ name: 'Rothos', goals: 3 }, { name: 'Tasos', goals: 1 }, { name: 'Xatzi', goals: 1 }],
    mvp: 'Rothos',
    source: 'Second-game lineup and full-time posts. Scorer names retained as printed.',
    lineup: {
      type: 'starting',
      players: [
        { name: 'Xatzi', position: 'GK' },
        { name: 'Mitsos', position: 'CB' },
        { name: 'Manousos', position: 'CB' },
        { name: 'Marfa', position: 'CM' },
        { name: 'Dinos', position: 'RW' },
        { name: 'Rothos', position: 'LW' },
        { name: 'Tasos', position: 'ST' },
      ],
      source: 'Corrected starting-seven graphic: handwritten Rothos replaces the crossed-out Giorgos at LW.',
    },
  },
  {
    id: 'unathletico', round: 3, date: '12/10', time: '21:00',
    opponent: 'Unathletico FC', initials: 'UFC', color: '#d6ddd7',
    logo: 'assets/logos/unathletico-match-cutout.png', crestShape: 'cutout',
    goalsFor: 5, goalsAgainst: 8,
    scorers: [{ name: 'Mike', goals: 2 }, { name: 'Dinos', goals: 1 },
      { name: 'Gkoumas', goals: 1 }, { name: 'Stavros', goals: 1 }],
    mvp: 'Mike',
    source: 'Matchday post dated 12 October; full-time post dated 13 October. Duplicate screenshot counted once.',
    lineup: {
      type: 'starting',
      players: [
        { name: 'Gkoumas', position: 'GK' },
        { name: 'Babakos D.', position: 'CB' },
        { name: 'Xatzi', position: 'CB' },
        { name: 'Stavros', position: 'CM' },
        { name: 'Marfa', position: 'RW' },
        { name: 'Dinos', position: 'LW' },
        { name: 'Rothos', position: 'ST' },
      ],
      substitutes: [{ name: 'Babakos T.' }],
      staff: [{ name: 'Zachos', role: 'headCoach' }],
      source: 'Chess-board lineup supplied for the Unathletico match; substitutes are listed without assuming they came on.',
    },
  },
  {
    id: 'savralliolid', round: 4, date: '21/10', time: '22:00',
    opponent: 'Savralliolid FC', initials: 'SFC', color: '#efcc56',
    logo: 'assets/logos/savralliolid-match-cutout.png', crestShape: 'cutout',
    goalsFor: 7, goalsAgainst: 6,
    scorers: [{ name: 'Gkoumas', goals: 3 }, { name: 'Dinos', goals: 2 }, { name: 'Rothos', goals: 2 }],
    mvp: 'Gkoumas',
    source: 'Matchday caption specifies Wednesday 21/10 at 22:00; result graphic provides scorers. MVP confirmed by club in chat.',
    lineup: {
      type: 'squad',
      players: [
        { name: 'Chatziamanetoglou G.', number: 82 },
        { name: 'Gkoumas', number: 6 },
        { name: 'Babakos D.', number: 11 },
        { name: 'Ioannis', number: 77 },
        { name: 'Chatziamanetoglou K.', number: 7 },
        { name: 'Marfa', number: 8 },
        { name: 'Babakos T.', number: 10 },
        { name: 'Rothos', number: 22 },
      ],
      staff: [{ name: 'Zachos' }, { name: 'Chatzinikolaou' }, { name: 'Καρβούνης' }],
      source: 'Eight-player matchday squad transcribed from the supplied graphic; club subsequently corrected the coaching staff, replacing Giotis with Καρβούνης.',
    },
  },
  {
    id: 'blue-fish-20261027', round: 5, date: '27/10', time: '22:00',
    calendarDate: '2026-10-27', weekday: 'tuesday',
    opponent: 'Blue Fish', initials: 'BF', color: '#1d60ae',
    logo: 'assets/logos/blue-fish-2026.jpeg', crestShape: 'black',
    goalsFor: 7, goalsAgainst: 4,
    scorers: [{ name: 'Manousos', goals: 3 }, { name: 'Zachos', goals: 2 }, { name: 'Tasos', goals: 2 }],
    lineup: {
      type: 'played',
      players: [
        { name: 'Dinos' }, { name: 'Babakos T.' }, { name: 'Babakos D.' },
        { name: 'Zachos' }, { name: 'Manousos' }, { name: 'Rothos' }, { name: 'Vlachos' },
      ],
      staff: [{ name: 'Chatzinikolaou' }, { name: 'Karvounis' }],
    },
    source: 'Result, scorers and seven participants confirmed by the club in chat. Date and time retained from the previously confirmed fixture. Coaching staff subsequently confirmed as Chatzinikolaou and Karvounis. No positions, shirt numbers, MVP or coaching roles were supplied.',
  },
];

// Historical matchday selection: preserve it when confirmed club profiles arrive.
export const latestMatchdaySquad = [
  { name: 'Chatziamanetoglou G.', number: 82 },
  { name: 'Gkoumas', number: 6 },
  { name: 'Babakos D.', number: 11 },
  { name: 'Ioannis', number: 77 },
  { name: 'Chatziamanetoglou K.', number: 7 },
  { name: 'Marfa', number: 8 },
  { name: 'Babakos T.', number: 10 },
  { name: 'Rothos', number: 22 },
];

// Confirmed by the club. Portraits require original named photo files;
// never substitute a generated likeness for a player.
// Temporary club-approved biography entry for players awaiting their histories.
// A fresh entry is returned per player so later edits stay independent.
const currentShadowsCareer = () => [{
  from: 2026, to: 2026, label: 'Shadows FC', kind: 'club',
  logo: club.logo, logoCanvas: 'dark', goals: null,
}];

export const confirmedPlayers = [
  { name: 'Sotiris Giotis', number: 1, position: 'GK', confirmed: true, photo: 'assets/players/1.jpeg', career: currentShadowsCareer() },
  { name: 'Chatziamanetoglou Giorgos', number: 82, position: 'GK', confirmed: true, photo: 'assets/players/82.jpeg', career: currentShadowsCareer() },
  { name: 'Troka Giorgos', number: 9, position: 'CB', confirmed: true, photo: 'assets/players/9.jpeg', career: currentShadowsCareer() },
  { name: 'Babakos Dimitris', number: 11, position: 'CB', confirmed: true, photo: 'assets/players/11.jpeg', career: currentShadowsCareer() },
  {
    name: 'Zachos Giannis', number: 5, position: 'CB', confirmed: true,
    photo: 'assets/players/5.jpeg', scorerName: 'Zachos',
    // Career labels and year ranges reproduced exactly as supplied by the club.
    career: [
      { from: 2006, to: 2016, label: 'A.O.Vouliagmenis', kind: 'club', logo: 'assets/logos/AOV.jpeg', logoCanvas: 'navy', goals: null },
      { from: 2016, to: 2017, label: 'Astera Varis', kind: 'loan', logo: 'assets/logos/ASTERAS.png', goals: null },
      { from: 2018, to: 2018, label: 'Frontistirio Prisma', kind: 'inactive' },
      { from: 2019, to: 2020, label: 'Covid 19', kind: 'inactive' },
      { from: 2021, to: 2022, label: 'Klassiko Chiou', kind: 'club', logo: 'assets/logos/KLASIKO.jpeg', goals: null },
      { from: 2023, to: 2023, label: 'DNP', kind: 'inactive' },
      { from: 2024, to: 2026, label: 'Shadows FC', kind: 'club', logo: 'assets/logos/shadows-fc-2026.jpeg', logoCanvas: 'dark', goals: null },
    ],
  },
  { name: 'Chatzinikolaou Christos', number: 28, position: 'CM', confirmed: true, photo: 'assets/players/28.jpeg', career: currentShadowsCareer() },
  { name: 'Manousos Tsaroumis', number: 19, position: 'CM', confirmed: true, photo: 'assets/players/manousos.jpeg', scorerName: 'Manousos' },
  { name: 'Chatziamanetoglou Dinos', number: 7, position: 'RW', confirmed: true, photo: 'assets/players/7.jpeg', scorerName: 'Dinos', career: currentShadowsCareer() },
  { name: 'Marfa Mixalis', number: 8, position: 'LW', confirmed: true, photo: 'assets/players/8.jpeg', scorerName: 'Mixalis', career: currentShadowsCareer() },
  { name: 'Stavros Kalogiropoulos', number: 14, position: 'CAM', confirmed: true, photo: 'assets/players/14.jpeg', scorerName: 'Stavros', career: currentShadowsCareer() },
  { name: 'Kobas Gavrilos', number: 69, position: 'ST', confirmed: true, photo: 'assets/players/69.jpeg', career: currentShadowsCareer() },
  { name: 'Rothos Ioannis', number: 22, position: 'ST', confirmed: true, photo: 'assets/players/22.jpeg', scorerName: 'Rothos', career: currentShadowsCareer() },
  { name: 'Gkoumas Konstantinos', number: 6, position: 'ST', confirmed: true, photo: 'assets/players/6.jpeg', scorerName: 'Gkoumas', career: currentShadowsCareer() },
  { name: 'Tasos Babakos', number: 10, position: 'ST', confirmed: true, photo: 'assets/players/10.jpeg', scorerName: 'Tasos', career: currentShadowsCareer() },
];

// The club confirmed this is the complete current roster. Historical lineup
// entries remain above as match evidence, not additional current players.
export const squad = confirmedPlayers;

export const matchOutcome = match => match.goalsFor > match.goalsAgainst ? 'win'
  : match.goalsFor < match.goalsAgainst ? 'loss' : 'draw';

// Round is the chronological key: day/month alone cannot order a season
// that crosses New Year. Never mutate the source records when browsing.
export function selectMatches(list = matches, { query = '', month = '', result = 'all', sort = 'newest' } = {}) {
  const normalize = value => String(value).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();
  const search = normalize(query);
  return list.filter(match => (!search || normalize(match.opponent).includes(search))
    && (!month || match.date.split('/')[1] === month)
    && (result === 'all' || matchOutcome(match) === result))
    .sort((a, b) => sort === 'oldest' ? a.round - b.round
      : sort === 'goals' ? b.goalsFor - a.goalsFor || b.round - a.round : b.round - a.round);
}

export function getMatchMonths(list = matches) {
  return [...new Set([...list].sort((a, b) => a.round - b.round).map(match => match.date.split('/')[1]))];
}

// These are games with recorded goals, not player appearances. Lineup and
// assist data are incomplete, so neither appearances nor assists are inferred.
export function getScoringHistory(name, list = matches) {
  return selectMatches(list).flatMap(match => {
    const goals = match.scorers.filter(scorer => playerName(scorer.name) === playerName(name))
      .reduce((total, scorer) => total + scorer.goals, 0);
    return goals ? [{ match, goals }] : [];
  });
}

export function getSummary(list = matches) {
  return list.reduce((total, match) => ({
    played: total.played + 1,
    won: total.won + Number(match.goalsFor > match.goalsAgainst),
    drawn: total.drawn + Number(match.goalsFor === match.goalsAgainst),
    lost: total.lost + Number(match.goalsFor < match.goalsAgainst),
    goalsFor: total.goalsFor + match.goalsFor,
    goalsAgainst: total.goalsAgainst + match.goalsAgainst,
  }), { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 });
}

export function getScorers(list = matches) {
  const goals = new Map();
  for (const match of list) {
    for (const scorer of match.scorers) {
      const name = playerName(scorer.name);
      goals.set(name, (goals.get(name) || 0) + scorer.goals);
    }
  }
  return [...goals].map(([name, goals]) => ({ name, goals }))
    .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name));
}

export function getRankings(list = matches) {
  const scorers = getScorers(list);
  return scorers.map((player, index) => ({
    ...player,
    rank: index === 0 ? 1 : player.goals === scorers[index - 1].goals
      ? scorers.findIndex(other => other.goals === player.goals) + 1 : index + 1,
  }));
}

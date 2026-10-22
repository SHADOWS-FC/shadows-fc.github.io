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
  logo: 'assets/logos/shadows-fc.jpg',
};

export const matches = [
  {
    id: 'legrena', round: 1, date: '29/09', time: '21:00',
    opponent: 'Legrena FC', initials: 'LFC', color: '#ad83e8',
    goalsFor: 4, goalsAgainst: 5,
    scorers: [{ name: 'Gkoumas', goals: 1 }, { name: 'Dinos', goals: 1 },
      { name: 'Zachos', goals: 1 }, { name: 'Galanis', goals: 1 }],
    mvp: null,
    source: 'First-game lineup and full-time posts. Match date from lineup, not post timestamp.',
  },
  {
    id: 'aston-voula', round: 2, date: '06/10', time: '20:00',
    opponent: 'Aston Voula', initials: 'AV', color: '#8bc2e3',
    logo: 'assets/logos/aston-voula.png',
    goalsFor: 5, goalsAgainst: 6,
    scorers: [{ name: 'Rothos', goals: 3 }, { name: 'Tasos', goals: 1 }, { name: 'Xatzi', goals: 1 }],
    mvp: null,
    source: 'Second-game lineup and full-time posts. Scorer names retained as printed.',
  },
  {
    id: 'unathletico', round: 3, date: '12/10', time: '21:00',
    opponent: 'Unathletico FC', initials: 'UFC', color: '#d6ddd7',
    logo: 'assets/logos/unathletico.jpg', crestShape: 'shield',
    goalsFor: 5, goalsAgainst: 8,
    scorers: [{ name: 'Mike', goals: 2 }, { name: 'Dinos', goals: 1 },
      { name: 'Gkoumas', goals: 1 }, { name: 'Stavros', goals: 1 }],
    mvp: null,
    source: 'Matchday post dated 12 October; full-time post dated 13 October. Duplicate screenshot counted once.',
  },
  {
    id: 'savralliolid', round: 4, date: '21/10', time: '22:00',
    opponent: 'Savralliolid FC', initials: 'SFC', color: '#efcc56',
    logo: 'assets/logos/savralliolid.jpeg',
    goalsFor: 7, goalsAgainst: 6,
    scorers: [{ name: 'Gkoumas', goals: 3 }, { name: 'Dinos', goals: 2 }, { name: 'Rothos', goals: 2 }],
    mvp: 'Gkoumas',
    source: 'Matchday caption specifies Wednesday 21/10 at 22:00; result graphic provides scorers. MVP confirmed by club in chat.',
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
export const confirmedPlayers = [
  { name: 'Sotiris Giotis', number: 1, position: 'GK', confirmed: true, photo: 'assets/players/1.jpeg' },
  { name: 'Chatziamanetoglou Giorgos', number: 82, position: 'GK', confirmed: true, photo: 'assets/players/82.jpeg' },
  { name: 'Troka Giorgos', number: 9, position: 'CB', confirmed: true, photo: 'assets/players/9.jpeg' },
  { name: 'Babakos Dimitris', number: 11, position: 'CB', confirmed: true, photo: 'assets/players/11.jpeg' },
  { name: 'Zachos Giannis', number: 5, position: 'CB', confirmed: true, photo: 'assets/players/5.jpeg', scorerName: 'Zachos' },
  { name: 'Chatzinikolaou Christos', number: 28, position: 'CM', confirmed: true, photo: 'assets/players/28.jpeg' },
  { name: 'Chatziamanetoglou Dinos', number: 7, position: 'RW', confirmed: true, photo: 'assets/players/7.jpeg', scorerName: 'Dinos' },
  { name: 'Marfa Mixalis', number: 8, position: 'LW', confirmed: true, photo: 'assets/players/8.jpeg', scorerName: 'Mixalis' },
  { name: 'Stavros Kalogiropoulos', number: 14, position: 'CAM', confirmed: true, photo: 'assets/players/14.jpeg', scorerName: 'Stavros' },
  { name: 'Kobas Gavrilos', number: 69, position: 'ST', confirmed: true, photo: 'assets/players/69.jpeg' },
  { name: 'Rothos Ioannis', number: 22, position: 'ST', confirmed: true, photo: 'assets/players/22.jpeg', scorerName: 'Rothos' },
  { name: 'Gkoumas Konstantinos', number: 6, position: 'ST', confirmed: true, photo: 'assets/players/6.jpeg', scorerName: 'Gkoumas' },
  { name: 'Tasos Babakos', number: 10, position: 'ST', confirmed: true, photo: 'assets/players/10.jpeg', scorerName: 'Tasos' },
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

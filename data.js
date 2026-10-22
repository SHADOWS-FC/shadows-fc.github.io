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
    goalsFor: 5, goalsAgainst: 6,
    scorers: [{ name: 'Rothos', goals: 3 }, { name: 'Tasos', goals: 1 }, { name: 'Xatzi', goals: 1 }],
    mvp: null,
    source: 'Second-game lineup and full-time posts. Scorer names retained as printed.',
  },
  {
    id: 'unathletico', round: 3, date: '12/10', time: '21:00',
    opponent: 'Unathletico FC', initials: 'UFC', color: '#d6ddd7',
    goalsFor: 5, goalsAgainst: 8,
    scorers: [{ name: 'Mike', goals: 2 }, { name: 'Dinos', goals: 1 },
      { name: 'Gkoumas', goals: 1 }, { name: 'Stavros', goals: 1 }],
    mvp: null,
    source: 'Matchday post dated 12 October; full-time post dated 13 October. Duplicate screenshot counted once.',
  },
  {
    id: 'savralliolid', round: 4, date: '21/10', time: '22:00',
    opponent: 'Savralliolid FC', initials: 'SFC', color: '#efcc56',
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

// Confirmed by the club, paired with named portraits in chat. Original photo
// files are still needed; never substitute a generated likeness for a player.
export const confirmedPlayers = [
  { name: 'Sotiris Giotis', number: 1, position: 'GK', confirmed: true, photo: null },
  { name: 'Chatziamanetoglou Giorgos', number: 82, position: 'GK', confirmed: true, photo: null },
  { name: 'Troka Giorgos', number: 9, position: 'CB', confirmed: true, photo: null },
  { name: 'Babakos Dimitris', number: 11, position: 'CB', confirmed: true, photo: null },
  { name: 'Zachos Giannis', number: 5, position: 'CB', confirmed: true, photo: null, scorerName: 'Zachos' },
  { name: 'Chatzinikolaou Christos', number: 28, position: 'CM', confirmed: true, photo: null },
  { name: 'Chatziamanetoglou Dinos', number: 7, position: 'RW', confirmed: true, photo: null, scorerName: 'Dinos' },
];

export const squad = [
  ...confirmedPlayers,
  ...latestMatchdaySquad.filter(player => !confirmedPlayers.some(profile => profile.number === player.number)),
];

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

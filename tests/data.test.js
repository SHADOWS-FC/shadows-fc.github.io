import test from 'node:test';
import assert from 'node:assert/strict';
import { matches, squad, latestMatchdaySquad, confirmedPlayers, getSummary, getScorers, getRankings, playerName, selectMatches, getMatchMonths, getScoringHistory } from '../data.js';

test('five unique results preserve the original four games and add Blue Fish once', () => {
  assert.equal(matches.length, 5);
  assert.equal(new Set(matches.map(match => match.id)).size, 5);
  assert.deepEqual(matches.map(match => [match.goalsFor, match.goalsAgainst]), [[4, 5], [5, 6], [5, 8], [7, 6], [7, 4]]);
});

test('each scorer list reconciles to the actual team score', () => {
  for (const match of matches) {
    assert.equal(match.scorers.reduce((sum, player) => sum + player.goals, 0), match.goalsFor, match.opponent);
  }
});

test('record and goals include the confirmed Blue Fish win', () => {
  assert.deepEqual(getSummary(), { played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 28, goalsAgainst: 29 });
});

test('joint leaders have equal ranks; player totals reconcile to team goals', () => {
  const scorers = getScorers();
  assert.deepEqual(scorers.slice(0, 3), [{ name: 'Gkoumas', goals: 5 }, { name: 'Rothos', goals: 5 }, { name: 'Dinos', goals: 4 }]);
  assert.equal(scorers.reduce((sum, player) => sum + player.goals, 0), 28);
  assert.deepEqual(getRankings().slice(0, 3).map(player => player.rank), [1, 1, 3]);
});

test('only confirmed name aliases are merged, preserving original match evidence', () => {
  assert.equal(playerName('Mike'), 'Mixalis');
  assert.equal(getScorers().find(player => player.name === 'Mixalis').goals, 2);
  assert.ok(matches[2].scorers.some(player => player.name === 'Mike'));
  assert.equal(playerName('Xatzi'), 'Xatzi');
});

test('Savralliolid MVP and historical shirt numbers retain the supplied information', () => {
  const match = matches.find(match => match.id === 'savralliolid');
  assert.equal(match.mvp, 'Gkoumas');
  assert.equal(match.scorers.find(player => player.name === 'Gkoumas').goals, 3);
  assert.deepEqual(latestMatchdaySquad.map(player => player.number), [82, 6, 11, 77, 7, 8, 10, 22]);
});

test('club profiles update the current squad without rewriting historical selections', () => {
  assert.equal(squad.find(player => player.number === 82).name, 'Chatziamanetoglou Giorgos');
  assert.equal(latestMatchdaySquad.find(player => player.number === 82).name, 'Chatziamanetoglou G.');
  assert.equal(squad.filter(player => player.number === 82).length, 1);
  assert.equal(squad.find(player => player.number === 1).position, 'GK');
  assert.equal(squad.find(player => player.number === 11).name, 'Babakos Dimitris');
  assert.equal(squad.find(player => player.number === 9).position, 'CB');
  assert.equal(new Set(squad.map(player => player.number)).size, squad.length);
  assert.equal(confirmedPlayers.find(player => player.number === 28).position, 'CM');
  assert.equal(squad.find(player => player.number === 7).scorerName, 'Dinos');
});

test('empty record and additional draws are calculated correctly', () => {
  assert.deepEqual(getSummary([]), { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 });
  assert.equal(getSummary([{ goalsFor: 2, goalsAgainst: 2 }]).drawn, 1);
});


test('archive combines opponent, month and result without altering match data', () => {
  const originalOrder = matches.map(match => match.id);
  assert.deepEqual(selectMatches(matches, { query: '  SAVRALLIOLID ', month: '10', result: 'win' }).map(match => match.id), ['savralliolid']);
  assert.equal(selectMatches(matches, { query: 'Savralliolid', result: 'loss' }).length, 0);
  assert.equal(selectMatches(matches, { month: '09' }).length, 1);
  assert.deepEqual(matches.map(match => match.id), originalOrder);
});

test('chronology follows rounds across New Year, with stable goal-sort ties', () => {
  const history = [
    { ...matches[0], id: 'jan', round: 20, date: '03/01', goalsFor: 6, goalsAgainst: 6, opponent: 'Αστέρας' },
    { ...matches[0], id: 'dec', round: 19, date: '28/12', goalsFor: 6, goalsAgainst: 3 },
    { ...matches[0], id: 'feb', round: 21, date: '01/02', goalsFor: 3, goalsAgainst: 5 },
  ];
  assert.deepEqual(selectMatches(history).map(match => match.id), ['feb', 'jan', 'dec']);
  assert.deepEqual(selectMatches(history, { sort: 'oldest' }).map(match => match.id), ['dec', 'jan', 'feb']);
  assert.deepEqual(selectMatches(history, { sort: 'goals' }).map(match => match.id), ['jan', 'dec', 'feb']);
  assert.deepEqual(getMatchMonths(history), ['12', '01', '02']);
  assert.equal(selectMatches(history, { query: 'αστερας', result: 'draw' })[0].id, 'jan');
});

test('filtered rankings and totals use every selected match, not one UI page', () => {
  const win = matches.find(match => match.id === 'savralliolid');
  const loss = matches.find(match => match.id === 'legrena');
  const history = Array.from({ length: 40 }, (_, index) => ({
    ...(index % 4 === 0 ? win : loss), id: 'fixture-' + index, round: index + 1,
  }));
  const wins = selectMatches(history, { result: 'win' });
  assert.equal(wins.length, 10);
  assert.equal(getSummary(wins).goalsFor, 70);
  assert.deepEqual(getRankings(wins)[0], { name: 'Gkoumas', goals: 30, rank: 1 });
  assert.equal(getSummary(selectMatches(history, { query: 'missing' })).played, 0);
});

test('scoring histories reconcile aliases and totals without implying appearances', () => {
  const mixalis = getScoringHistory('Mixalis');
  assert.equal(mixalis.length, 1);
  assert.equal(mixalis[0].match.id, 'unathletico');
  assert.equal(mixalis[0].goals, 2);
  assert.deepEqual(getScoringHistory('Mike'), mixalis);
  const gkoumas = getScoringHistory('Gkoumas');
  assert.equal(gkoumas.length, 3);
  assert.equal(gkoumas.reduce((sum, entry) => sum + entry.goals, 0), 5);
  assert.equal(getScoringHistory('Galanis')[0].goals, 1);
  assert.deepEqual(getScoringHistory('Sotiris Giotis'), []);
});

test('Blue Fish scorers update their own goal histories without inferring new identities', () => {
  const matchId = 'blue-fish-20261027';
  assert.deepEqual(getScoringHistory('Manousos').map(({ match, goals }) => [match.id, goals]), [[matchId, 3]]);
  for (const name of ['Zachos', 'Tasos']) {
    const history = getScoringHistory(name);
    assert.equal(history[0].match.id, matchId);
    assert.equal(history[0].goals, 2);
    assert.equal(history.reduce((sum, entry) => sum + entry.goals, 0), 3);
    assert.equal(getScorers().find(player => player.name === name).goals, 3);
  }
  assert.equal(squad.length, 13);
  assert.ok(!squad.some(player => ['Manousos', 'Vlachos'].includes(player.name)));
  assert.deepEqual(getScoringHistory('Vlachos'), []);
});

test('lineups preserve historical positions and the handwritten Aston correction', () => {
  const [legrena, aston, unathletico] = matches;
  assert.equal(legrena.lineup.players.length, 7);
  assert.deepEqual(legrena.lineup.players.find(player => player.name === 'Zachos'), { name: 'Zachos', position: 'CM' });
  assert.equal(legrena.lineup.players.find(player => player.name === 'Gkoumas').position, 'GK');
  assert.equal(squad.find(player => player.number === 6).position, 'ST');
  assert.equal(aston.lineup.players.length, 7);
  assert.equal(aston.lineup.players.find(player => player.position === 'LW').name, 'Rothos');
  assert.ok(!aston.lineup.players.some(player => player.name === 'Giorgos'));
  assert.equal(aston.lineup.players.find(player => player.name === 'Xatzi').position, 'GK');
  assert.equal(unathletico.lineup.players.find(player => player.name === 'Xatzi').position, 'CB');
  assert.deepEqual(unathletico.lineup.substitutes, [{ name: 'Babakos T.' }]);
  assert.deepEqual(unathletico.lineup.staff, [{ name: 'Zachos', role: 'headCoach' }]);
  assert.ok(!unathletico.lineup.players.some(player => player.name === 'Zachos'));
});

test('Savralliolid selection keeps printed players and the club-corrected staff separate', () => {
  const selection = matches.find(match => match.id === 'savralliolid').lineup;
  assert.equal(selection.type, 'squad');
  assert.deepEqual(selection.players, latestMatchdaySquad);
  assert.deepEqual(selection.staff.map(person => person.name), ['Zachos', 'Chatzinikolaou', 'Καρβούνης']);
  assert.equal(selection.players.find(player => player.number === 77).name, 'Ioannis');
  assert.equal(selection.players.find(player => player.number === 22).name, 'Rothos');
});

test('Zachos injury is dated to the Legrena match with an approximate return', () => {
  const injuryMatch = matches.find(match => match.injuries?.length);
  assert.equal(injuryMatch.id, 'legrena');
  assert.equal(injuryMatch.date, '29/09');
  assert.deepEqual(injuryMatch.injuries[0], { playerNumber: 5, name: 'Zachos Giannis', absenceMonths: 1.5, expectedReturn: 'mid-November' });
  assert.equal(matches.flatMap(match => match.injuries || []).length, 1);
  assert.equal(squad.find(player => player.number === 5).name, 'Zachos Giannis');
});

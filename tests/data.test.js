import test from 'node:test';
import assert from 'node:assert/strict';
import { matches, squad, latestMatchdaySquad, confirmedPlayers, getSummary, getScorers, getRankings, playerName, selectMatches, getMatchMonths, getScoringHistory } from '../data.js';

test('four unique results; duplicate screenshot is not a fifth fixture', () => {
  assert.equal(matches.length, 4);
  assert.equal(new Set(matches.map(match => match.id)).size, 4);
  assert.deepEqual(matches.map(match => [match.goalsFor, match.goalsAgainst]), [[4, 5], [5, 6], [5, 8], [7, 6]]);
});

test('each scorer list reconciles to the actual team score', () => {
  for (const match of matches) {
    assert.equal(match.scorers.reduce((sum, player) => sum + player.goals, 0), match.goalsFor, match.opponent);
  }
});

test('record and goals reflect the four supplied games', () => {
  assert.deepEqual(getSummary(), { played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 21, goalsAgainst: 25 });
});

test('joint leaders have equal ranks; player totals reconcile to team goals', () => {
  const scorers = getScorers();
  assert.deepEqual(scorers.slice(0, 3), [{ name: 'Gkoumas', goals: 5 }, { name: 'Rothos', goals: 5 }, { name: 'Dinos', goals: 4 }]);
  assert.equal(scorers.reduce((sum, player) => sum + player.goals, 0), 21);
  assert.deepEqual(getRankings().slice(0, 3).map(player => player.rank), [1, 1, 3]);
});

test('only confirmed name aliases are merged, preserving original match evidence', () => {
  assert.equal(playerName('Mike'), 'Mixalis');
  assert.equal(getScorers().find(player => player.name === 'Mixalis').goals, 2);
  assert.ok(matches[2].scorers.some(player => player.name === 'Mike'));
  assert.equal(playerName('Xatzi'), 'Xatzi');
});

test('last-match MVP and shirt numbers match the supplied information', () => {
  assert.equal(matches.at(-1).mvp, 'Gkoumas');
  assert.equal(matches.at(-1).scorers.find(player => player.name === 'Gkoumas').goals, 3);
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
  const history = Array.from({ length: 40 }, (_, index) => ({
    ...matches[index % matches.length], id: 'fixture-' + index, round: index + 1,
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

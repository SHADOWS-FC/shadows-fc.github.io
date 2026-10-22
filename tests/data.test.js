import test from 'node:test';
import assert from 'node:assert/strict';
import { matches, squad, getSummary, getScorers, getRankings, playerName } from '../data.js';

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
  assert.deepEqual(squad.map(player => player.number), [82, 6, 11, 77, 7, 8, 10, 22]);
});

test('empty record and additional draws are calculated correctly', () => {
  assert.deepEqual(getSummary([]), { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 });
  assert.equal(getSummary([{ goalsFor: 2, goalsAgainst: 2 }]).drawn, 1);
});

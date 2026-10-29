import test from 'node:test';
import assert from 'node:assert/strict';
import { upcomingMatches, leagueStandings, matches, getSummary, getScorers } from '../data.js';
import { localizedOpponent } from '../i18n.js';

test('Blue Fish moves from the schedule to a single completed Tuesday result', () => {
  assert.equal(upcomingMatches.length, 0);
  const fixture = matches.find(match => match.id === 'blue-fish-20261027');
  assert.ok(fixture);
  assert.equal(fixture.opponent, 'Blue Fish');
  assert.equal(fixture.date, '27/10');
  assert.equal(fixture.time, '22:00');
  assert.equal(fixture.weekday, 'tuesday');
  assert.equal(new Date(`${fixture.calendarDate}T12:00:00Z`).getUTCDay(), 2);
  assert.equal(fixture.logo, 'assets/logos/blue-fish-2026.jpeg');
  assert.deepEqual([fixture.goalsFor, fixture.goalsAgainst], [7, 4]);
  assert.equal(matches.filter(match => match.id === fixture.id).length, 1);
  assert.equal(getSummary().played, 5);
  assert.equal(getSummary().goalsFor, 28);
  assert.equal(getScorers().reduce((sum, player) => sum + player.goals, 0), 28);
});

test('the Blue Fish report preserves all seven participants without invented positions, staff or MVP', () => {
  const fixture = matches.find(match => match.id === 'blue-fish-20261027');
  assert.deepEqual(fixture.scorers, [{ name: 'Manousos', goals: 3 }, { name: 'Zachos', goals: 2 }, { name: 'Tasos', goals: 2 }]);
  assert.equal(fixture.lineup.type, 'played');
  assert.deepEqual(fixture.lineup.players, [
    { name: 'Dinos' }, { name: 'Babakos T.' }, { name: 'Babakos D.' },
    { name: 'Zachos' }, { name: 'Manousos' }, { name: 'Rothos' }, { name: 'Vlachos' },
  ]);
  assert.ok(!('mvp' in fixture));
  assert.ok(!('staff' in fixture.lineup));
  assert.ok(!('substitutes' in fixture.lineup));
});

test('the standings retain every supplied statistic and the supplied tied-team order', () => {
  const rows = leagueStandings.map(team => [team.position, team.name, team.played, team.won, team.lost, team.drawn, team.goalsFor, team.goalsAgainst, team.points]);
  assert.deepEqual(rows, [
    [1, 'CHAMPMINIONS', 4, 4, 0, 0, 25, 9, 12],
    [2, 'LEGRENA FC', 4, 4, 0, 0, 17, 11, 12],
    [3, 'UNATLETICO', 4, 3, 0, 1, 22, 12, 10],
    [4, 'BLYZZ', 4, 3, 1, 0, 24, 17, 9],
    [5, 'ΦΙΟΡΕΠΕΙΝΑ', 4, 2, 1, 1, 16, 14, 7],
    [6, 'SAVRALLIOLID', 3, 1, 2, 0, 15, 16, 3],
    [7, 'SHADOWS', 4, 1, 3, 0, 20, 25, 3],
    [8, 'BLUE FISH', 4, 1, 3, 0, 16, 21, 3],
    [9, 'ASTON VOULA B', 3, 1, 2, 0, 10, 17, 3],
    [10, 'BUNKER PARTHENR', 4, 1, 3, 0, 17, 23, 3],
    [11, 'GATES OF OLYMPUS', 4, 0, 2, 2, 13, 19, 2],
    [12, 'ΦΛΑΠ FC', 4, 0, 4, 0, 6, 17, 0],
  ]);
  for (const team of leagueStandings) {
    assert.equal(team.played, team.won + team.lost + team.drawn);
    assert.equal(team.points, 3 * team.won + team.drawn);
  }
  assert.equal(new Set(leagueStandings.map(team => team.id)).size, 12);
  assert.equal(leagueStandings.find(team => team.id === 'shadows').goalsFor, 20);
  assert.equal(getSummary().goalsFor, 28);
});

test('league names follow the language while keeping original source names and the B side distinct', () => {
  assert.equal(localizedOpponent('Blue Fish', 'el'), 'Μπλου Φις');
  for (const language of ['en', 'sq', 'es']) {
    for (const team of leagueStandings) assert.doesNotMatch(localizedOpponent(team.name, language), /\p{Script=Greek}/u);
    assert.equal(localizedOpponent('ASTON VOULA B', language), 'ASTON VOULA B');
  }
  assert.equal(leagueStandings.find(team => team.id === 'bunker-parthenr').logo, undefined);
});

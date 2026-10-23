import test from 'node:test';
import assert from 'node:assert/strict';
import { messages, localizedName, localizedOpponent, localizedCareer, announcementTranslations } from '../i18n.js';
import { squad, matches, announcements, getScorers, playerName } from '../data.js';

test('every language provides the complete interface, including accessibility labels', () => {
  const keys = Object.keys(messages.el).sort();
  for (const language of ['el', 'en', 'sq', 'es']) {
    assert.deepEqual(Object.keys(messages[language]).sort(), keys, language);
    assert.ok(Object.values(messages[language]).every(text => typeof text === 'string' && text.length));
    assert.equal(messages[language].mvp, 'MVP');
  }
});

test('all recorded personal names use Greek in Greek and Latin in the other languages', () => {
  const names = [...squad.map(player => player.name), ...matches.flatMap(match => [
    ...match.scorers.map(player => player.name), match.mvp,
    ...match.lineup.players.map(player => player.name),
    ...(match.lineup.substitutes || []).map(player => player.name),
    ...(match.lineup.staff || []).map(person => person.name),
    ...(match.injuries || []).map(injury => injury.name),
  ])];
  for (const name of names) {
    assert.doesNotMatch(localizedName(name, 'el'), /[A-Za-z]/, name);
    for (const language of ['en', 'sq', 'es']) assert.doesNotMatch(localizedName(name, language), /\p{Script=Greek}/u, `${language}: ${name}`);
  }
  assert.equal(localizedName('Καρβούνης', 'en'), 'Karvounis');
  assert.equal(localizedName('Νέος Παίκτης', 'es'), 'Neos Paiktis');
  assert.equal(localizedName('Chatziamanetoglou G.', 'el'), 'Χατζιαμανετόγλου Γ.');
});

test('display localization leaves scorer identity and unconfirmed lineup aliases intact', () => {
  const before = JSON.stringify({ squad, matches, scorers: getScorers() });
  for (const language of Object.keys(messages)) {
    squad.forEach(player => localizedName(player.name, language));
    matches.forEach(match => localizedOpponent(match.opponent, language));
  }
  assert.equal(JSON.stringify({ squad, matches, scorers: getScorers() }), before);
  assert.equal(playerName('Mike'), 'Mixalis');
  assert.equal(getScorers().find(player => player.name === 'Mixalis').goals, 2);
  assert.notEqual(localizedName('Xatzi', 'el'), localizedName('Chatziamanetoglou Giorgos', 'el'));
});

test('career periods and records stay intact while their display labels follow the language', () => {
  const career = squad.find(player => player.number === 5).career;
  assert.equal(career.length, 7);
  assert.equal(localizedCareer(career[0].label, 'el'), 'Α.Ο. Βουλιαγμένης');
  assert.equal(localizedCareer('DNP', 'es'), 'No jugó');
  assert.equal(localizedCareer('Frontistirio Prisma', 'sq'), 'Qendra mësimore Prisma');
  assert.equal(localizedCareer(career[0].label, 'en'), 'A.O.Vouliagmenis');
  assert.equal(career[0].from, 2006);
  assert.ok(career.filter(entry => entry.kind === 'club' || entry.kind === 'loan').every(entry => entry.goals === null));
});

test('the full club announcement has translations without replacing its Greek source', () => {
  const source = announcements.find(item => item.id === 'sotiris');
  for (const language of ['en', 'sq', 'es']) {
    const translation = announcementTranslations.sotiris[language];
    assert.equal(translation.body.length, source.body.el.length);
    assert.ok(translation.title && translation.summary);
    assert.doesNotMatch(translation.body.join(' '), /\p{Script=Greek}/u);
    assert.match(translation.body[4], /24/);
  }
  assert.match(source.body.el[1], /Σωτήρη/);
});

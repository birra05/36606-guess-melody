import {assert} from 'chai';
import countPoints from '../data/count-points';
import {InitialGame} from '../utils';
import {
  notEnoughAnswers, correctNotFastAnswers, someFailAnswers,
  correctAndFastAnswers, threeFailAnswers
} from './test-examples.constants';

describe(`Count gamer's points`, () => {
  it(`should not allow set incorrect number of answers`, () => {
    assert.throws(() => countPoints(), `Массив ответов должен содержать 10 элементов`);
    assert.throws(() => countPoints(notEnoughAnswers, InitialGame.LIVES), `Массив ответов должен содержать 10 элементов`);
  });
  it(`should not allow set wrong number of lives`, () => {
    assert.throws(() => countPoints(threeFailAnswers, 0), `Передано неверное количество жизней`);
    assert.throws(() => countPoints(threeFailAnswers, 5), `Передано неверное количество жизней`);
    assert.throws(() => countPoints(threeFailAnswers, 2.5), `Передано неверное количество жизней`);
  });
  it(`should return 10, if all answers are correct and not fast`, () => {
    assert.equal(countPoints(correctNotFastAnswers, InitialGame.LIVES), 10);
  });
  it(`should return 20, if all answers are correct and fast`, () => {
    assert.equal(countPoints(correctAndFastAnswers, InitialGame.LIVES), 20);
  });
  it(`should return 4, if random answers`, () => {
    assert.equal(countPoints(someFailAnswers, 1), 4);
  });
});

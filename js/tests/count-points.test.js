import {assert} from 'chai';
import countPoints from '../data/count-points';
import {INITIAL_GAME} from '../utils';
import {
  notEnoughAnswers, correctNotFastAnswers, someFailAnswers,
  correctAndFastAnswers, threeFailAnswers
} from './test-examples.constants';

describe(`Count gamer's points`, () => {
  it(`should return 'Переданы неверные данные', if number of answers is less than 10`, () => {
    assert.equal(countPoints(notEnoughAnswers, INITIAL_GAME.lives), `Переданы неверные данные`);
  });
  it(`should return 'Переданы неверные данные', if function doesn't get the parameters`, () => {
    assert.equal(countPoints(), `Переданы неверные данные`);
  });
  it(`should return 'Количество попыток закончилось', if at least 3 answers are not correct`, () => {
    assert.equal(countPoints(threeFailAnswers, 0), `Количество попыток закончилось`);
  });
  it(`should return 10, if all answers are correct and not fast`, () => {
    assert.equal(countPoints(correctNotFastAnswers, INITIAL_GAME.lives), 10);
  });
  it(`should return 20, if all answers are correct and fast`, () => {
    assert.equal(countPoints(correctAndFastAnswers, INITIAL_GAME.lives), 20);
  });
  it(`should return 4, if random answers`, () => {
    assert.equal(countPoints(someFailAnswers, 1), 4);
  });
});

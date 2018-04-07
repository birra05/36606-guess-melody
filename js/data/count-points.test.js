import {assert} from 'chai';
import countPoints from './count-points';
import {INITIAL_GAME} from '../utils';
import {
  notEnoughAnswers, correctNotFastAnswers, someFailAnswers,
  correctAndFastAnswers, threeFailAnswers
} from './test-examples.constants';

describe(`Count gamer's points`, () => {
  it(`should return -1, if number of answers is less than 10`, () => {
    assert.equal(countPoints(notEnoughAnswers, INITIAL_GAME.lives), -1);
  });
  it(`should return -1, if function doesn't get the parameters`, () => {
    assert.equal(countPoints(), -1);
  });
  it(`should return -1, if at least 3 answers are not correct`, () => {
    assert.equal(countPoints(threeFailAnswers, 0), -1);
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

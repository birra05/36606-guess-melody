import {assert} from 'chai';
import {InitialState} from '../utils';
import {
  notEnoughAnswers, correctNotFastAnswers, someFailAnswers,
  correctAndFastAnswers, threeFailAnswers
} from './test-examples.constants';
import ResultScreen from '../modules/result-screen';
import GameModel from '../data/game-model';

describe(`Count gamer's points`, () => {
  const model = new GameModel();
  const resultScreen = new ResultScreen(model);

  it(`should not allow set incorrect number of answers`, () => {
    assert.throws(() => resultScreen._countPoints(), `Массив ответов должен содержать 10 элементов`);
    assert.throws(() => resultScreen._countPoints(notEnoughAnswers, InitialState.LIVES), `Массив ответов должен содержать 10 элементов`);
  });
  it(`should not allow set wrong number of lives`, () => {
    assert.throws(() => resultScreen._countPoints(threeFailAnswers, 0), `Передано неверное количество жизней`);
    assert.throws(() => resultScreen._countPoints(threeFailAnswers, 5), `Передано неверное количество жизней`);
    assert.throws(() => resultScreen._countPoints(threeFailAnswers, 2.5), `Передано неверное количество жизней`);
  });
  it(`should return 10, if all answers are correct and not fast`, () => {
    assert.equal(resultScreen._countPoints(correctNotFastAnswers, InitialState.LIVES), 10);
  });
  it(`should return 20, if all answers are correct and fast`, () => {
    assert.equal(resultScreen._countPoints(correctAndFastAnswers, InitialState.LIVES), 20);
  });
  it(`should return correct points, if answers are random and data is correct`, () => {
    assert.equal(resultScreen._countPoints(someFailAnswers, 1), 4);
  });
});

import {assert} from 'chai';
import {showResult} from './show-result';
import {aLotOfPlayers, playerResult, playerResultNoLives, playerResultNoTime} from './test-examples.constants';

describe(`Shows player's results and compares with other players`, () => {
  it(`should return 'Вы заняли 3 место из 13 игроков. Это лучше, чем у 76% игроков', if data is correct`, () => {
    assert.equal(showResult(aLotOfPlayers, playerResult), `Вы заняли 3 место из 13 игроков. Это лучше, чем у 76% игроков`);
  });
  it(`should return 'Время вышло! Вы не успели отгадать все мелодии', if time is over`, () => {
    assert.equal(showResult(aLotOfPlayers, playerResultNoTime), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`should return 'У вас закончились все попытки. Ничего, повезёт в следующий раз!', if limit is exceed`, () => {
    assert.equal(showResult(aLotOfPlayers, playerResultNoLives), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`should return -1, if no stats or no player's result`, () => {
    assert.equal(showResult(), -1);
  });
});

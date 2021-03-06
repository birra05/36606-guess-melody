import {assert} from 'chai';
import {
  aLotOfPlayersStats, onePlayerStats, playerResult, playerResultNoLives, playerResultNoTime,
  playersStats
} from './test-examples.constants';
import ResultScreen from '../modules/result-screen';

describe(`Shows player's results and compares with other players`, () => {

  it(`should return result message, if data is correct`, () => {
    assert.equal(ResultScreen.showResult(aLotOfPlayersStats, playerResult), `Вы заняли 3 место из 13 игроков. Это лучше, чем у 76% игроков`);
    assert.equal(ResultScreen.showResult(playersStats, playerResult), `Вы заняли 2 место из 6 игроков. Это лучше, чем у 66% игроков`);
    assert.equal(ResultScreen.showResult(onePlayerStats, playerResult), `Вы заняли 2 место из 2 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`should return 'Время вышло! Вы не успели отгадать все мелодии', if time is over`, () => {
    assert.equal(ResultScreen.showResult(aLotOfPlayersStats, playerResultNoTime), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`should return 'У вас закончились все попытки. Ничего, повезёт в следующий раз!', if limit is exceed`, () => {
    assert.equal(ResultScreen.showResult(playersStats, playerResultNoLives), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});

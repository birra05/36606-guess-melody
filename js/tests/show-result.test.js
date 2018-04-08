import {assert} from 'chai';
import showResult from '../data/show-result';
import {
  aLotOfPlayersStats, onePlayerStats, playerResult, playerResultNoLives, playerResultNoTime,
  playersStats
} from './test-examples.constants';

describe(`Shows player's results and compares with other players`, () => {
  it(`should return 'Вы заняли 3 место из 13 игроков. Это лучше, чем у 76% игроков', if data is correct`, () => {
    assert.equal(showResult(aLotOfPlayersStats, playerResult), `Вы заняли 3 место из 13 игроков. Это лучше, чем у 76% игроков`);
  });
  it(`should return 'Время вышло! Вы не успели отгадать все мелодии', if time is over`, () => {
    assert.equal(showResult(aLotOfPlayersStats, playerResultNoTime), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`should return 'У вас закончились все попытки. Ничего, повезёт в следующий раз!', if limit is exceed`, () => {
    assert.equal(showResult(playersStats, playerResultNoLives), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`should return 'Переданы неверные данные', if no stats or no player's result`, () => {
    assert.equal(showResult(), `Переданы неверные данные`);
  });
  it(`should return 'Вы сыграли хуже всех', if player's result is worst`, () => {
    assert.equal(showResult(onePlayerStats, playerResult), `Вы сыграли хуже всех`);
  });
});

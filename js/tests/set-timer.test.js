import {assert} from 'chai';
import setTimer from '../data/set-timer';

describe(`Set timer`, () => {
  it(`should return false, when reduce time by one second and time is not over yet`, () => {
    const timer = setTimer(15);
    timer.tick();
    assert.equal(timer.time, 14);
    assert.equal(timer.completed, false);
  });
  it(`should return 'Время вышло', when timer is completed`, () => {
    const timer = setTimer(1);
    timer.tick();
    assert.equal(timer.completedMessage(), `Время вышло`);
  });
  it(`should return 'Переданы неверные данные', if function has no parameters or time is over`, () => {
    assert.equal(setTimer(), `Переданы неверные данные`);
    assert.equal(setTimer(0), `Переданы неверные данные`);
  });
  it(`should return  'Переданы неверные данные', if time is not a number type`, () => {
    assert.equal(setTimer(`5`), `Переданы неверные данные`);
    assert.equal(setTimer(false), `Переданы неверные данные`);
    assert.equal(setTimer([]), `Переданы неверные данные`);
    assert.equal(setTimer({}), `Переданы неверные данные`);
  });
  it(`should return 'Переданы неверные данные', if time is not integer number`, () => {
    assert.equal(setTimer(0.45), `Переданы неверные данные`);
  });
});

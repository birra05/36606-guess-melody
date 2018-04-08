import {assert} from 'chai';
import setTimer from '../data/set-timer';

describe(`Set timer`, () => {
  it(`should return false, when reduce time by one second and time is not over yet`, () => {
    const timer = setTimer(15);
    timer.tick();
    assert.equal(timer.time, 14);
    assert.equal(timer.tick(), false);
  });
  it(`should return true, when timer is completed`, () => {
    const timer = setTimer(2);
    timer.tick();
    timer.tick();
    assert.equal(timer.tick(), true);
  });
  it(`should not allow set time, if it is not integer number or data is incorrect`, () => {
    assert.throws(() => setTimer(), `Ожидается целое число больше нуля`);
    assert.throws(() => setTimer(0), `Ожидается целое число больше нуля`);
    assert.throws(() => setTimer(0.45), `Ожидается целое число больше нуля`);
    assert.throws(() => setTimer(`5`), `Ожидается целое число больше нуля`);
    assert.throws(() => setTimer(false), `Ожидается целое число больше нуля`);
    assert.throws(() => setTimer([]), `Ожидается целое число больше нуля`);
    assert.throws(() => setTimer({}), `Ожидается целое число больше нуля`);
  });
});

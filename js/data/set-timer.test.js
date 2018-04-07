import {assert} from 'chai';
import setTimer from './set-timer';

describe(`Set timer`, () => {
  it(`should return false, when reduce time by one second and time is not over yet`, () => {
    const timer = setTimer(15);
    timer.tick();
    assert.equal(timer.time, 14);
    assert.equal(timer.completed, false);
  });
  it(`should return true, when timer is completed`, () => {
    const timer = setTimer(1);
    timer.tick();
    assert.equal(timer.completed, true);
  });
  it(`should return  -1, if function has no parameters or time is over`, () => {
    assert.equal(setTimer(), -1);
    assert.equal(setTimer(0), -1);
  });
  it(`should return  -1, if time is not a number type`, () => {
    assert.equal(setTimer(`5`), -1);
    assert.equal(setTimer(false), -1);
    assert.equal(setTimer([]), -1);
    assert.equal(setTimer({}), -1);
  });
  it(`should return -1, if time is not integer number`, () => {
    assert.equal(setTimer(0.45), -1);
  });
});

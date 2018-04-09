const setTimer = (time) => {
  if (!Number.isInteger(time) || time <= 0) {
    throw new Error(`Ожидается целое число больше нуля`);
  }

  return {
    time,
    tick() {
      this.time--;
      if (this.time === 0) {
        return true;
      }
      return false;
    }
  };
};

export default setTimer;

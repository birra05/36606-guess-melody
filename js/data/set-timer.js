const setTimer = (time) => {
  if (!time || !Number.isInteger(time) || time <= 0) {
    return -1;
  }

  return {
    time,
    completed: false,
    tick() {
      this.time--;
      if (this.time <= 0) {
        this.completed = true;
      }
    }
  };
};

export default setTimer;

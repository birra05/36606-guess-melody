const setTimer = (time) => {
  if (!time || !Number.isInteger(time) || time <= 0) {
    return `Переданы неверные данные`;
  }

  return {
    time,
    completed: false,
    tick() {
      this.time--;
      if (this.time <= 0) {
        this.completed = true;
        this.completedMessage();
      }
    },
    completedMessage() {
      return `Время вышло`;
    }
  };
};

export default setTimer;

const timerValue = (time) => {
  const timeValue = new Date(time * 1000).toUTCString().split(/ /)[4].slice(3);
  const minutes = timeValue.substring(0, 2);
  const seconds = timeValue.substring(3);

  return `<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${seconds}</span>
      </div>`;
};

const timer = (gameState) => `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">  
      </circle>
     ${timerValue(gameState.time)}
    </svg>`;

export default timer;

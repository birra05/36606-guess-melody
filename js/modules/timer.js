export default (state) => {
  const ONE_MINUTE = 60;
  const minutes = String(Math.floor(state.time / ONE_MINUTE));
  const seconds = String(state.time % ONE_MINUTE);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">  
      </circle>
     <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${minutes.length === 1 ? `0` + minutes : minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${seconds.length === 1 ? `0` + seconds : seconds}</span>
      </div>
    </svg>`;
};

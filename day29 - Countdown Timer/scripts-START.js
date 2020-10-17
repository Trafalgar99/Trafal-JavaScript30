(function () {
  const buttons = document.querySelectorAll(".timer__controls > button");
  let timer;
  const timeLeft = document.querySelector(".display__time-left");
  const endTime = document.querySelector(".display__end-time");

  buttons.forEach((button) => button.addEventListener("click", setTimer));
  const startTimer = function (sec) {
    // console.log(sec);
    clearInterval(timer);
    const now = Date.now();
    const end = now + sec * 1000;

    //倒数计时
    timer = setInterval(function () {
      const secLeft = Math.floor((end - Date.now()) / 1000);
      if (secLeft >= 0) {
        let displayMin = Math.floor(secLeft / 60);
        let displaySec = secLeft % 60;
        displayMin = displayMin < 10 ? "0" + displayMin : displayMin;
        displaySec = displaySec < 10 ? "0" + displaySec : displaySec;
        timeLeft.innerText = `${displayMin}:${displaySec}`;
      } else {
        clearInterval(timer);
      }
    }, 16);

    //显示最后时间
    const endDate = new Date(end);
    let hour = endDate.getHours();
    let min = endDate.getMinutes();
    min = min < 10 ? "0" + min : min;
    endTime.innerText = `Back at ${hour}:${min}`;
  };
  function setTimer() {
    const sec = parseInt(this.dataset.time);
    startTimer(sec);
  }
  document.querySelector("#custom").addEventListener("submit", function (e) {
    e.preventDefault();
    const value = parseInt(this.minutes.value);
    if (value) {
      startTimer(value * 60);
      this.reset();
    }
  });
})();

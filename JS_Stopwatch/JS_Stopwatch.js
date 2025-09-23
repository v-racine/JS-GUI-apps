const CENTISECONDS_IN_MILLISECONDS = 10;
const SECONDS_IN_CENTISECONDS = 100;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

class Timer {
  constructor(updateCallback) {
    this.running = false;

    this.counters = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      centiseconds: 0,
    };

    // Interval IDs
    // this.hourInterval = null;
    // this.minuteInterval = null;
    // this.secondInterval = null;
    this.centisecondInterval = null;

    this.updateCallback = updateCallback;
    this.reset();
  }

  start() {
    if (this.running) {
      console.log("Timer is already running.");
      return;
    }

    this.running = true;
    console.log("Timer started.");

    this.centisecondInterval = setInterval(() => {
      this.counters.centiseconds += 1;

      if (this.counters.centiseconds >= SECONDS_IN_CENTISECONDS) {
        this.counters.centiseconds = 0;
        this.incrementSeconds();
      }
      this.updateCallback(this.counters);
    }, CENTISECONDS_IN_MILLISECONDS);
  }

  //Helpers for `start` method
  incrementSeconds() {
    this.counters.seconds++;
    if (this.counters.seconds >= SECONDS_IN_MINUTE) {
      this.counters.seconds = 0;
      this.incrementMinutes();
    }
  }

  incrementMinutes() {
    this.counters.minutes++;
    if (this.counters.minutes >= MINUTES_IN_HOUR) {
      this.counters.minutes = 0;
      this.incrementHours();
    }
  }

  incrementHours() {
    this.counters.hours++;
    // This one will just keep counting...
  }

  stop() {
    if (!this.running) {
      console.log("Timer is not running.");
      return;
    }

    this.running = false;
    console.log("Timer stopped.");

    // [
    //   this.hourInterval,
    //   this.minuteInterval,
    //   this.secondInterval,
    //   this.centisecondInterval,
    // ].forEach((timer) => {
    //   clearInterval(timer);
    // });

    clearInterval(this.centisecondInterval);

    // this.hourInterval = null;
    // this.minuteInterval = null;
    // this.secondInterval = null;
    this.centisecondInterval = null;
  }

  reset() {
    this.stop();
    console.log("Timer reset.");

    this.counters = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      centiseconds: 0,
    };

    this.updateCallback(this.counters);
  }
}

class StopWatchApp {
  constructor() {
    this.startStopBtn = document.querySelector("#start-stop");
    this.resetBtn = document.querySelector("#reset");

    this.hours = document.querySelector("#hours");
    this.minutes = document.querySelector("#minutes");
    this.seconds = document.querySelector("#seconds");
    this.centiseconds = document.querySelector("#centiseconds");

    this.timer = new Timer(this.updateDisplay.bind(this));

    this.init();
  }

  updateDisplay(counters) {
    this.hours.textContent = String(counters.hours).padStart(2, "0");
    this.minutes.textContent = String(counters.minutes).padStart(2, "0");
    this.seconds.textContent = String(counters.seconds).padStart(2, "0");
    this.centiseconds.textContent = String(counters.centiseconds).padStart(
      2,
      "0"
    );
  }

  handleStartStopClick(event) {
    if (!this.timer.running) {
      this.timer.start();
      this.startStopBtn.textContent = "Stop";
    } else {
      this.timer.stop();
      this.startStopBtn.textContent = "Start";
    }
  }

  handleResetClick(event) {
    this.timer.reset();
    this.startStopBtn.textContent = "Start";
  }

  bindEvents() {
    this.startStopBtn.addEventListener(
      "click",
      this.handleStartStopClick.bind(this)
    );

    this.resetBtn.addEventListener("click", this.handleResetClick.bind(this));
  }

  init() {
    this.bindEvents();
    this.updateDisplay(this.timer.counters);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new StopWatchApp();
});

//REFACTOR =>
// Remove all the helper functions and separate counters
class Timer {
  constructor(updateCallback) {
    this.running = false;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.intervalId = null;
    this.updateCallback = updateCallback;
  }

  start() {
    if (this.running) {
      console.log("Timer is already running.");
      return;
    }

    this.running = true;
    this.startTime = Date.now() - this.elapsedTime;
    console.log("Timer started.");

    this.intervalId = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.updateCallback(this.elapsedTime);
    }, 10);
  }

  stop() {
    if (!this.running) {
      console.log("Timer is not running.");
      return;
    }

    this.running = false;
    clearInterval(this.intervalId);
    console.log("Timer stopped.");
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.updateCallback(this.elapsedTime);
    console.log("Timer reset.");
  }
}

class StopWatchApp {
  constructor() {
    this.startStopBtn = document.querySelector("#start-stop");
    this.resetBtn = document.querySelector("#reset");

    this.hours = document.querySelector("#hours");
    this.minutes = document.querySelector("#minutes");
    this.seconds = document.querySelector("#seconds");
    this.centiseconds = document.querySelector("#centiseconds");

    this.timer = new Timer(this.updateDisplay.bind(this));

    this.init();
  }

  updateDisplay(elapsedTime) {
    const totalCentiseconds = Math.floor(elapsedTime / 10);
    const centiseconds = totalCentiseconds % 100;
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    this.hours.textContent = String(hours).padStart(2, "0");
    this.minutes.textContent = String(minutes).padStart(2, "0");
    this.seconds.textContent = String(seconds).padStart(2, "0");
    this.centiseconds.textContent = String(centiseconds).padStart(2, "0");
  }

  handleStartStopClick(event) {
    if (!this.timer.running) {
      this.timer.start();
      this.startStopBtn.textContent = "Stop";
    } else {
      this.timer.stop();
      this.startStopBtn.textContent = "Start";
    }
  }

  handleResetClick(event) {
    this.timer.reset();
    this.startStopBtn.textContent = "Start";
  }

  bindEvents() {
    this.startStopBtn.addEventListener(
      "click",
      this.handleStartStopClick.bind(this)
    );

    this.resetBtn.addEventListener("click", this.handleResetClick.bind(this));
  }

  init() {
    this.bindEvents();
    this.updateDisplay(this.timer.counters);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new StopWatchApp();
});

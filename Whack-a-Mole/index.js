const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timesUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomHoles(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log("Ah nah that's the same one bud");
    return randomHoles(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(400, 2000);
  const hole = randomHoles(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timesUp) {
      peep();
    }
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timesUp = false;
  score = 0;
  peep();

  setTimeout(() => {
    timesUp = true;
  }, 11000);
}

function bonk(e) {
  if (!e.isTrusted) return; //cheaters!
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => {
  mole.addEventListener("click", bonk);
});

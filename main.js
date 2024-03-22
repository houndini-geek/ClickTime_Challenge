const actionBtns = document.querySelectorAll(".game__state button");
const startGameBtn = document.querySelector(".startGameBtn");
const takeBreak = document.querySelector('.takeBreak');
const resumeBtn = document.querySelector('.resume');
const smart__bar = document.querySelector(".smart_bar");
const globalTimerTemplate = document.querySelector(".timer");
const gameBox = document.querySelector(".game__box");
const player_current_score = document.querySelector(".player__current__score");

let globalSecond = 10;
let globalMinute = 0;
let restCount = 3;
let globalInterval;
let playerScore = 0;
let isPlaying = false;

gameBox.style.pointerEvents = "none";
resumeBtn.disabled = true 
takeBreak.disabled = true

function updateTimerDisplay() {
  globalTimerTemplate.innerHTML = `<span>${globalMinute} M</span> : <span>${globalSecond} S</span>`;
}

function startGlobalTimer() {
 
    isPlaying = true;
    startGameBtn.disabled = true; // Disable the start button
    gameBox.style.pointerEvents = "auto";
    takeBreak.disabled = false

    globalInterval = setInterval(() => {
      updateTimerDisplay();
      if (globalSecond > 0) {
        globalSecond--;
      } else {
        globalSecond = 0;
        clearInterval(globalInterval);
        gameOver();
      }
    }, 1000);
  
}

function stopGlobalTimer() {
  clearInterval(globalInterval);
  isPlaying = false;
}

function gameOver() {
  stopGlobalTimer();
  restCount = 0; 
 
  // Reset rest count when the game is over
  // Additional game over logic can be added here if needed
}

function handleBoxClick() {
  playerScore++;
  if (playerScore % 50 === 0) {
    globalSecond += 10;
  }
  player_current_score.innerHTML = `Score : ${playerScore}`;
}

function takeBreakFun() {

  if (restCount > 0) {
    restCount-- 
    resume.disabled = false 
    takeBreak.disabled = true
    takeBreak.setAttribute('data-restCount', restCount);
    stopGlobalTimer()
  }else{

      restCount = 0 
      takeBreak.disabled = true
     resumeBtn.disabled = false 
    console.log('Out of rest count');
    stopGlobalTimer();
  }


}

function resumeGame() {
  takeBreak.disabled = false
  resumeBtn.disabled = true
  startGlobalTimer();
}

actionBtns.forEach((btn) => {
  const action = btn.dataset.action;
  const offsetLeft = btn.offsetLeft;
  const width = btn.scrollWidth;
  btn.addEventListener("click", () => {
    smart__bar.style.width = `${width}px`;
    smart__bar.style.transform = `translateX(${offsetLeft}px)`;
    switch (action) {
      case "start":
        startGlobalTimer();
        break;
      case "rest":
        takeBreakFun();
        break;
      case "resume":
        resumeGame();
        break;
      default:
        console.log("Invalid action");
    }
  });
});

gameBox.onclick = function () {
  if (isPlaying) {
    handleBoxClick();
  }
};

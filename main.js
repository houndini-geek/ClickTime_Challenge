const actionBtns = document.querySelectorAll(".game__state button");
const startGameBtn = document.querySelector(".startGameBtn");
const game__mission = document.querySelector(".in-game__mission");
const takeBreak = document.querySelector(".takeBreak");
const resumeBtn = document.querySelector(".resume");
const smart__bar = document.querySelector(".smart_bar");
const globalTimerTemplate = document.querySelector(".timer");
const gameBox = document.querySelector(".game__box");
const player_current_score = document.querySelector(".player__current__score");

let globalSecond = 10;
let globalMinute = 0;
let restCount = 3;
let powerUpsTimer = 30;
let powerUpsInterval;
let powerInterval ;
let powerTimer = 0
let globalInterval;
let playerScore = 0;
let isPlaying = false;

const gamePowerUps = [
  {
    power: 'Time Freeze',
    duration: 8
  },
  {
    power: 'Time Multiplier',
    duration: 5
  },
  {
    power: 'Extra Time',
    duration: 7
  },
  {
    power: 'Unlimited Rest Count',
    duration: 10
  }
];


gameBox.style.pointerEvents = "none";
resumeBtn.disabled = true;
takeBreak.disabled = true;

function updateTimerDisplay() {
  globalTimerTemplate.innerHTML = `<span>${globalMinute} M</span> : <span>${globalSecond} S</span>`;
}

function startGlobalTimer() {
  isPlaying = true;
  startGameBtn.disabled = true; // Disable the start button
  gameBox.style.pointerEvents = "auto";
  takeBreak.disabled = false;
  displayPowerUpsTimer();
  globalInterval = setInterval(() => {
    updateTimerDisplay();

    if (globalSecond > 0) {
      globalSecond--;
    } else {
      globalSecond = 0;
      clearInterval(globalInterval);
      gameOver();
    }
  }, 8000);
}

function displayPowerUpsTimer() {
  powerUpsInterval = setInterval(() => {
    if (powerUpsTimer > 0) {
      powerUpsTimer--;
      game__mission.innerHTML = `<p>
 power_ups
    <span> ${powerUpsTimer} S </span>
  </p>`;
    }else {
      clearInterval(powerUpsInterval)
      grantedRandomPowerUps();
    }
  }, 400);
}

function grantedRandomPowerUps() {
  //gamePowerUps
  const randomIndex = Math.floor(Math.random() * gamePowerUps.length);
 
  const randomPowerUps = gamePowerUps[randomIndex];

  let {power, duration } = randomPowerUps
 
  powerTimer = duration

  powerUpsInterval = setInterval(() => {

    if (powerTimer > 0) {
      powerTimer-- 
      game__mission.innerHTML = `<p>
      ${power} : 
         <span> ${powerTimer} S </span>
       </p>`;
    }else {
      powerUpsTimer = 30
      clearInterval(powerUpsInterval);
      displayPowerUpsTimer();
    }

  },1000)

 

}

function stopGlobalTimer() {
  clearInterval(globalInterval);
  clearInterval(powerUpsInterval);
  actionBtns.forEach((btn) => (btn.disabled = true));
  isPlaying = false;
}

function gameOver() {
  stopGlobalTimer();
  restCount = 3;

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
    restCount--;
    resumeBtn.disabled = false;
    takeBreak.disabled = true;
    takeBreak.setAttribute("data-restCount", restCount);
    stopGlobalTimer();
  } else {
    restCount = 0;
    takeBreak.disabled = true;
    resumeBtn.disabled = true;
    console.log("Out of rest count");
  }
}

function resumeGame() {
  takeBreak.disabled = true;
  resumeBtn.disabled = true;
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

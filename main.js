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
let powerDuration = 0
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
  }, 1000);
}


function displayPowerUpsTimer() {
  clearInterval(powerUpsInterval);

  powerUpsInterval = setInterval(() => {
    if (powerUpsTimer > 0) {
      powerUpsTimer--;
      game__mission.innerHTML = `<p>
        power_ups in : 
        <span> ${powerUpsTimer} S </span>
      </p>`;
    } else {
      clearInterval(powerUpsInterval);
      grantedRandomPowerUps();
    }
  }, 1000);
}


function grantedRandomPowerUps() {
  //gamePowerUps
  const randomIndex = Math.floor(Math.random() * gamePowerUps.length);
 
  const randomPowerUps = gamePowerUps[0];

  let {power, duration } = randomPowerUps

  switch (power) {
    case "Time Freeze":
      timeFreezeFun(power,duration);
      break;
    case "Time Multiplier":
      timeMultiplierFun(power,duration);
      break;
    case "Extra Time":
      extraTimeFun(power,duration);
      break 
    case "Unlimited Rest Count":
      unlimitedRestCountFun(power,duration);
      break;
    default :
    console.log('Invalid power')
  }
 
}

function timeFreezeFun(powerName, duration) {
  clearInterval(globalInterval);
  clearInterval(powerUpsInterval);

  let powerDuration = duration;

  const powerInterval = setInterval(() => {
    if (powerDuration > 0) {
      powerDuration--;
      game__mission.innerHTML = `<p>
        ${powerName} : 
        <span> ${powerDuration} S </span>
      </p>`;
    } else {
      clearInterval(powerInterval);
      powerUpsTimer = 30;
      startGlobalTimer();
      displayPowerUpsTimer();
    }
  }, 1000);
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
  
    takeBreak.setAttribute("data-restCount", restCount);
    stopGlobalTimer();
    resumeBtn.disabled = false
    takeBreak.disabled = true;
   
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

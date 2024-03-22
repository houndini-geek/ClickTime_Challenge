const openMenu = 
document.querySelector('.openMenu');

const menu = 
document.querySelector('.menu');

openMenu.addEventListener('click',() => {
  
  menu.classList.toggle('active')
})


const actionBtns = document.querySelectorAll(".game__state button");
const startGameBtn = document.querySelector(".startGameBtn");
const game__mission = document.querySelector(".in-game__mission");
const takeBreak = document.querySelector(".takeBreak");
const resumeBtn = document.querySelector(".resume");
const smart__bar = document.querySelector(".smart_bar");
const globalTimerTemplate = document.querySelector(".timer");
const gameBox = document.querySelector(".game__box");
const player_current_score = document.querySelector(".player__current__score");

const displayHightScore = document.querySelector('.displayHightScore')


const allPowerUpsIcons = 
document.querySelectorAll('.game__power__ups div');



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
let score__boost = false

const gamePowerUps = [
  {
    power: 'Time Freeze',
    duration: 8,
    id: 'abc123'
  },
  {
    power: 'Time Multiplier',
    duration: 5,
    id: 'def456'
  },
  {
    power: 'Score Boost',
    duration: 7,
    id: 'ghi789'
  },
  {
    power: 'Gravity Shift',
    duration: 10,
    id: 'jkl012'
  }
];
gameBox.style.pointerEvents = "none";
resumeBtn.disabled = true;
takeBreak.disabled = true;

displayScores()

function updateTimerDisplay() {
  globalTimerTemplate.innerHTML = ` <span>${globalSecond} S</span>`;
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
  }, 600);
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
  },1000);
}


function grantedRandomPowerUps() {
  //gamePowerUps
  const randomIndex = Math.floor(Math.random() * gamePowerUps.length);
 
  const randomPowerUps = gamePowerUps[randomIndex];

  let {power, duration, id} = randomPowerUps

  switch (power) {
    case "Time Freeze":
      timeFreezeFun(power,duration, id);
      break;
    case "Time Multiplier":
      timeMultiplierFun(power,duration, id);
      break;
    case "Score Boost":
      scoreBoostFun(power,duration, id);
      break 
    case "Gravity Shift":
      gravityShiftFun(power,duration, id);
      break;
    default :
    return
  }
 
}

function timeFreezeFun(powerName, duration, id) {
  
  actionBtns.forEach((btn) => (btn.disabled = true));
  clearInterval(globalInterval);
  clearInterval(powerUpsInterval);

  let powerDuration = duration;
  
  animePowerUpIcon(id,true)
  const powerInterval = setInterval(() => {
    if (powerDuration > 0) {
      powerDuration--;
      updateTimerDisplay()
      game__mission.innerHTML = `<p>
        ${powerName} : 
        <span> ${powerDuration} S </span>
      </p>`;
    } else {
      clearInterval(powerInterval);
      powerUpsTimer = 30;
      startGlobalTimer();
      displayPowerUpsTimer();
      animePowerUpIcon(id, false);
    }
  }, 1000);
}

function timeMultiplierFun(powerName, duration, id) {
  animePowerUpIcon(id,true)
  actionBtns.forEach((btn) => (btn.disabled = true));
  clearInterval(globalInterval);
  clearInterval(powerUpsInterval);

  let powerDuration = duration;

  const powerInterval = setInterval(() => {
      if (powerDuration > 0) {
          // Increase the global timer by 3 seconds every second
          globalSecond += 3;
          updateTimerDisplay(); // Update the timer display
          powerDuration--; // Decrement the power-up duration
          game__mission.innerHTML = `<p>
              ${powerName} : 
              <span> ${powerDuration} S </span>
          </p>`;
      } else {
          clearInterval(powerInterval);
          powerUpsTimer = 30;
          startGlobalTimer();
          displayPowerUpsTimer();
          animePowerUpIcon(id,false)
      }
  }, 1000);
}

function scoreBoostFun(powerName, duration,id) {
   animePowerUpIcon(id,true)
  actionBtns.forEach((btn) => (btn.disabled = true));
  clearInterval(powerUpsInterval);
  score__boost = true 

  const powerInterval = setInterval(() => {

    if (duration > 0) {
      duration--
      game__mission.innerHTML = `<p>
      ${powerName} : 
      <span> ${duration} S </span>
     </p>`;
    }else {
      score__boost = false
      clearInterval(powerInterval);
      powerUpsTimer = 30;
      displayPowerUpsTimer();
      actionBtns.forEach((btn) => (btn.disabled = false));
       animePowerUpIcon(id,false)
    }

  },1000)
}
function gravityShiftFun(powerName, duration,id) {
   animePowerUpIcon(id,true)
  // Add a class to the game box to trigger the floating effect
  gameBox.classList.add('gravityShift');
  clearInterval(powerUpsInterval);
  actionBtns.forEach((btn) => (btn.disabled = true));
  let powerInterval = setInterval(() => {

    if (duration > 0) {
      duration--
      game__mission.innerHTML = `<p>
      ${powerName} : 
      <span> ${duration} S </span>
     </p>`;
    }else {
      clearInterval(powerInterval);
      powerUpsTimer = 30;
      displayPowerUpsTimer();
      actionBtns.forEach((btn) => (btn.disabled = false));
      gameBox.classList.remove('gravityShift');
       animePowerUpIcon(id,false)
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
  alert('Oh no! Time\'s up! 🕒 But don\'t worry, you\'ll crush it next time! 💪 Let\'s reload and try again!');
  location.reload(true);
  
}



function handleBoxClick() {

  // Retrieve the saved high score from localStorage
  let savedHIScore = Number(localStorage.getItem('HIScore')) || 0;

  // Retrieve the saved score from localStorage
  let savedScore = Number(localStorage.getItem('Score')) || 0;


  if (score__boost) {
     playerScore+=2;
  if (playerScore % 50 === 0) {
    globalSecond += 10;
  }
  }else {
    score__boost = false
    playerScore++
    if (playerScore % 50 === 0) {
      globalSecond += 10;
    }
  }
  
  player_current_score.innerHTML = `Score: ${playerScore}`
  savePlayerScore(playerScore);
  
  
  if (playerScore % 20 === 0) {
    
    displayHightScore.innerHTML = `HI :${savedHIScore}`
  
    }
  
  
}


function savePlayerScore(score) {
  // Retrieve the saved high score from localStorage
  let savedHIScore = Number(localStorage.getItem('HIScore')) || 0;

  // Retrieve the saved score from localStorage
  let savedScore = Number(localStorage.getItem('Score')) || 0;

  // Update the high score if the current score is higher
  if (score > savedHIScore) {
        savedHIScore = score;
      localStorage.setItem('HIScore', savedHIScore);
    
  }

  // Always update the current score
  savedScore = score;
  localStorage.setItem('Score', savedScore);
  //displayScores()
}



function displayScores() {
  
    // Retrieve the saved high score from localStorage
  let savedHIScore = Number(localStorage.getItem('HIScore')) || 0;

  // Retrieve the saved score from localStorage
  let savedScore = Number(localStorage.getItem('Score')) || 0;


  
  displayHightScore.innerHTML = `HI :${savedHIScore}`
  
   
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




function animePowerUpIcon(id, state){
  
  allPowerUpsIcons.forEach((powerIcon,index) => {
  
  const powerIconId = 
  powerIcon.dataset.id
  
  powerIcon.classList.remove('active');
  
  if (powerIconId === id && state) {
    
    powerIcon.classList.add('active');
  }else {
    powerIcon.classList.remove('active');
  }
  
  
  });
  

  
  
}


gameBox.onclick = function () {
  if (isPlaying) {
    handleBoxClick();
  }
};

'use strict';

// variables and elements
const startBtn = document.querySelector('.button-start-game');
const restartBtn = document.querySelector('.button-restart');
const menu = document.querySelector('.game-menu');
const wrapper = document.querySelector('.wrapper');
const screen = document.querySelector('.game-screen');
const panels = document.querySelector('.game-panels');
const scoreEl = document.querySelector('.score-panel__score_num');
const levelEl = document.querySelector('.score-panel__level');
const timeYouEl = document.querySelector('.time-panel__you');
const timeGunmanEl = document.querySelector('.time-panel__gunman');

const gunman = document.querySelector('.gunman');
const gunmanWrap = document.querySelector('.gunman-wrap');

const message = document.querySelector('.message');

let canShoot = false;
let startTime;
let enemyTimeout;
let level = 1;
let enemyShootDelay = 1000;
let score = 0;
let timerInterval;

// audio sfx
const introSound = new Audio('../sfx/intro.m4a');
const waitSound = new Audio('../sfx/wait.m4a');
const fireSound = new Audio('../sfx/fire.m4a');
const shotSound = new Audio('../sfx/shot.m4a');
const winSound = new Audio('../sfx/win.m4a');
const deathSound = new Audio('../sfx/death.m4a');
const foulSound = new Audio('../sfx/foul.m4a');

// event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
gunman.addEventListener('click', playerShootsGunman);

// functions
function startGame() {
    menu.style.display = 'none';
    wrapper.style.display = 'block';
    screen.style.display = 'block';
    panels.style.display = 'block';

    introSound.play();

    moveGunman();
}

function exitGame() {
    location.reload();   
}

function restartRound() {
    canShoot = false;

    message.className = 'message';
    message.textContent = '';

    gunman.className = 'gunman';

    gunmanWrap.style.transition = 'none';

    restartBtn.style.display = 'none';

    timeYouEl.textContent = '0.00';
    timeGunmanEl.textContent = '0.00';
    clearInterval(timerInterval);

    moveGunman();
}

function restartGame() {
    canShoot = false;
    clearTimeout(enemyTimeout);

    level = 1;
    score = 0;
    enemyShootDelay = 1000;

    scoreEl.textContent = 0;
    levelEl.textContent = 'Level 1';

    message.className = 'message';
    message.textContent = '';

    gunman.className = 'gunman';
    gunmanWrap.style.transition = 'none';
    gunmanWrap.style.left = '900px';

    restartBtn.style.display = 'none';

    wrapper.style.display = 'none';
    screen.style.display = 'none';
    panels.style.display = 'none';

    menu.style.display = 'block';
}

function nextLevel() {

}

function setRandomCharacter() {
    const random = Math.floor(Math.random() * 5) + 1;

    gunman.className = 'gunman'; // reset
    gunman.classList.add(`char-${random}`);
}

function moveGunman() {
    setRandomCharacter();

    gunmanWrap.style.left = '900px';

    gunman.classList.add('walk');

    setTimeout(() => {
        gunmanWrap.style.transition = 'left 4s linear';
        gunmanWrap.style.left = '350px';

        setTimeout(() => {
            gunman.classList.remove('walk');
            gunman.classList.add('stand');

            waitSound.play();

            prepareForDuel();
        }, 4000);

    }, 1000);
}

function prepareForDuel() {
    const delay = Math.random() * 2000 + 1000;

    setTimeout(() => {
        message.classList.add('message--fire');
        fireSound.play();

        gunman.classList.remove('stand');
        gunman.classList.add('ready');

        canShoot = true;
        startTime = Date.now();

        timeCounter();

        gunmanShootsPlayer();
    }, delay);
}

function timeCounter() {
    timerInterval = setInterval(() => {
            if (!canShoot) return;

            const time = (Date.now() - startTime) / 1000;

            timeYouEl.textContent = time.toFixed(2);
        }, 10);
}

function gunmanShootsPlayer() {
    enemyTimeout = setTimeout(() => {
        if (canShoot) {
            timeGunmanEl.textContent = (enemyShootDelay / 1000).toFixed(2); // ||||||
            loseGame();
        }
    }, enemyShootDelay);
}

function playerShootsGunman() {
    if (!canShoot) {
        foulSound.play();
        return;
    }

    shotSound.currentTime = 0;
    shotSound.play();

    const reaction = Date.now() - startTime;

    clearTimeout(enemyTimeout);

    if (reaction < 1000) {
        winGame(reaction);
    } else {
        loseGame();
    }
}

function scoreCount() {
    const scoreText = document.querySelector('.win-screen__score');

    scoreText.textContent = `Your score: ${score}`;
}

function loseGame() {
    canShoot = false;

    deathSound.play();

    gunman.classList.remove('ready');
    gunman.classList.add('shoot');

    message.classList.remove('message--fire');
    message.classList.add('message--dead');
    message.textContent = 'YOU LOSE';
    clearInterval(timerInterval);

    restartBtn.style.display = 'block';
}

function winGame(reaction) {
    canShoot = false;

    winSound.play();

    gunman.classList.remove('ready');
    gunman.classList.add('death');

    message.classList.remove('message--fire');
    message.classList.add('message--win');
    message.textContent = 'YOU WIN';

    level++;
    enemyShootDelay -= 100;

    score += 10;

    scoreEl.textContent = score;
    levelEl.textContent = `Level ${level}`;

    console.log('Level:', level);

    clearInterval(timerInterval);

    if (level > 5) {
        endGame();
    }
    else {
        setTimeout(() => {
            restartRound();
        }, 2000);
    }
}

function endGame() {
    wrapper.style.display = 'none';

    scoreCount();

    document.querySelector('.win-screen').style.display = 'block';
}
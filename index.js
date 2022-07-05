'use strict';
// click rules pic
const toggleBtns = document.querySelectorAll('.openBtn, .closeBtn');
const rulesPic = document.querySelector('.rulesPic');
const overlay = document.querySelector('.overlay');

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener('click', () => {
    rulesPic.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
  });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !rulesPic.classList.contains('hidden')) {
    togglebtnRules();
  }
});

// start click icons
const circleBtn = document.querySelectorAll('.circleBtn');
const index = document.querySelector('.index');
const startGame = document.querySelector('.startGame');

const youPicked = document.querySelector('.youPicked');
const aiPicked = document.querySelector('.aiPicked');

const results = document.querySelector('.startGame-results');

const againHeader = document.querySelector('.startGame-playagain-header');

const resultsHeader = document.querySelector('.startGame-header');
const HeaderscoreNum = document.querySelector('.score');
let score = 0;

const winner = document.querySelector('.winner');

const gameTips = [
  { name: 'paper', beats: 'rock' },
  { name: 'scissors', beats: 'paper' },
  { name: 'rock', beats: 'scissors' },
];

const toggleMain = () => {
  index.classList.toggle('hidden');
  startGame.classList.toggle('hidden');
};

const displayYourIcon = (yourButton) => {
  const choicedIcon = yourButton.dataset.name;
  const yourIconIndex = gameTips.findIndex((item) => item.name === choicedIcon);
  const yourBeat = gameTips[yourIconIndex].beats;

  youPicked.innerHTML = `
<div class="circle ${choicedIcon} your-icon">
<img src="./images/icon-${choicedIcon}.svg" alt="" />
</div>`;

  resultContent(choicedIcon, aiChoice(), yourBeat);
};

//start game
circleBtn.forEach((yourButton) => {
  yourButton.addEventListener('click', () => {
    toggleMain();
    displayYourIcon(yourButton);
  });
});

const toggleResult = () => {
  startGame.classList.toggle('result');
  results.classList.toggle('hidden');
};
const aiChoice = () => {
  const aiIconNum = Math.trunc(Math.random() * gameTips.length);
  const aiIcon = gameTips[aiIconNum].name;

  setTimeout(() => {
    aiPicked.innerHTML = `<div class="circle ${aiIcon} house-icon">
  <img src="./images/icon-${aiIcon}.svg" alt="" />
</div>`;
  }, 500);

  return aiIcon;
};

const displayScore = (scoreNum) => {
  score += scoreNum;
  HeaderscoreNum.innerText = score;
};

const resultContent = (choicedIcon, aiIcon, yourIconBeat) => {
  setTimeout(() => {
    if (choicedIcon === aiIcon) {
      againHeader.innerText = 'draw';
    } else if (yourIconBeat === aiIcon) {
      againHeader.innerText = 'you win';
      displayScore(1);
      toggleTitleWinner(youPicked);
    } else {
      againHeader.innerText = 'you lose';
      displayScore(-1);
      toggleTitleWinner(aiPicked);
    }
    toggleResult();
  }, 900);
};

const toggleTitleWinner = (who) => {
  who.classList.add('winner');
};

//click play again
const playAgain = document.querySelector('.playAgainbtn');
const startGameIcon = document.querySelectorAll('.startGame-icon');
playAgain.addEventListener('click', () => {
  toggleResult();
  toggleMain();
  startGameIcon.forEach((element) => {
    element.classList.remove('winner');
    element.innerHTML = '';
  });
});

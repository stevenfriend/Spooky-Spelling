'use strict'

const maxScore = 6;
const time = {};
const animate = { drawing: false, start: 0, total: 1000 }
const words = ['apple', 'Frankenstein', 'ghost', `jack-o'-lantern`, 'king', 'lightning', 'mummy', 'queen', 'robot', 'spider', 'vampire', 'witch', 'x-ray', 'zombie'];
const blanks = ['_____', '____________', '_____', `____-_'-_______`, '____', '_________', '_____', '_____', '_____', '______', '_______', '_____', '_-___', '______'];
const cards = [];
const players = [];
let index = 0;
let frame, sync, word, canvas, ctx, picture, picked, scoreboard, score;

window.addEventListener('load', init);

function init() {
  getElemnts();
  addListeners()
  getCards();
  pickCard();
  for (let i=0; i < 6; i++) {
    addPlayer();
    players[i].resize();
    players[i].draw();
  }
  time.diff = 0;
  main();
}

function getElemnts() {
  frame = document.getElementById('frame');
  sync = document.getElementById('sync');
  picked = document.getElementById('picked');
  word = document.getElementById('word');
  scoreboard = document.getElementById('scoreboard');
  score = document.getElementById('score');
}

function addListeners() {
  window.addEventListener('resize', resize);
  sync.addEventListener('click', pickCard);
  score.addEventListener('click', scorePlayers);
}

function getCards() {
  for (let i = 0; i < words.length; i++) {
    const obj = {};
    const img = new Image();
    obj.word = words[i];
    obj.blanks = blanks[i];
    img.src = `images/${words[i]}.jpg`
    img.alt= 'halloween card';
    obj.img = img;
    cards.push(obj);
  }
}

function addPlayer() {
  const player = new Player(scoreboard, maxScore)
  players.push(player);
}

function pickCard() {
  index = random(1, words.length-1);
  if (frame.firstChild) frame.firstChild.replaceWith(cards[index].img);
  else frame.appendChild(cards[index].img);
  frame.firstChild.className = 'picture';
  word.innerText = cards[index].blanks;
  picked.innerText = '';
}

function resize() {
  for (let player of players) {
    player.resize();
    player.draw();
  }
}

function main(now) {
  requestAnimationFrame(main);
}

function handleKey(e) {
  if (e.code == 'Space') {
    state = 'picking';
    if (score < maxScore) {
      ++score;
      animate.drawing = true; 
    }
    else score = 0;
  }
}

function scorePlayers() {
  const w = cards[index].word;
  for (let player of players) {
    let score = 0;
    let correct = false;
    const guess = player.getLetter().toLowerCase();
    for (let i = 0; i < w.length; i++) {
      const letter = w[i].toLowerCase();
      if (letter == guess) {
        ++score;
        correct = true;
        const copy = word.innerText;
        const newString= `${copy.substr(0, i)}${w[i]}${copy.substr(i+1)}`;
        word.innerText = newString;
      }
    }
    if (!correct) {
      if (!picked.innerText.includes(guess)) picked.innerText += guess;
    }
    player.clearLetter();
    player.givePoints(score);
    player.draw();
  }
}

function random(min, max) {
  let pick = -1;
  do {
    pick = Math.floor((Math.random() * ((max+1) - min)) + min); 
  } while (pick == index)
  return pick;
}
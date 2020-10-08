'use strict'

class Player {
  constructor(parent, maxScore) {
    this.parent = parent;
    this.player = document.createElement('div');
    this.player.className = 'player';
    this.name = document.createElement('input');
    this.name.type = 'text';
    this.name.className = 'name';
    this.letter = document.createElement('input');
    this.letter.type = 'text';
    this.letter.className = 'letter';
    this.bar = document.createElement('canvas')
    this.bar.className = 'bar';
    this.bar.innerText = 'Your browser does not support canvas';
    this.ctx = this.bar.getContext('2d');
    this.player.appendChild(this.name);
    this.player.appendChild(this.letter);
    this.player.appendChild(this.bar);
    this.score = 0;
    this.maxScore = maxScore;
    parent.appendChild(this.player);
  }

  resize() {
    this.bar.width = this.parent.getBoundingClientRect().width * .5;
    this.bar.height = this.parent.getBoundingClientRect().height;
  }

  getLetter() {
    return this.letter.value;
  }

  clearLetter() {
    this.letter.value = '';
  }

  getScore() {
    return this.score;
  }

  givePoints(points) {
    this.score += points;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.bar.width, this.bar.height);
    this.ctx.save();
    this.drawScore();
    this.drawBoxes();
    this.ctx.restore();
  }
  
  drawScore() {
    const width = this.bar.width / this.maxScore;
    this.ctx.fillStyle = 'rgb(3, 160, 3)';
    this.ctx.fillRect(0, 0, this.score * width, this.bar.height);
  }
  
  drawBoxes() {
    const width = this.bar.width / this.maxScore;
    let startX = 0;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rebeccapurple';
    for (let i = 0; i < this.maxScore; i++) {
      this.ctx.strokeRect(startX, 0, startX + width, this.bar.height);
      startX += width;
    }
  }
}
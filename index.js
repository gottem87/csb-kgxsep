const gameBoard = document.querySelector("#game-board");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#Score");
const resetBtn = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardColor = "black";
const snakeColor = "green";
const foodColor = "red";
const unitSize = 10;
let running = false;
let xVel = unitSize;
let yVel = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 }
];
window.addEventListener("keydown", changeDir);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clear();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 150);
  } else {
    dispGameOver();
  }
}
function clear() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randFood(0, gameWidth - unitSize);
  foodY = randFood(0, gameWidth - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = {
    x: snake[0].x + xVel,
    y: snake[0].y + yVel
  };

  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function changeDir(event) {
  const keyPressed = event.keyCode;
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;

  const goingUp = yVel == -unitSize;
  const goingDown = yVel == unitSize;
  const goingRight = xVel == unitSize;
  const goingLeft = xVel == -unitSize;

  switch (true) {
    case keyPressed == left && !goingRight:
      xVel = -unitSize;
      yVel = 0;
      break;
    case keyPressed == up && !goingDown:
      yVel = -unitSize;
      xVel = 0;
      break;
    case keyPressed == right && !goingLeft:
      xVel = unitSize;
      yVel = 0;
      break;
    case keyPressed == down && !goingUp:
      yVel = unitSize;
      xVel = 0;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0 || snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0 || snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function dispGameOver() {
  ctx.font = "55px MV Boli";
  ctx.fontStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  xVel = unitSize;
  yVel = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 }
  ];
  gameStart();
}

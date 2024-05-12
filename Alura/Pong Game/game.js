// ================ V.A.R.I.Á.V.E.I.S ================ //
// Bolinha
let ballX;
let ballY;
let ballSpeedX = 6
let ballSpeedY = 6
let ballSize = 20;
let radiusBall = 20;

// Raquete
const paddleWidth = 15;
const paddleHeight = 100;
let paddle1Y;
let paddle2Y;
let paddle2Speed;
let paddleSpeed = 10;
let errorProbability = 0; 

// Jogador
let player1Score = 0;
let player2Score = 0;

// Game Padrao
let gameState = "menu";
let strokeColor = "#F2EAEA"
let paddleColor = "#050505";

// ========= F.U.N.Ç.Õ.E.S _ I.N.I.C.I.A.L.I.Z.A.Ç.Ã.O ========= //
function setup() {
  createCanvas(600, 400);
  paddle1Y = height / 2 - paddleHeight / 2;
  paddle2Y = height / 2 - paddleHeight / 2;
  ballX = width / 2;
  ballY = height / 2;
  fill(255);
  textSize(16); 
  textAlign(RIGHT, TOP); 
  playMusic();
}

function draw() {
  if (gameState === "singleplayer" || gameState === "multiplayer"){
  image(setBackground, 0, 0, width, height);
  drawBall();
  drawScores();
  drawPaddles();
  movePaddleIA();
  movePaddle();
  moveBall();
  colissionWalls();
  colissionPaddles();
  addScore(); 
  }
  else if(gameState ==="menu"){
    showMenu();
  }
  else if(gameState === "configure"){
    gameConfig();
  }
  else if(gameState === "chooseTheme"){
    chooseTheme();
  }
  playMusic();
}

// ========= F.U.N.Ç.Õ.E.S _ V.I.S.U.A.L.I.Z.A.Ç.Ã.O ========= //
function drawPaddles() {
  fill(paddleColor);
  stroke(strokeColor);
  strokeWeight(2); 
  rect(0, paddle1Y, paddleWidth, paddleHeight, 20);
  rect(width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 20);
  noStroke(); 
}

function drawBall() {
  fill('#F1F1F1');
  stroke(0); 
  strokeWeight(1);
  ellipse(ballX, ballY, ballSize, ballSize);
  noStroke(); 
}

function drawScores() {
  fill('#000000');
  stroke(255)
  strokeWeight(2); 
  rect(130, 20, 50, 30, 10)
  rect(440, 20, 50, 30, 10)
  noStroke(); 

  fill('#F7F0F0');
  textSize(20);
  text("" + player1Score, 155, 35);
  text("" + player2Score, width - 135, 35);
}

// ========= F.U.N.Ç.Õ.E.S _ M.O.V.I.M.E.N.T.O ========= //
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function calcError() {
  if (player2Score > player1Score) {
    errorProbability = 53;
  } 
  else if (player1Score >= player2Score) {
    errorProbability = 10
  }   
}

function movePaddleIA() {
  if (gameState === "singleplayer") {
    paddleSpeed2Y = ballY - paddle2Y - paddleWidth / 2 - 50;
    paddle2Y = constrain(paddle2Y + paddleSpeed2Y + errorProbability, 0, height - paddleHeight); 
    calcError();
  }
  
  if (gameState === "multiplayer") {
    if (keyIsDown(87)) {
      paddle2Y -= paddleSpeed;
    }
    if (keyIsDown(83)) {
      paddle2Y += paddleSpeed;
    }
    paddle2Y = constrain(paddle2Y, 0, height - paddleHeight);
  }
}

function movePaddle() {
  if (keyIsDown(UP_ARROW)) {
    paddle1Y = constrain(paddle1Y - paddleSpeed, 0, height - paddleHeight); // Limita o movimento para cima
  }
  if (keyIsDown(DOWN_ARROW)) {
    paddle1Y = constrain(paddle1Y + paddleSpeed, 0, height - paddleHeight); // Limita o movimento para baixo
  }
}

function mouseMoved() {
  paddle1Y = mouseY - paddleHeight / 2;
  paddle1Y = constrain(paddle1Y, 0, height - paddleHeight);
}

// ========= F.U.N.Ç.Õ.E.S _ C.O.L.I.S.Ã.O ========= //
function colissionWalls() {
  if (ballY < 0 || ballY > height) {
    ballSpeedY = -ballSpeedY;
  }
}

function colissionPaddles() {
  if (ballX - ballSize / 2 < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX; 
    ballX = paddleWidth + ballSize / 2;
    ballSpeedX += 0.5;
    ballSpeedY += 0.5;
    raquetada.play(); 
  }
  
  if (ballX + ballSize / 2 > width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballX = width - paddleWidth - ballSize / 2;
    ballSpeedX -= 0.5;
    ballSpeedY -= 0.5;
    raquetada.play(); 
  }
}

// ========= F.U.N.Ç.Õ.E.S _ P.L.A.C.A.R ========= //
function addScore() {
  if (ballX < 0) {
    player2Score++;
    resetBall();
    ponto.play();

  }
  if (ballX > width) {
    player1Score++;
    resetBall();
    ponto.play();
  }
}

// ========= O.U.T.R.A.S _ F.U.N.Ç.Õ.E.S ========= //
function resetBall() {
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = 6 * (random() > 0.5 ? 1 : -1);
  ballSpeedY = 6 * (random() > 0.5 ? 1 : -1);
}

function resetGame() {
  ballX = width / 2;
  ballY = height / 2;
  paddle1Y = height / 2 - paddleHeight / 2;
  paddle2Y = height / 2 - paddleHeight / 2;
  player1Score = 0;
  player2Score = 0;
  gameState = gameStateInfo.gameState;
}

function restartGame(){
  ballX = width / 2;
  ballY = height / 2;
  paddle1Y = height / 2 - paddleHeight / 2;
  paddle2Y = height / 2 - paddleHeight / 2;
  player1Score = 0;
  player2Score = 0;
}

function keyPressed() {
  if (gameState === "menu" || gameState === "configure"  || gameState === "chooseTheme" ) {
    if (keyCode === UP_ARROW) {
      navigateUp();
    } else if (keyCode === DOWN_ARROW) {
      navigateDown();
    } else if (keyCode === ENTER) {
      executeSelectedOption();
    }  
  }
  else if (gameState === "paused") {
    if (keyCode === ENTER){
      continueGame();
    }
    else if (keyCode === ESCAPE){
      showMenu();
    }
    else if (keyCode === 82){
      resetGame();
    } 
  }
  else{
    if (keyCode === 32){
      pauseGame()
    }
  }
}
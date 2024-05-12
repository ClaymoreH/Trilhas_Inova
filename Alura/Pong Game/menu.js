// ================ V.A.R.I.Á.V.E.I.S ================ //
let backgroundMenu;
let background1;
let background2;
let background3;
let setBackground;
let ponto;
let raquetada;
let trilha;
let trilhaMenu;
let selectedOption = 0;


function preload() {
  backgroundMenu = loadImage("Imagens/Menu.png");
  background1 = loadImage("Imagens/Default.png");
  background2 = loadImage("Imagens/Orange.png");
  background3 = loadImage("Imagens/Classic-1.png");
  background4 = loadImage("Imagens/Config.png");
  background5 = loadImage("Imagens/temas.png");
  setBackground = background1;

  trilha = loadSound("Sons/trilha.mp3");
  raquetada = loadSound("Sons/raquetada.mp3");
  ponto = loadSound("Sons/ponto.mp3");
  trilhaMenu = loadSound("Sons/Masquerade - Luna Cantina.mp3")
}

// ========= F.U.N.Ç.Õ.E.S _ N.A.V.E.G.A.Ç.Â.O ========= //
let menuOptions = [
  { 
    state: "menu", 
    options: ["Iniciar Jogo", "Multiplayer", "Configurações"], 
    actions: [
      function() { gameState = "singleplayer"; },
      function() { gameState = "multiplayer"; }, 
      function() { gameConfig(); } 
    ]
  },
  
  { 
    state: "configure", 
    options: ["Escolher Tema", "Voltar ao menu"], 
    actions: [
      function() { chooseTheme(); },
      function() { showMenu(); }   
    ]
  },
  
  { 
    state: "chooseTheme", 
    options: ["Escolher Tema 1", "Escolher Tema 2", "Escolher Tema 3", "Voltar"], 
    actions: [
      function() { setBackground = background1; paddleColor = "#030303"; strokeColor = "#F8F7F7";},
      function() { setBackground = background2; paddleColor = "#050505"; strokeColor = "#F2ECEC";},
      function() { setBackground = background3; paddleColor = "#EFF3F0"; strokeColor = "#030303";},
      function() { gameConfig(); }    
    ]
  }
];

function executeSelectedOption() {
  let options = menuOptions.find(option => option.state === gameState);
  if (options) {
    let action = options.actions[selectedOption];
    if (action) {
      action();
    }
  }
}

function navigateUp() {
  selectedOption--;
  if (selectedOption < 0) {
    selectedOption = menuOptions.find(option => option.state === gameState).options.length - 1;
  }
}

function navigateDown() {
  selectedOption++;
  let optionsLength = menuOptions.find(option => option.state === gameState).options.length;
  if (selectedOption >= optionsLength) {
    selectedOption = 0;
  } 
}

function showMenu() {
  gameState = "menu"; 
  restartGame();
  background(backgroundMenu); 
  let options = menuOptions.find(option => option.state === "menu").options; // 

    for (let i = 0; i < options.length; i++) {
      if (i === selectedOption) {
        textStyles(true);    
      } 
      else {
        textStyles(false);
      }
      text(options[i], width / 2 + 5, height / 2 + 17+ i * 73);
  }
}

function gameConfig() {
  gameState = "configure"; 
  background(background4);
  let options = menuOptions.find(option => option.state === "configure").options; 
  
  for (let i = 0; i < options.length; i++) {
    if (i === selectedOption) {
      textStyles(true);    
    } 
    else {
      textStyles(false);    
    }
    text(options[i], width / 2, height / 2 + 25 + i * 75);
  }
}

// ========= F.U.N.Ç.Õ.E.S _ P.A.U.S.E ========= //
function pauseGame() {
  gameStateInfo = {
    gameState: gameState,
    ballX: ballX,
    ballY: ballY,
    ballSpeedX: ballSpeedX,
    ballSpeedY: ballSpeedY,
    paddle1Y: paddle1Y,
    paddle2Y: paddle2Y,
    player1Score: player1Score,
    player2Score: player2Score,
  };

  gameState = "paused";
  background(0, 100);
  
  stroke("#0B0B0B");
  strokeWeight(1);
  
  fill(255);
  textFont('Audiowide', 35);
  textAlign(CENTER, CENTER);
  text("JOGO PAUSADO", width / 2, height / 2 - 70);
  
  fill(255);
  textSize(17);
  text("Pressione 'ENTER' para continuar", width / 2, height / 2);
  text("Pressione 'R' para resetar partida", width / 2, height / 2 + 50);
  text("Pressione 'ESC' para retornar ao menu", width / 2, height / 2 + 100);
}

function continueGame() {
  gameState = gameStateInfo.gameState;
  ballX = gameStateInfo.ballX;
  ballY = gameStateInfo.ballY;
  ballSpeedX = gameStateInfo.ballSpeedX;
  ballSpeedY = gameStateInfo.ballSpeedY;
  paddle1Y = gameStateInfo.paddle1Y;
  paddle2Y = gameStateInfo.paddle2Y;
  player1Score = gameStateInfo.player1Score;
  player2Score = gameStateInfo.player2Score;
}


// ========= F.U.N.Ç.Õ.E.S _ P.E.R.S.O.N.A.L.I.Z.A.Ç.Â.O ========= //

function chooseTheme() {
  background(background5);
  gameState = "chooseTheme";
  drawSelectedThemeImage();

  let options = menuOptions.find(option => option.state === "chooseTheme").options;

  for (let i = 0; i < options.length; i++) {
    if (i === selectedOption) {
      textStyles(true);    
    } 
    else {
      textStyles(false);    

    }
    text(options[i], width / 2 + 195, height / 2 - 25 + i * 47);
  }
}

function drawSelectedThemeImage() {
  if (gameState === "chooseTheme") {
    if (selectedOption === 0) {
      image(background1, 25, 135, 305, 210); 
    } 
    else if (selectedOption === 1) {
      image(background2, 25, 135, 305, 210); 
    } 
    else if (selectedOption === 2) {
      image(background3, 25, 135, 305, 210); 
    }
  }
}

function textStyles(isX){
  textFont('Audiowide');
  textAlign(CENTER, CENTER);
  if (isX) {
    fill("#FFFEFFD6"); 
    stroke("#0B0B0B");
    strokeWeight(1);
    textSize(22)      
  } 
  else {
    fill("#2A272AD6");
    textSize(20)
  }
}

function playMusic() {
  if (gameState === "singleplayer" || gameState === "multiplayer") {
    if (!trilha.isPlaying()) {
      trilha.loop();
    }
  } 
  else {
    trilha.stop();
  }
  if (gameState === "menu" || gameState === "configure" || gameState === "chooseTheme") {
    if (!trilhaMenu.isPlaying()) {
      trilhaMenu.loop(); 
    }
  } 
  else {
    trilhaMenu.stop(); 
  }
}

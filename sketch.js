// const socket = io('https://192.168.178.28:5000')



let screen;

let font8Bit;

let keys = [];
let mouseIsClicked;
let mouseClickable = true;

let state = 'HomeScreen';
let score;

let speedMultiplier = 1.0;
const speedMultiplierIncrease = 0.025;
const speedMultiplierMax = 2.5;

let player;

let bulletCount = 40; // per 1000px width
let bullets = [];

let currentColorTheme = 0;
let colorThemes;

function preload() {
  font8Bit = loadFont('Assets/Fonts/8BitMadness.ttf');

  colorThemes = [
    {
      player : color(25, 155, 230),
      bullets : color(230, 170, 30),
      background : color(50, 50, 50)
    },
    {
      player : color(230, 25, 80),
      bullets : color(25, 230, 190),
      background : color(50, 50, 50)
    }
  ]
}

let nameInput;
let scoreSubmitButton;


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noSmooth();

  if(windowWidth < windowHeight) state = 'SwitchToLandscape';

  let sWidth = 1920;
  let sHeight = int(sWidth * (height / width));
  screen = createGraphics(sWidth, sHeight);
}

function draw() {
  background(colorThemes[currentColorTheme].background);
  screen.background(colorThemes[currentColorTheme].background);

  switch(state) {
    case 'Ingame':
      gameScreen();
      image(screen, 0, 0, width, height)
      break;
    case 'GameOver':
      gameOverScreen();
      break;
    case 'HomeScreen':
      homeScreen();
      break;
    case 'SwitchToLandscape':
      textFont(font8Bit, adjustSize(150));
      textAlign(CENTER, CENTER);
      text(`SWITCH TO LANDSCAPE MODE`, width/2, height/2);
      break;
  }


  if(mouseIsClicked) mouseIsClicked = false; // reseting mouseIsClicked
}


// == states ====================================


function gameScreen() {
  player.move();
  player.display();

  if(player.isMoving) speedMultiplier += speedMultiplierIncrease * (speedMultiplierMax - speedMultiplier);
  else speedMultiplier = 1.0;

  for(let i = 0; i < bullets.length; i++) {
    bullets[i].display();
  }

  collision();

  screen.textFont(font8Bit, 50);
  screen.textAlign(LEFT, TOP);
  screen.text(`score: ${score}`, 10, 10);
}

function gameOverScreen() {
  let buttonColor = colorThemes[currentColorTheme].bullets;

  button(width/2, height/2 - 75, 700, 100, (pressed, touching, clicked) => { if(pressed) { restart(); nameInput.remove(); scoreSubmitButton.remove() } }, 'RECT', true, color(0, 0, 255), 3, color(0, 0, 0), 'RESTART', font8Bit, buttonColor);
  button(width/2, height/2 + 75, 400, 100, (pressed, touching, clicked) => { if(pressed) { state = 'HomeScreen'; nameInput.remove(); scoreSubmitButton.remove() } }, 'RECT', true, color(0, 0, 255), 3, color(0, 0, 0), 'BACK', font8Bit, buttonColor);

  textSize(80);
  text(`score: ${score}`, width/2, height/2 - 300)
}

function homeScreen() {
  let buttonColor = colorThemes[currentColorTheme].player;


  button(width/2, height/2 - 50, 800, 200, (pressed, touching, clicked) => { if(pressed) restart() }, 'RECT', true, color(0, 0, 255), 3, color(0, 0, 0), 'PLAY', font8Bit, buttonColor, 1, color(0, 0, 0));
  button(width/6, height/2 - 50, 500, 75, (pressed, touching, clicked) => {

    if(clicked) currentColorTheme += 1
    if(currentColorTheme > colorThemes.length - 1) currentColorTheme = 0;
  
  }, 'RECT', true, color(0, 0, 255), 3, color(0, 0, 0), `THEME: ${currentColorTheme + 1}`, font8Bit, buttonColor, 1, color(0, 0, 0));
}


//== functions ==================================


function collision() {
  for(let i = 0; i < bullets.length; i++) {
    let d = dist(player.x, player.y, bullets[i].x, bullets[i].y);
    if(d < player.size/2 + bullets[i].size/2) {
      state = 'GameOver';

      nameInput = createInput('').position(width/2 - 50, height/2 + 200).size(100);
      scoreSubmitButton = createButton('submit score').position(width/2 - 50, height/2 + 250).size(100).mousePressed(() => {
        if(!nameInput.value()) return print('you need to choose a name');

        // socket.emit('submit score', nameInput.value(), score, (submittedName, submittedScore) => { print(`succesfully submitted ${submittedScore} points with the name ${submittedName}`) });
        scoreSubmitButton.hide();
      });
    }
  }
}

function restart() {
  score = 0;

  player = new Player(screen.width/2, screen.height-100, 40, 7, colorThemes[currentColorTheme].player);

  declareBulltes();

  state = 'Ingame'
}

function declareBulltes() {
  for(let i = 0; i < ((bulletCount / 1000) * screen.width); i++) {
    bullets[i] = new Bullet(random(100), colorThemes[currentColorTheme].bullets);
  }
}


// == helper functions ==========================


function adjustSize(size) {
  return (size / 1920) * width;
}


// == register pressed keys =====================


function keyPressed() {
  keys[key] = true;
}

function keyReleased() {
  keys[key] = false;
}


function mousePressed() {
  if(mouseClickable) mouseIsClicked = true; mouseClickable = false;
}

function mouseReleased() {
  mouseClickable = true;
}
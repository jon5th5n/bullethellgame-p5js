const socket = io('http://192.168.178.69:5000')



let screen;

let font8Bit;

let keys = [];

let state = 'HomeScreen';
let score;

let player;

let bulletCount = 40; // per 1000px width
let bullets = [];

function preload() {
  font8Bit = loadFont('Assets/Fonts/8BitMadness.ttf');
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
  background(50);
  screen.background(50);

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
}


// == states ====================================


function gameScreen() {
  player.move();
  player.display();

  for(let i = 0; i < bullets.length; i++) {
    bullets[i].display();
  }

  collision();

  screen.textFont(font8Bit, 50);
  screen.textAlign(LEFT, TOP);
  screen.text(`score: ${score}`, 10, 10);
}

function gameOverScreen() {
  button(width/2, height/2 - 75, 700, 100, (pressed, touching) => { if(pressed) { restart(); nameInput.remove(); scoreSubmitButton.remove() } }, 'RECT', true, color(0, 0, 255), 3, color(0, 0, 0), 'RESTART', font8Bit, color(255, 255, 255));
  button(width/2, height/2 + 75, 400, 100, (pressed, touching) => { if(pressed) { state = 'HomeScreen'; nameInput.remove(); scoreSubmitButton.remove() } }, 'RECT', true, color(0, 0, 255), 3, color(0, 0, 0), 'BACK', font8Bit, color(255, 255, 255));

  textSize(80);
  text(`score: ${score}`, width/2, height/2 - 300)
}

function homeScreen() {
  button(width/2, height/2 - 50, 800, 200, (pressed, touching) => { if(pressed) restart() }, 'RECT', true, color(0, 0, 255), 3, color(0, 0, 0), 'PLAY', font8Bit, color(66, 179, 245), 1, color(0, 0, 0));
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

        socket.emit('submit score', nameInput.value(), score, (submittedName, submittedScore) => { print(`succesfully submitted ${submittedScore} points with the name ${submittedName}`) });
        scoreSubmitButton.hide();
      });
    }
  }
}

function restart() {
  score = 0;

  player = new Player(screen.width/2, screen.height-100, 40, 7);

  declareBulltes();

  state = 'Ingame'
}

function declareBulltes() {
  for(let i = 0; i < ((bulletCount / 1000) * screen.width); i++) {
    bullets[i] = new Bullet(random(100));
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
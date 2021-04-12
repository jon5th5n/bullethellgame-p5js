// == todot ===> make it one size for every screen


let screen;

let font;

let keys = [];

let state = 'Ingame';
let score;

let player;

let bulletCount = 40; // per 1000px width
let bullets = [];

function preload() {
  font = loadFont('Assets/Fonts/8BitMadness.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noSmooth();

  if(windowWidth < windowHeight) state = 'SwitchToLandscape';

  let sWidth = 1920;
  let sHeight = int(sWidth * (height / width));
  screen = createGraphics(sWidth, sHeight);

  restart();
}

function draw() {
  background(50);
  screen.background(50);

  switch(state) {
    case 'Ingame':
      gameScreen();
      image(screen, 0, 0, width, height)
      break;
    case 'SwitchToLandscape':
      textFont(font, adjustSize(150));
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

  screen.textFont(font, 50);
  screen.textAlign(LEFT, TOP);
  screen.text(`score: ${score}`, 10, 10);
}


//== functions ==================================


function collision() {
  for(let i = 0; i < bullets.length; i++) {
    let d = dist(player.x, player.y, bullets[i].x, bullets[i].y);
    if(d < player.size/2 + bullets[i].size/2) restart();
  }
}

function restart() {
  score = 0;

  player = new Player(screen.width/2, screen.height-100, 40, 7)

  declareBulltes();
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

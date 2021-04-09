let player;

let bulletCount = 70;
let bullets = []

let state = 'Ingame';
let keys = [];

let score = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);

  restart();
}

function draw() {
  background(50);

  update();
}


//== functions ==================================


function update() {
  player.move();
  player.display();

  for(let i = 0; i < bullets.length; i++) {
    bullets[i].display();
  }

  collision();
}

function collision() {
  for(let i = 0; i < bullets.length; i++) {
    let d = dist(player.x, player.y, bullets[i].x, bullets[i].y);
    if(d < player.size/2 + bullets[i].size/2) restart();
  }
}

function restart() {
  player = new Player(width/2, height-100, 40, 7)

  declareBulltes();
}

function declareBulltes() {
  for(let i = 0; i < bulletCount; i++) {
    bullets[i] = new Bullet(random(100));
  }
}


// register pressed keys ========================


function keyPressed() {
  keys[key] = true;
}

function keyReleased() {
  keys[key] = false;
}

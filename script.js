
let player;
let bgImg;
let enemyImg;
let bulletImg;
let lives = 4;
let gameOver = false;
let enemies = [];
let bullets = [];
let leftKeyPressed = false;
let rightKeyPressed = false;
let spaceKeyPressed = false;
let lastBulletTime = 0; 
const bulletCooldown = 500;
function preload() {
  bgImg = loadImage('ЛЮТИЙ ЛЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕС.jpeg');
  enemyImg = loadImage('Без імені.png');
  bulletImg = loadImage('bullet.png');
}

function setup() {
  createCanvas(800, 600);
  player = new Player();
}

function draw() {
  background(bgImg);

  if (!gameOver) {
    player.update();
    player.show();
    player.shoot();

    fill(255);
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text("Управління:", 1, height - 50);
    text("-Для переміщення використовуйте клавіші зі стрілками", 1, height - 30);
    text("-Натисніть пробіл, щоб стріляти", 1, height - 10);

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].show();
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (bullets[i].hits(enemies[j])) {
          enemies.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].update();
      enemies[i].show();
      if (player.hits(enemies[i])) {
        lives--;
        if (lives <= 0) {
          gameOver = true;
          break;
        }
        enemies.splice(i, 1);
      }
    }

    if (enemies.length < 5) {
      enemies.push(new Enemy());
    }

    fill(255);
    textSize(20);
    text("Lives: " + lives, 10, 30);
  } else {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text("Press Enter to restart", width / 2, height / 2 + 40);
  }
}


function keyPressed() {
  if (!gameOver) {
    if (keyCode === UP_ARROW) {
      player.jump();
    } else if (keyCode === LEFT_ARROW) {
      leftKeyPressed = true;
    } else if (keyCode === RIGHT_ARROW) {
      rightKeyPressed = true;
    } else if (keyCode === 32) {
      spaceKeyPressed = true;
    }
  } else {
    if (keyCode === ENTER) {
      restartGame();
    }
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    leftKeyPressed = false;
  } else if (keyCode === RIGHT_ARROW) {
    rightKeyPressed = false;
  } else if (keyCode === 32) {
    spaceKeyPressed = false;
  }
}

function restartGame() {
  lives = 4;
  gameOver = false;
  player.pos = createVector(width / 2, height - 50);
  enemies = [];
}

class Player {
  constructor() {
    this.pos = createVector(width / 2, height - 50);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0.3);
    this.speed = 5;
  }

  jump() {
    this.vel.y = -10;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (this.pos.y > height - 50) {
      this.pos.y = height - 50;
      this.vel.y = 0;
    }

    if (leftKeyPressed) {
      this.pos.x -= this.speed;
    }

    if (rightKeyPressed) {
      this.pos.x += this.speed;
    }

    this.pos.x = constrain(this.pos.x, 0, width);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 50, 50);
  }

  shoot() {
    if (spaceKeyPressed && millis() - lastBulletTime > bulletCooldown) {
      
      bullets.push(new Bullet(this.pos.x, this.pos.y));
      lastBulletTime = millis(); 
    }
  }

  hits(enemy) {
    let d = dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);
    return d < 50;
  }

}

class Enemy {
  constructor() {
    this.pos = createVector(random(width), random(-500, -50));
    this.vel = createVector(0, random(1, 3));
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.y > height + 50) {
      this.pos.y = random(-500, -50);
      this.pos.x = random(width);
    }
  }

  show() {
    image(enemyImg, this.pos.x, this.pos.y, 50, 50);
  }
}

class Bullet {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -5);
    this.size = 20; 
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.y < 0) {
      bullets.splice(bullets.indexOf(this), 1);
    }
  }

  show() {
    image(bulletImg, this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size); 
  }

  hits(enemy) {
    let d = dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);
    return d < 25; 
  }
}

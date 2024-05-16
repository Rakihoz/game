let x = 200; 
let y = 300; 
let vx = 0; 
let vy = 0; 
let health = 3; // Здоровье шарика

let img;
let enemyImg; // Изображение врага
let enemies = [1]; // Массив врагов
let platformY; // Y position of the platform
let platformWidth = 200; // Width of the platform
let gameStarted = false; // Добавлено: состояние игры

function preload() {
  img = loadImage('ЛЮТИЙ ЛЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕС.jpeg');
   enemyImg = loadImage('pistol-2132.png'); // Загрузка изображения врага
}

function setup() {
  createCanvas(626,417);
  image(enemyImg, 100, 100, 50, 50);
  platformY = height / 2; // Set the platform to be in the center of the map

  // Создание врагов
  for (let i = 0; i < 5; i++) {
    enemies[i] = { x: random(width), y: random(height), img: enemyImg, alive: true };
  }
}

function draw() {
  if (gameStarted) {
    image(img, 0, 0);
    fill(255, 0, 0);
    ellipse(x, y, 40, 40); 

    vx *= 0.95; // Уменьшен коэффициент трения
    vy += 0.1; 
    x += vx;
    y += vy;

    // Draw the platform
    rect((width - platformWidth) / 2, platformY, platformWidth, 10);

    // Check if the ball is touching the platform
    if (keyCode !== DOWN_ARROW) {
      if (y + 20 >= platformY && y - 20 <= platformY + 10 && x > (width - platformWidth) / 2 && x < (width + platformWidth) / 2) {
        vy = 0;
        y = platformY - 20; // Keep the ball on the platform
      }
    }

    if (y > height-20) {
      y = height-20;  
    }
    if (x < 20 || x > width-20) {
      vx = 0;
      vy = 0;
    }

    // Рисуем врагов
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].alive) {
        image(enemies[i].img, enemies[i].x, enemies[i].y, enemies[i].img.width / 2, enemies[i].img.height / 2); // Уменьшен размер изображения врага

        // Проверяем, есть ли контакт с врагом
        let d = dist(x, y, enemies[i].x, enemies[i].y);
        if (d < 20 + (enemies[i].img.width / 4)) {
          if (y < enemies[i].y) {
            enemies[i].alive = false; // Враг умирает, когда шарик прыгает на него
          } else {
            health--; // Здоровье уменьшается при контакте с врагом
            if (health <= 0) {
              gameStarted = false; // Игра окончена, если здоровье <= 0
            }
          }
        }
      }
    }

    // Рисуем здоровье
    fill(255);
    textSize(20);
    text("Зарплата  : " + health, 10, 30);
  } else {
    // Рисуем меню
    background(0);
    fill(255);
    textSize(32);
    text("Нажмите Enter, чтобы начать игру", width / 2 - 100, height / 2);
  }
}

function keyPressed() {
  if (key === ' ') {
    vy = -5; 
  }
  if (keyCode === LEFT_ARROW) {
    vx = -4; // Увеличена скорость движения влево
  }
  if (keyCode === RIGHT_ARROW) {
    vx = 4; // Увеличена скорость движения вправо
  }
  if (keyCode === DOWN_ARROW) {
    vy = 2; // Add this line to make the ball go down when the down arrow key is pressed
  }
  if (keyCode === ENTER) {
    gameStarted = true; // Игра начинается, когда нажата клавиша Enter
  }
}

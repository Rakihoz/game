let x = 200; 
let y = 300; 
let vx = 0; 
let vy = 0; 

function setup() {
  createCanvas(700, 600);
}

function draw() {
  background(220);
  let backgroundImage;

  function preload() {
    backgroundImage = loadImage('background.jpg');
  }

  function setup() {
    createCanvas(700, 600);
  }

  function draw() {
    background(backgroundImage);
  }
  fill(255, 0, 0);
  ellipse(x, y, 20, 20);

  vx *= 0.95;
  vy += 0.1; 
  x += vx;
  y += vy;


  if (y > height) {
    y = height;
    }
}

if (keyIsDown(LEFT_ARROW)) {
  ellipse-= 5;
}
if (keyIsDown(RIGHT_ARROW)) {
  ellipse+= 5;
}

}

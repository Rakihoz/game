let x = 200; 
let y = 300; 
let vx = 0; 
let vy = 0; 

let img;

function preload() {
  img = loadImage('да.jpg');
}
function setup() {
  createCanvas(400, 400);
   
}

function draw() {
  //background(220);
  image(img, 0, 0);
  fill(255, 0, 0);
  ellipse(x, y, 40, 40); 

  vx *= 0.99; 
  vy += 0.1; 
  x += vx;
  y += vy;

  if (y > height) {
    y = height;
    vy = 0;
  }

  if (x < 0 || x > width) {
    vx = 0;
  }
}
function keyPressed() {
if (key === ' ') {
  vy = -5; 
}
if (keyCode === LEFT_ARROW) {
  vx = -5;
}
if (keyCode === RIGHT_ARROW) {
  vx = 5;
}

}

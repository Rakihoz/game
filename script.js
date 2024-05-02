let x = 200; 
let y = 300; 
let vx = 0; 
let vy = 0; 

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

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

function keyPressed() {
  if (key === ' ') {
    vy = -5; 
  }
  if (key === '68') {
    vx = -5;
  }
  if (key === '65') 
    vx = 5;

}

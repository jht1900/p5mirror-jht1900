let x = 0;
let y = 0;
let len = 20;

function setup() {
  createCanvas(400, 400);
  background (random (255), random (255), random (255));
}

function draw() {
  if (random(1) > .5) {
    triangle(x, y, x+len, y+len, x, y);
  } 
  else {
    triangle(x, y+len, x+len, y, x, y+len);
  }

  x += 20;
  if (x > width) {
    x = 0;
    y += 10;
  }

  if (y > height) {
  background (random (255), random (255), random (255));
    x = 0;
    y = 0;
  }
}
// Function Parameters and Arguments
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/5.2-parameters-arguments.html
// https://youtu.be/zkc417YapfE
// https://editor.p5js.org/codingtrain/sketches/eGD-xzsw

function setup() {
  createCanvas(600, 400);
}

let xstep = 50;

function draw() {
  background(50);
  for (x = 0; x < width; x += xstep) {
      lollipop(x+10, 100, 50);
  }
  // lollipop(300, 200, 150);
}

function lollipop(x, y, diameter) {
  fill(0, 200, 255);
  rect(x - 10, y, 20, 150);

  fill(255, 0, 200);
  ellipse(x, y, diameter, diameter);
}

function mousePressed () { 
  xstep += 10;
  if (xstep > width / 4) {
    xstep = 50;
  }
}
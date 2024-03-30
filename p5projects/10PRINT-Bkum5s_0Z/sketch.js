// From: http://10print.org/
// 10 PRINT CHR$(205.5+RND(1)); : GOTO 10

var x = 0;
var y = 0;
var dim = 1024;
var len = 32;

function setup() {
  createCanvas(dim, dim);
  background(255);
}

function draw() {
  if (y > height) return;
  if (random(1) > 0.5) {
    line(x, y, x+len, y+len);
  } 
  else {
    line(x, y+len, x+len, y);
  }
  x += len;
  if (x > width) {
    x = 0;
    y += len;
  }
}
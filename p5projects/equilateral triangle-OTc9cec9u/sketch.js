let a_scale = 1;
function setup() {
  createCanvas(800*a_scale, 800*a_scale);
  background(230);
  
  angleMode(DEGREES);

  createButton('Save').mousePressed(function () {
    saveCanvas('equilateral triangle 6 copy', 'png');
  })
  x_pos = width / 2;
  y_pos = height / 2;
  a_size = width;
  
  strokeWeight(0);
  let a_count = 0;
  while (a_size > 1) {
    a_angle = (a_count % 4) * 30;
    draw_circle(a_size);
    if (a_count > 0) draw_equi(a_size, a_angle);
    a_size = a_size / 2;
    a_count += 1;
  }
}

let x_pos = 0;
let y_pos = 0;
let a_size = 50;
let a_angle = 30;
let circle_alpha = 120;
let equi_alpah = 80;

function draw_equi(a_size, a_angle) {
  select_color(equi_alpah);
  push();
  translate(x_pos, y_pos)
  rotate(a_angle);

  const side = a_size
  const x1 = side * cos(0), y1 = side * sin(0);
  const x2 = side * cos(120), y2 = side * sin(120);
  const x3 = side * cos(240), y3 = side * sin(240);
  triangle(x1, y1, x2, y2, x3, y3)

  pop();
}

function draw_circle(a_size) {  
  select_color(circle_alpha);
  push();
  translate(x_pos, y_pos)

  circle(0, 0, a_size);
  
  pop();
}

function draw_tri(a_size, a_angle) {
  select_color(a_alpha);
  push();
  translate(x_pos, y_pos)
  rotate(a_angle);

  const half = int(a_size / 2);
  const x1 = -half,
    y1 = half;
  const x2 = 0,
    y2 = -half;
  const x3 = half,
    y3 = half;
  triangle(x1, y1, x2, y2, x3, y3)

  pop();
}

function select_color(a_alpha) { 
  fill(random_color(a_alpha));
  // stroke(random_color(a_alpha));
}

function random_color(a_alpha) {
  return color(random(255), random(255), random(255), a_alpha);
}

// https://editor.p5js.org/jht1900/sketches/OTc9cec9u
// equilateral triangle


// https://editor.p5js.org/jht1493/sketches/yxDWkjIqf
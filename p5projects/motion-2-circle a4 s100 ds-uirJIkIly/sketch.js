let obj1 = {
  step: 0.01, // each step (0.0 to 1.0)
  pct: 0, // Percentage traveled (0.0 to 1.0)
  gray: 0,
  x: 0,
  y: 50,
  d: 100,
  d_range: [50, 100],
  color_step: 1
}
let obj2 = {
  step: 0.01, // each step (0.0 to 1.0)
  pct: 0, // Percentage traveled (0.0 to 1.0)
  gray: 255,
  x: 0,
  y: 50,
  d: 10,
  d_range: [10, 20],
  color_step: -1
}
let i_scale = 1;
let i_width = 640 * i_scale;
let i_height = 360 * i_scale;
let a_alpha = 4;
let n_splat = 100;
let d_scale = 1;
let a_run = 0;
let a_rate = 2;

function setup() {
  createCanvas(i_width, i_height).mousePressed(function() {
    console.log('createCanvas mousePressed');
    background(255);
  })
  noStroke();
  background(255);
  init_setup();
  create_ui();
}

function draw() {
  frameRate(a_rate);
  if (a_run) {
    for (let ii = 0; ii < n_splat; ii++) {
      draw_obj(obj1);
      draw_obj(obj2);
    }
  }
}

function draw_obj(ob) {
  fill(ob.gray, a_alpha);
  let dd = ob.d * d_scale;
  circle(ob.x - dd / 2, ob.y, dd);
  ob.gray += ob.color_step;
  if (ob.gray > 255 || ob.gray < 0) {
    ob.color_step *= -1;
    ob.gray += ob.color_step;
  }
  step_obj(ob);
}

function step_obj(ob) {
  if (ob.pct < 1.0) {
    ob.x = ob.startX + ((ob.stopX - ob.startX) * ob.pct);
    ob.y = ob.startY + ((ob.stopY - ob.startY) * ob.pct);
    ob.pct += ob.step;
  } else {
    nextpos_obj(ob);
  }
}

function nextpos_obj(ob) {
  ob.startX = ob.stopX;
  ob.startY = ob.stopY;
  ob.stopX = round(random(width));
  ob.stopY = round(random(height));
  ob.pct = 0;
  ob.d = random(ob.d_range)
}

function initpos_obj(ob) {
  d_scale = width / 640;
  ob.step = (1 / width) * 7;
  console.log('ob.step', ob.step)
  // ob.step = 0.01;
  ob.startX = round(random(width));
  ob.startY = round(random(height));
  ob.stopX = round(random(width));
  ob.stopY = round(random(height));
  ob.pct = 0;
  // console.log(frameCount, 'start', ob.startX, 
  // ob.startY, 'stop', ob.stopX, ob.stopY)
}

function create_ui() {
  createButton('Save').mousePressed(function() {
    // saveCanvas([filename], [extension])
    saveCanvas('motion-2-circle', 'png');
  })
  createButton('Full ').mousePressed(function() {
    resizeCanvas(windowWidth, windowHeight);
    init_setup();
  });
  createButton('Inset').mousePressed(function() {
    resizeCanvas(i_width, i_height);
    init_setup();
  });
  createButton('HD').mousePressed(function() {
    resizeCanvas(1920, 1080);
    init_setup();
  });
  createButton('Reset').mousePressed(function() {
    init_setup();
  });
  // createSlider(min, max, [value], [step])
  createSlider(1, 60, a_rate).input(function() {
    a_rate = this.value();
    console.log('a_rate',a_rate);
  });
  createCheckbox('Run', a_run).changed(function() {
    a_run = this.checked();
  });
}

function init_setup() {
  initpos_obj(obj1);
  initpos_obj(obj2);
}

function init_size() {

}

// https://editor.p5js.org/jht1493/sketches/g1TZ0HcsM
// motion-2-circle

// https://editor.p5js.org/jht1493/sketches/3YdExbidW
// 2.2.9 - draw_obj 5

// https://editor.p5js.org/jht1493/sketches/W11fu5LhG
// Ex_08_06 Tween mouse

// https://editor.p5js.org/jht1493/sketches/nDGl7usRr
// 2.2 - variable edge draw_obj

// https://editor.p5js.org/jht1493/sketches/y98Qq3YM9
// 2.2 - variable edge obj 2

// https://editor.p5js.org/jht1493/sketches/Kik0LOIug
// 2.2 - variable edge obj

// https://editor.p5js.org/jht1493/sketches/I69gHq4bl
// p5js Code! - 2.2 - variable edge full

// https://editor.p5js.org/jht1493/sketches/PEuN_WPty
// p5js Code! - 2.2 - make your own variable edge

// https://editor.p5js.org/jht1493/sketches/HtESWWNTa
// p5js Code! - 2.2 - make your own variable remainder

// Make Your Own (Make Your Own Variable)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.2-make-your-own.html
// https://youtu.be/dRhXIIFp-ys

// Make Your Own Variable: https://editor.p5js.org/codingtrain/sketches/xPXNdPy17
// Growing Circle Exercise: https://editor.p5js.org/codingtrain/sketches/ehbMJ-otC
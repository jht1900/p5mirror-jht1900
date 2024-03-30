// https://editor.p5js.org/jht1900/sketches/-D9xJeXAT
// motion-2-circle class

let objs = [];
let i_scale = 1;
let i_width = 640 * i_scale;
let i_height = 360 * i_scale;
let a_alpha = 2;
let n_splat = 100;  // How many to obj to draw in a frame

function setup() {
  createCanvas(i_width, i_height).mousePressed(function () {
    background(255);
  });
  noStroke();
  background(255);
  init_setup();
  create_ui();
  // frameRate(0.5);
}

function draw() {
  for (let index = 0; index < n_splat; index++) {
    for (let ob of objs) {
      ob.draw();
    }
  }
}

function init_setup() {
  let obj1 = {
    step: 0.01, // each step (0.0 to 1.0)
    pct: 0, // Percentage traveled (0.0 to 1.0)
    gray: 0,
    x: 320,
    y: 180,
    d: 100,
    d_range: [50, 100],
    color_step: 1,
    alpha: a_alpha,
  };
  let obj2 = {
    step: 0.01, // each step (0.0 to 1.0)
    pct: 0, // Percentage traveled (0.0 to 1.0)
    gray: 255,
    x: 320,
    y: 180,
    d: 10,
    d_range: [10, 20],
    color_step: -1,
    alpha: a_alpha,
  };
  objs = [];
  objs.push(new Splat(obj1));
  objs.push(new Splat(obj2));
}

class Splat {
  constructor(props) {
    Object.assign(this, props);
    this.initpos();
  }
  initpos() {
    this.step = (1 / width) * 7;
    this.startX = round(random(width));
    this.startY = round(random(height));
    this.stopX = round(random(width));
    this.stopY = round(random(height));
    this.pct = 0;
  }
  draw() {
    fill(this.gray, this.alpha);
    // circle(this.x - this.d / 2, this.y, this.d);
    circle(this.x, this.y, this.d);
    this.gray += this.color_step;
    if (this.gray > 255 || this.gray < 0) {
      this.color_step *= -1;
      this.gray += this.color_step;
    }
    this.step_pos();
  }
  step_pos() {
    if (this.pct < 1.0) {
      this.x = this.startX + (this.stopX - this.startX) * this.pct;
      this.y = this.startY + (this.stopY - this.startY) * this.pct;
      this.pct += this.step;
    } else {
      this.jump_pos();
    }
  }
  jump_pos() {
    let x = this.stopX;
    let y = this.stopy;
    this.startX = this.stopX;
    this.startY = this.stopY;
    this.stopX = round(random(width));
    this.stopY = round(random(height));
    this.pct = 0;
    this.d = random(this.d_range);
  }
}

function create_ui() {
  createButton("Save").mousePressed(function () {
    // saveCanvas([filename], [extension])
    saveCanvas("motion-2-circle", "png");
  });
  createButton("Full ").mousePressed(function () {
    resizeCanvas(windowWidth, windowHeight);
    init_setup();
  });
  createButton("Inset").mousePressed(function () {
    resizeCanvas(i_width, i_height);
    init_setup();
  });
  createButton("HD").mousePressed(function () {
    resizeCanvas(1920, 1080);
    init_setup();
  });
  createButton("Reset").mousePressed(function () {
    init_setup();
  });
}

// https://editor.p5js.org/jht1900/sketches/RPhcwQbt4
// motion-2-circle slow

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

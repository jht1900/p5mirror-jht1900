let a_vid;
let a_stillf = 100;
let a_stillf1 = a_stillf - 1;
let a_buf = [];
let a_state = {};
let a_scale = 1;

function setup() {
  print('setup started');
  // make canvas the resolution of webcam
  createCanvas(640*a_scale, 480*a_scale);
  // create webcam capture 
  a_vid = createCapture(VIDEO, function() {
    print('vid_ready');
    a_state.ready = 1;
  });
  a_vid.size(width, height);
  a_vid.hide(); // hide it
  pixelDensity(1);
  print('setup done');
}

function draw() {
  background(255);
  // Prepare canvas pixels
  loadPixels();
  // load webcam pixels 
  a_vid.loadPixels();
  if (a_state.ready && !a_state.inited) {
    vid_init();
  }
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let ii = (width * y + x) * 4;
      a_buf[ii + 0] = (a_buf[ii + 0]*a_stillf1 + a_vid.pixels[ii + 0]) / a_stillf;
      a_buf[ii + 1] = (a_buf[ii + 1]*a_stillf1 + a_vid.pixels[ii + 1]) / a_stillf;
      a_buf[ii + 2] = (a_buf[ii + 2]*a_stillf1 + a_vid.pixels[ii + 2]) / a_stillf;
      pixels[ii + 0] = a_buf[ii + 0];
      pixels[ii + 1] = a_buf[ii + 1];
      pixels[ii + 2] = a_buf[ii + 2];
    }
  }
  updatePixels();
}

function vid_init() {
  print('vid_init');
  a_state.inited = 1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let ii = (width * y + x) * 4;
      a_buf[ii + 0] = a_vid.pixels[ii + 0];
      a_buf[ii + 1] = a_vid.pixels[ii + 1];
      a_buf[ii + 2] = a_vid.pixels[ii + 2];
    }
  }
}

// https://editor.p5js.org/jht1900/sketches/qSvzC11Cn
// https://editor.p5js.org/jht1493/sketches/1fCy5yqiP
// dice pixel bestill

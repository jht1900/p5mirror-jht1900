let a_vid;
let stiff_f = [10, 100, 500];
let a_buf = [];
let a_state = {};
let a_scale = 1;

function setup() {
  createCanvas(640 * a_scale, 480 * a_scale);
  a_vid = createCapture(VIDEO, function() {
    a_state.ready = 1;
  });
  a_vid.size(width, height);
  a_vid.hide(); // hide it
  pixelDensity(1);
  create_ui();
}

function draw() {
  background(255);
  loadPixels();
  a_vid.loadPixels();
  if (a_state.ready && !a_state.inited) {
    vid_init();
  }
  let rf = stiff_f[0];
  let bf = stiff_f[1];
  let gf = stiff_f[2];
  let rm = rf - 1;
  let bm = bf - 1;
  let gm = gf - 1;
  let w = a_vid.width;
  let h = a_vid.height;
  for (let y = 0; y < w; y += 1) {
    for (let x = 0; x < h; x += 1) {
      let ii = (w * y + x) * 4;
      a_buf[ii + 0] = (a_buf[ii + 0] * rm + a_vid.pixels[ii + 0]) / rf;
      a_buf[ii + 1] = (a_buf[ii + 1] * bm + a_vid.pixels[ii + 1]) / bf;
      a_buf[ii + 2] = (a_buf[ii + 2] * gm + a_vid.pixels[ii + 2]) / gf;
      pixels[ii + 0] = a_buf[ii + 0];
      pixels[ii + 1] = a_buf[ii + 1];
      pixels[ii + 2] = a_buf[ii + 2];
    }
  }
  updatePixels();
  update_ui();
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

function create_ui() {
  createSpan().id('ifps');
  createSpan().id('isti');
  createElement('br');
  createButton('resize').mousePressed(function() {
    resizeCanvas(windowWidth, windowHeight);
  });
  createButton('R 1').mousePressed(function() {
    stiff_f[0] = 1;
  });
  createButton('R 10').mousePressed(function() {
    stiff_f[0] = 10;
  });
  createButton('R 100').mousePressed(function() {
    stiff_f[0] = 100;
  });
  createButton('R 500').mousePressed(function() {
    stiff_f[0] = 500;
  });
  createButton('R 1k').mousePressed(function() {
    stiff_f[0] = 1000;
  });
  createButton('R 10k').mousePressed(function() {
    stiff_f[0] = 10000;
  });
  createElement('br');
  createButton('G 1').mousePressed(function() {
    stiff_f[1] = 1;
  });
  createButton('G 10').mousePressed(function() {
    stiff_f[1] = 10;
  });
  createButton('G 100').mousePressed(function() {
    stiff_f[1] = 100;
  });
  createButton('G 500').mousePressed(function() {
    stiff_f[1] = 500;
  });
  createButton('G 1k').mousePressed(function() {
    stiff_f[1] = 1000;
  });
  createButton('G 10k').mousePressed(function() {
    stiff_f[1] = 10000;
  });
  createElement('br');
  createButton('B 1').mousePressed(function() {
    stiff_f[2] = 1;
  });
  createButton('B 10').mousePressed(function() {
    stiff_f[2] = 10;
  });
  createButton('B 100').mousePressed(function() {
    stiff_f[2] = 100;
  });
  createButton('B 500').mousePressed(function() {
    stiff_f[2] = 500;
  });
  createButton('B 1k').mousePressed(function() {
    stiff_f[2] = 1000;
  });
  createButton('B 10k').mousePressed(function() {
    stiff_f[2] = 10000;
  });
  createElement('br');
}

function update_ui() {
  select('#ifps').html('[fps=' + round(frameRate(), 2) + '] ')
  select('#isti').html(stiff_f + '')
}


// https://editor.p5js.org/jht1900/sketches/s0ApexPmb
// dice pixel bestill rgb ghost

// https://editor.p5js.org/jht1493/sketches/vCM9rRyan
// dice pixel bestill rgb ghost

// https://editor.p5js.org/jht1493/sketches/zIXjQotQf
// dice pixel bestill rgb ui

// https://editor.p5js.org/jht1493/sketches/1fCy5yqiP
// dice pixel bestill
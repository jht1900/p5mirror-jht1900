let a_vid;
let stiff_f = [10, 100, 500];
let a_buf = [];
let a_state = {};
let a_scale = 1;
let i_width = 640 * a_scale;
let i_height = 360 * a_scale;
let a_img;

function setup() {
  createCanvas(i_width, i_height);
  pixelDensity(1);
  let vconstraints = {
    video: {
      width: i_width,
      height: i_height,
    },
  };
  a_vid = createCapture(vconstraints, function() {
    a_state.ready = 1;
  });
  a_vid.size(width, height);
  a_vid.hide(); // hide it
  a_img = createImage(width, height);
  console.log('a_img', a_img);
  background(255);
  create_ui();
}

function draw() {
  if (a_state.ready && !a_state.inited) {
    vid_init();
  }
  update_img();
  let dx = 0;
  let dy = 0;
  let sWidth = a_img.width;
  let sHeight = a_img.height;
  let dWidth = width;
  let dHeight = sHeight * (dWidth / sWidth);
  image(a_img, dx, dy, dWidth, dHeight, 0, 0);
  update_ui();
}

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])

function update_img() {
  a_img.loadPixels();
  a_vid.loadPixels();
  let rf = stiff_f[0];
  let bf = stiff_f[1];
  let gf = stiff_f[2];
  let rm = rf - 1;
  let bm = bf - 1;
  let gm = gf - 1;
  let w = a_vid.width;
  let h = a_vid.height;
  // console.log({w,h});
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      let ii = (w * y + x) * 4;
      a_buf[ii + 0] = (a_buf[ii + 0] * rm + a_vid.pixels[ii + 0]) / rf;
      a_buf[ii + 1] = (a_buf[ii + 1] * bm + a_vid.pixels[ii + 1]) / bf;
      a_buf[ii + 2] = (a_buf[ii + 2] * gm + a_vid.pixels[ii + 2]) / gf;
      a_img.pixels[ii + 0] = a_buf[ii + 0];
      a_img.pixels[ii + 1] = a_buf[ii + 1];
      a_img.pixels[ii + 2] = a_buf[ii + 2];
      a_img.pixels[ii + 3] = 255;
    }
  }
  a_img.updatePixels();
}

function vid_init() {
  print('vid_init');
  a_state.inited = 1;
  let w = a_vid.width;
  let h = a_vid.height;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      let ii = (w * y + x) * 4;
      a_buf[ii + 0] = a_vid.pixels[ii + 0];
      a_buf[ii + 1] = a_vid.pixels[ii + 1];
      a_buf[ii + 2] = a_vid.pixels[ii + 2];
    }
  }
}

function create_ui() {
  createSpan().id('isti');
  createSpan().id('ifps');
  createElement('br');
  createButton('Size Full ').mousePressed(function() {
    resizeCanvas(windowWidth, windowHeight);
  });
  createButton('Inset').mousePressed(function() {
    resizeCanvas(i_width, i_height);
  });
  createElement('br');
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

// https://editor.p5js.org/jht1900/sketches/xbXz51BEg
// dice pixel bestill rgb ghost resize


// https://editor.p5js.org/jht1493/sketches/eiIj2eA05
// https://editor.p5js.org/jht1493/present/eiIj2eA05
// dice pixel bestill rgb ghost resize

// https://editor.p5js.org/jht1493/sketches/vCM9rRyan
// dice pixel bestill rgb ghost

// https://editor.p5js.org/jht1493/sketches/zIXjQotQf
// dice pixel bestill rgb ui

// https://editor.p5js.org/jht1493/sketches/1fCy5yqiP
// dice pixel bestill
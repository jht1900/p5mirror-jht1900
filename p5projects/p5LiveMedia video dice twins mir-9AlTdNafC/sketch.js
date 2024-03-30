// videos side by side

let myVideo;
let otherVideo;
let room_name = 'Dice-Play-1493';
let a_scale = 1;
let v_width;
let v_height;
let here_vis = 1;
let other_vis = 1;

function setup() {
  createCanvas(640, 360);
  create_ui();

  v_width = width * a_scale;
  v_height = height * a_scale;
  console.log('setup', { v_width, v_height });

  let vconstraints = {
    video: {
      width: v_width,
      height: v_height,
    },
  };
  myVideo = createCapture(vconstraints, function (stream) {
    console.log('createCapture stream.id', stream.id);
    let p5l = new p5LiveMedia(this, 'CAPTURE', stream, room_name);
    p5l.on('stream', gotStream);
    p5l.on('data', gotData);
    p5l.on('disconnect', gotDisconnect);

  });
  myVideo.muted = true;
  // myVideo.hide();
  display_vis(myVideo, here_vis);
}

// We got a new stream!
function gotStream(stream, id) {
  console.log('gotStream id', id);
  // This is just like a video/stream from createCapture(VIDEO)
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifiers
  display_vis(otherVideo, other_vis);
}

function gotData(theData, id) {
  console.log('gotData theData', theData, 'id', id);
}

function gotDisconnect(id) {
  console.log('gotDisconnect id', id);
}

function display_vis(elm, vis) {
  elm.style(vis ? 'display:inline' : 'display:none');
}

// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
// image(img, x, y, [width], [height])
// https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints

function draw() {
  background(220);
  stroke(255);
  if (myVideo != null) {
    let v1 = myVideo.get();
    mirror_left(v1);
    image(v1, 0, 0, width / 2, height, 0, 0, v1.width / 2, v1.height);
    text('Here ' + v1.width + ' ' + v1.height, 10, 10);
  }
  // ellipse(mouseX, mouseY, 100, 100);
  if (otherVideo != null) {
    let v2 = otherVideo.get();
    // let v2 = otherVideo;
    // console.log('v2.width', v2.width, 'v2.height', v2.height);
    mirror_right(v2);
    image(
      v2,
      width / 2,
      0,
      width / 2,
      height,
      v2.width / 2,
      0,
      v2.width / 2,
      v2.height
    );
    // image(v2, width/2, 0, width/2, height, width/2, 0, width/2, height);
    text('Other ' + v2.width + ' ' + v2.height, v_width + 10, 10);
  }
  update_ui();
}

function mirror_right(vimage) {
  // console.log('mirror_right vimage',vimage);
  // console.log('mirror_right vimage.pixels',vimage.pixels);
  vimage.loadPixels();
  let w = vimage.width;
  let h = vimage.height;
  // console.log('w', w, 'h', h)
  let whalf = w / 2;
  for (let y = 0; y < h; y++) {
    for (let x = whalf; x < w; x++) {
      let ii = (w * y + x) * 4;
      let ri = (w * y + (w - x - 1)) * 4;
      // console.log('x', x, 'y', y)
      // console.log('ii', ii, 'ri', ri)
      vimage.pixels[ii + 0] = vimage.pixels[ri + 0];
      vimage.pixels[ii + 1] = vimage.pixels[ri + 1];
      vimage.pixels[ii + 2] = vimage.pixels[ri + 2];
    }
  }
  vimage.updatePixels();
}

function mirror_left(vimage) {
  // console.log('vimage',vimage);
  // console.log('vimage.pixels',vimage.pixels);
  vimage.loadPixels();
  let w = vimage.width;
  let h = vimage.height;
  // console.log('w', w, 'h', h)
  let whalf = w / 2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < whalf; x++) {
      let ii = (w * y + x) * 4;
      let ri = (w * y + (w - x - 1)) * 4;
      // console.log('x', x, 'y', y)
      // console.log('ii', ii, 'ri', ri)
      vimage.pixels[ii + 0] = vimage.pixels[ri + 0];
      vimage.pixels[ii + 1] = vimage.pixels[ri + 1];
      vimage.pixels[ii + 2] = vimage.pixels[ri + 2];
    }
  }
  vimage.updatePixels();
}

function create_ui() {
  createSpan().id('ifps');
  createElement('br');
  createCheckbox('here_vis', here_vis).changed(function () {
    here_vis = this.checked();
    if (here_vis) myVideo.show();
    else myVideo.hide();
  });
  createCheckbox('other_vis', other_vis).changed(function () {
    other_vis = this.checked();
    if (other_vis) otherVideo.show();
    else otherVideo.hide();
  });
}

function update_ui() {
  select('#ifps').html('[fps=' + round(frameRate(), 2) + '] ');
}

// https://editor.p5js.org/jht1493/sketches/9AlTdNafC
// p5LiveMedia video dice twins mir

// https://editor.p5js.org/jht1493/sketches/NPAHU279L
// p5LiveMedia video dice twins

// https://editor.p5js.org/jht1493/sketches/0Oj2yPY7P
// p5LiveMedia video dice 1

// https://editor.p5js.org/shawn/sketches/jZQ64AMJc
// p5LiveMedia Test Video
// https://github.com/vanevery/p5LiveMedia

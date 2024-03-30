// https://editor.p5js.org/jht1900/sketches/1Iy_OBSuc
// 11.3: The Pixel Array Sin

let a_comp = 149;
let a_size = 512; // 256;
let a_cycle = 1;
let a_angle = 0;
let a_change = 0.02;

function setup() {
  createCanvas(a_size, a_size);
  pixelDensity(1);
  // createSlider(min, max, [value], [step])
  createSlider(0, 255, a_comp).input(function ( ) {
    a_comp = this.value();
  })
  createCheckbox('Cycle', a_cycle).changed(function() {
    a_cycle = this.checked();
  });
}

function draw() {
  background(51);
  draw_pixels();
  if (a_cycle) {
    // map(value, in-start1, stop1, out-start2, stop2
    a_comp = map(sin(a_angle),-1,1,0,255)
    a_angle += a_change;
  }
}

function draw_pixels() {
  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      pixels[index + 0] = x;
      pixels[index + 1] = a_comp; //random(0,255);
      pixels[index + 2] = y;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}

// TRY: check performance with frameRate()

// https://editor.p5js.org/jht1900/sketches/fhYjoOkXe
// 11.3: The Pixel Array Slider

// https://editor.p5js.org/jht1493/sketches/GiSAQWxq4
// 11.3: The Pixel Array

// https://github.com/CodingTrain/website/blob/master/
//  Tutorials/P5JS/p5.js_video

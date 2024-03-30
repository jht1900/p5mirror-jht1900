let a_mic;
let a_fft;
let a_start = 0;  // Window onto fft data
let a_end = 100;
let a_base = 80;
let a_vols = [];
let vol_len = 1;
let n_vol;

function setup() {
  createCanvas(640, 300);
  
  a_mic = new p5.AudioIn();
  a_mic.start();

  a_fft = new p5.FFT();
  a_fft.setInput(a_mic);

  n_vol = int(width / vol_len);
  console.log('n_vol', n_vol)
  createSpan().id('vol')
}

function draw() {
  background(200);

  show_fft();
  
  show_mic();
}

function show_mic() {
  let vol = a_mic.getLevel();
  a_vols.push(vol);
  if (a_vols.length > n_vol) {
    a_vols.splice(0,1);
  }
  // ellipse(100, 100, 200, vol * 4000);
  let len = 10;
  let x = width - a_vols.length * vol_len;
  if (x < 0) x = 0;
  let y2 = height/2;
  for (let v of a_vols) {
    let h = y2 * v;
    rect(x, y2 - h, len, h);
    x += vol_len;
  }
  select('#vol').html('vol='+round(vol, 3))
}

function show_fft() {
  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = a_fft.analyze();
  // spectrum.length = 1024

  let i_start = Math.round(spectrum.length * a_start / 1000)
  let i_end = Math.round(spectrum.length * a_end / 1000)
  let b_len = width / (i_end - i_start);
  // print('i_start', i_start, 'i_end', i_end, 'blen', blen);
  
  for (let i = i_start; i < i_end; i++) {
    fill(spectrum[i], 0, 0);
    let x = map(i, i_start, i_end, 0, width);
    let h = map(spectrum[i], a_base, 255, 0, height);
    rect(x, height-h, b_len, h);
  }
}

// https://editor.p5js.org/jht1493/sketches/S47diDJcd
// keyPressed 1QAZ FFT

// https://en.wikipedia.org/wiki/Piano_key_frequencies
// https://editor.p5js.org/icm4.0/sketches/NArBLGfRM
// Random Diatonic Chords 2:4 Chords
// https://editor.p5js.org/p5/sketches/Sound:_Note_Envelope



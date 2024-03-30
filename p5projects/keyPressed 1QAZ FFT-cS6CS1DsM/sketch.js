// A-G-K --> "C Major cord"
// D-J-; --> "D cord"
// G-L-Enter --> "E Major cord"

let a_keys = {};
let a_waves = {};
let fade_in = 0.1;
let fade_out = 0.5;
let a_volume = 0.1;
let a_fft;
let a_start = 0;  // Window onto fft data
let a_end = 100;

function setup() {
  createCanvas(640, 300);
  a_fft = new p5.FFT();
  sketch_ui();
}

function draw() {
  background(200);
  show_value('a_keys', a_keys)
  show_fft();
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
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height-h, b_len, h);
  }
}

// Create a new oscillator on each keypress
function keyPressed() {
  let midi = a_notes[key];
  if (midi !== undefined) {
    let freq = midiToFreq(midi);
    a_keys[key] = round(freq) || -1;
    let wave = a_waves[key];
    if (!wave) {
      wave = new p5.Oscillator('sine');
      wave.freq(freq);
      wave.start();
      wave.amp(0);
      wave.amp(a_volume, fade_in);
      a_waves[key] = wave;
    }
  }
  // prevent any default behavior
  return false;
}

function keyReleased() {
  // print('keyReleased', key);
  delete a_keys[key];
  let wave = a_waves[key];
  if (wave) {
    wave.amp(0, fade_out);
    delete a_waves[key];
  }
  // prevent any default behavior
  return false;
}

// https://editor.p5js.org/jht1900/sketches/cS6CS1DsM
// keyPressed 1QAZ FFT

// https://en.wikipedia.org/wiki/Piano_key_frequencies

// https://editor.p5js.org/icm4.0/sketches/NArBLGfRM
// Random Diatonic Chords 2:4 Chords

// https://editor.p5js.org/p5/sketches/Sound:_Note_Envelope


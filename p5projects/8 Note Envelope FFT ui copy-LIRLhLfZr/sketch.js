let osc, envelope, fft;

let a_offset = 12; // Increase for higher notes
let midi_notes = [60, 62, 64, 65, 67, 69, 71, 72]
// 72, 71, 69, 67, 65, 64, 62, 60];
let a_note = 0;
let a_start = 10; // Window onto fft data
let a_end = 100;
// let attackLevel = 0.25;
let a_volume = 0.01;  // Is attachLevel same as volume?

function setup() {
  createCanvas(710, 200);
  init_sound();
  sketch_ui();
  frameRate(30)
  colorMode(HSB, 255)
}

function init_sound() {
  osc = new p5.SinOsc();
  // Instantiate the envelope
  envelope = new p5.Env();
  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  // set attackLevel, releaseLevel
  envelope.setRange(a_volume, 0);
  osc.start();
  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(255);
  show_num('a_offset', a_offset);

  if (frameCount % 60 === 0 || frameCount === 1) {
    let midiValue = midi_notes[a_note] + a_offset;
    let freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);
    envelope.play(osc, 0, 0.1);

    show_num('freqValue', freqValue);
    show_num('a_note', a_note);

    a_note = (a_note + 1) % midi_notes.length;
  }

  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = fft.analyze();
  // spectrum.length = 1024
  // print('spectrum.length', spectrum.length);

  let i_start = Math.round(spectrum.length * a_start / 1000)
  let i_end = Math.round(spectrum.length * a_end / 1000)
  let b_len = width / (i_end - i_start);
  // print('i_start', i_start, 'i_end', i_end, 'blen', blen);

  for (let i = i_start; i < i_end; i++) {
    fill(spectrum[i], 100, 50);
    // fill(0, spectrum[i], 0)
    let x = map(i, i_start, i_end, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height - h, b_len, h);
    // print('x', x, 'h', h)
  }
}

// https://editor.p5js.org/p5/sketches/Sound:_Note_Envelope

/**
 *  @name Note Envelope
 *  @description  <p>An Envelope is a series of fades, defined
 *  as time / value pairs. In this example, the envelope
 *  will be used to "play" a note by controlling the output
 *  amplitude of an oscillator.<br/><br/>
 *  The p5.Oscillator sends its output through
 *  an internal Web Audio GainNode (p5.Oscillator.output).
 *  By default, that node has a constant value of 0.5. It can
 *  be reset with the osc.amp() method. Or, in this example, an
 *  Envelope takes control of that node, turning the amplitude
 *  up and down like a volume knob.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a> and a
 * sound file.</span></em></p>
 */
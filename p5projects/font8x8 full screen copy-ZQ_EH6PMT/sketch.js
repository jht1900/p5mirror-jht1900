// Full screen char drawing
const a_string = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
// const a_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
// const a_string = 'BLACK LIVES MATTER';
// const a_string = 'B';

const n_chars = 6;
const n_lines = 3;

const page_pause_frames = 30 * 2;

let draw_func;

function setup() {
  // createCanvas(80, 80);
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);
  draw_init();
  draw_char_start();
  begin_page();
  draw_func = draw_bit;
}

function draw() {
  draw_func();
}

function begin_page() {
  background(0);
  cursor_x = undefined;
}

const start_index = 0;
const end_index = a_string.length - 1;

let pix_len = 10;
let char_len = 8 * pix_len;
let string_index = start_index;

let x_pos = 0;
let y_pos = 0;

let a_char;
let a_bytes;
let bit_index;
let byte_index;
let a_x;
let a_y;
let a_byte;

let cursor_x;
let cursor_y;

function draw_init() {
  pix_len = floor(windowWidth / (n_chars * 8));
  // pix_len = 10;
  char_len = 8 * pix_len;
}

function draw_char_start() {
  a_char = a_string[string_index];
  a_bytes = font8x8_dict[a_char];
  // print('x_pos', x_pos, 'y_pos', y_pos, 'a_char', a_char);
  if (!a_bytes) {
    draw_next_char();
    return;
  }
  a_x = x_pos;
  a_y = y_pos;
  byte_index = 0;
  bit_index = 0;
  a_byte = a_bytes[byte_index];
}

function draw_bit() {
  remove_cursor();
  if (bit_index < 8) {
    if (a_byte & (1 << bit_index)) {
      fill('white');
      rect(a_x, a_y, pix_len, pix_len);
      // circle(a_x, a_y, pix_len);
    } else {
      draw_cursor();
    }
    bit_index += 1;
    a_x += pix_len;
  } else {
    bit_index = 0;
    byte_index += 1;
    a_x = x_pos;
    a_y += pix_len;
    if (byte_index < 8) {
      a_byte = a_bytes[byte_index];
      draw_bit();
    } else {
      draw_next_char();
    }
  }
}

function remove_cursor() {
  // console.log('remove_cursor cursor_x', cursor_x, 'cursor_y', cursor_y);
  if (cursor_x == undefined) return;
  fill('black');
  rect(cursor_x, cursor_y, pix_len, pix_len);
  cursor_x = undefined;
}

function draw_cursor() {
  fill('white');
  rect(a_x, a_y, pix_len, pix_len);
  cursor_x = a_x;
  cursor_y = a_y;
}

function draw_next_char() {
  string_index += 1;
  if (string_index > end_index) {
    string_index = start_index;
  }
  x_pos += char_len;
  if (x_pos + char_len > width) {
    x_pos = 0;
    y_pos += char_len;
    if (y_pos + char_len > height) {
      y_pos = 0;
      page_pause_start();
    }
  }
  draw_char_start();
}

let page_pause_count;

function page_pause_start() {
  page_pause_count = page_pause_frames;
  draw_func = page_pause;
}

function page_pause() {
  page_pause_count -= 1;
  if (page_pause_count < 0) {
    draw_func = draw_bit;
    begin_page();
  }
}

const font8x8_dict = {
  0: [62, 99, 115, 123, 111, 103, 62, 0],
  1: [12, 14, 12, 12, 12, 12, 63, 0],
  2: [30, 51, 48, 28, 6, 51, 63, 0],
  3: [30, 51, 48, 28, 48, 51, 30, 0],
  4: [56, 60, 54, 51, 127, 48, 120, 0],
  5: [63, 3, 31, 48, 48, 51, 30, 0],
  6: [28, 6, 3, 31, 51, 51, 30, 0],
  7: [63, 51, 48, 24, 12, 12, 12, 0],
  8: [30, 51, 51, 30, 51, 51, 30, 0],
  9: [30, 51, 51, 62, 48, 24, 14, 0],
  '!': [24, 60, 60, 24, 24, 0, 24, 0],
  '"': [54, 54, 0, 0, 0, 0, 0, 0],
  '#': [54, 54, 127, 54, 127, 54, 54, 0],
  $: [12, 62, 3, 30, 48, 31, 12, 0],
  '%': [0, 99, 51, 24, 12, 102, 99, 0],
  '&': [28, 54, 28, 110, 59, 51, 110, 0],
  "'": [6, 6, 3, 0, 0, 0, 0, 0],
  '(': [24, 12, 6, 6, 6, 12, 24, 0],
  ')': [6, 12, 24, 24, 24, 12, 6, 0],
  '*': [0, 102, 60, 255, 60, 102, 0, 0],
  '+': [0, 12, 12, 63, 12, 12, 0, 0],
  ',': [0, 0, 0, 0, 0, 12, 12, 6],
  '-': [0, 0, 0, 63, 0, 0, 0, 0],
  '.': [0, 0, 0, 0, 0, 12, 12, 0],
  '/': [96, 48, 24, 12, 6, 3, 1, 0],
  ':': [0, 12, 12, 0, 0, 12, 12, 0],
  ';': [0, 12, 12, 0, 0, 12, 12, 6],
  '<': [24, 12, 6, 3, 6, 12, 24, 0],
  '=': [0, 0, 63, 0, 0, 63, 0, 0],
  '>': [6, 12, 24, 48, 24, 12, 6, 0],
  '?': [30, 51, 48, 24, 12, 0, 12, 0],
  '@': [62, 99, 123, 123, 123, 3, 30, 0],
  A: [12, 30, 51, 51, 63, 51, 51, 0],
  B: [63, 102, 102, 62, 102, 102, 63, 0],
  C: [60, 102, 3, 3, 3, 102, 60, 0],
  D: [31, 54, 102, 102, 102, 54, 31, 0],
  E: [127, 70, 22, 30, 22, 70, 127, 0],
  F: [127, 70, 22, 30, 22, 6, 15, 0],
  G: [60, 102, 3, 3, 115, 102, 124, 0],
  H: [51, 51, 51, 63, 51, 51, 51, 0],
  I: [30, 12, 12, 12, 12, 12, 30, 0],
  J: [120, 48, 48, 48, 51, 51, 30, 0],
  K: [103, 102, 54, 30, 54, 102, 103, 0],
  L: [15, 6, 6, 6, 70, 102, 127, 0],
  M: [99, 119, 127, 127, 107, 99, 99, 0],
  N: [99, 103, 111, 123, 115, 99, 99, 0],
  O: [28, 54, 99, 99, 99, 54, 28, 0],
  P: [63, 102, 102, 62, 6, 6, 15, 0],
  Q: [30, 51, 51, 51, 59, 30, 56, 0],
  R: [63, 102, 102, 62, 54, 102, 103, 0],
  S: [30, 51, 7, 14, 56, 51, 30, 0],
  T: [63, 45, 12, 12, 12, 12, 30, 0],
  U: [51, 51, 51, 51, 51, 51, 63, 0],
  V: [51, 51, 51, 51, 51, 30, 12, 0],
  W: [99, 99, 99, 107, 127, 119, 99, 0],
  X: [99, 99, 54, 28, 28, 54, 99, 0],
  Y: [51, 51, 51, 30, 12, 12, 30, 0],
  Z: [127, 99, 49, 24, 76, 102, 127, 0],
  '[': [30, 6, 6, 6, 6, 6, 30, 0],
  '\\': [3, 6, 12, 24, 48, 96, 64, 0],
  ']': [30, 24, 24, 24, 24, 24, 30, 0],
  '^': [8, 28, 54, 99, 0, 0, 0, 0],
  _: [0, 0, 0, 0, 0, 0, 0, 255],
  '`': [12, 12, 24, 0, 0, 0, 0, 0],
  a: [0, 0, 30, 48, 62, 51, 110, 0],
  b: [7, 6, 6, 62, 102, 102, 59, 0],
  c: [0, 0, 30, 51, 3, 51, 30, 0],
  d: [56, 48, 48, 62, 51, 51, 110, 0],
  e: [0, 0, 30, 51, 63, 3, 30, 0],
  f: [28, 54, 6, 15, 6, 6, 15, 0],
  g: [0, 0, 110, 51, 51, 62, 48, 31],
  h: [7, 6, 54, 110, 102, 102, 103, 0],
  i: [12, 0, 14, 12, 12, 12, 30, 0],
  j: [48, 0, 48, 48, 48, 51, 51, 30],
  k: [7, 6, 102, 54, 30, 54, 103, 0],
  l: [14, 12, 12, 12, 12, 12, 30, 0],
  m: [0, 0, 51, 127, 127, 107, 99, 0],
  n: [0, 0, 31, 51, 51, 51, 51, 0],
  o: [0, 0, 30, 51, 51, 51, 30, 0],
  p: [0, 0, 59, 102, 102, 62, 6, 15],
  q: [0, 0, 110, 51, 51, 62, 48, 120],
  r: [0, 0, 59, 110, 102, 6, 15, 0],
  s: [0, 0, 62, 3, 30, 48, 31, 0],
  t: [8, 12, 62, 12, 12, 44, 24, 0],
  u: [0, 0, 51, 51, 51, 51, 110, 0],
  v: [0, 0, 51, 51, 51, 30, 12, 0],
  w: [0, 0, 99, 107, 127, 127, 54, 0],
  x: [0, 0, 99, 54, 28, 54, 99, 0],
  y: [0, 0, 51, 51, 51, 62, 48, 31],
  z: [0, 0, 63, 25, 12, 38, 63, 0],
  '{': [56, 12, 12, 7, 12, 12, 56, 0],
  '|': [24, 24, 24, 0, 24, 24, 24, 0],
  '}': [7, 12, 12, 56, 12, 12, 7, 0],
  '~': [110, 59, 0, 0, 0, 0, 0, 0],
};

// const font8x8 = [

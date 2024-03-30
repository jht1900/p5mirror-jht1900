var img;
function preload() {
  img = loadImage('http://www.j4u2.com/jht/images/jt_cu.jpg');
}
function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
}
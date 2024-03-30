// noprotect
var fac = 2;
var dim = 256 * fac;

function setup() {
  createCanvas(dim, dim);
  draw1();
}

function draw() {}

function draw1() {
  background(color(0, 0, 0));
  var r = 0;
  var g = 0;
  var b = 0;
  var nr = 0;
  var ng = 0;
  for (var y = 0; y < dim; y++) {
    for (var x = 0; x < dim; x++) {
      stroke(color(255 - r, 255 - g, 255 - b));
      point(x, y);
      nr++;
      if (nr >= fac) {
        nr = 0;
        r++;
      }
      if (r > 255) {
        r = 0;
        ng++;
        if (ng >= fac) {
          ng = 0;
          g++;
        }
        if (g > 255) {
          g = 0;
          b++;
          if (b > 255) {
            b = 0;
          }
        }
      }
    }
  }
  console.log('r=' + r + ' g=' + g + ' b=' + b);
}
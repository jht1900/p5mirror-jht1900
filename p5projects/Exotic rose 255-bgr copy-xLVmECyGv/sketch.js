var dim = 256;

function setup() {
  createCanvas(dim, dim);
  draw1();
}

function draw1() {
  background(0);
  var r = 0;
  var g = 0;
  var b = 0;
  loadPixels();
  for (var y = 0; y < dim; y++) {
    for (var x = 0; x < dim; x++) {
      // stroke(color(255 - r, 255 - g, 255 - b));
      // point(x, y);
      set(x, y, [255 - r, 255 - g, 255 - b, 255]);
      r++;
      if (r > 255) {
        r = 0;
        g++;
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
  updatePixels();
  console.log("r=" + r + " g=" + g + " b=" + b);
}


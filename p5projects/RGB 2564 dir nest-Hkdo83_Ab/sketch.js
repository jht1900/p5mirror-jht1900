var fac = 4;
var dim = 256*fac;

function setup() { 
  createCanvas(dim, dim);
  background(color(0, 0, 0));
	var r = 0;
	var g = 0;
	var b = 0;
  var nr = 0;
  var ng = 0;
  var dir = 1;
	for (var y = 0; y < dim; y++) {
		for (var x = 0; x < dim; x++) {
			stroke(color(r,g,b));
			point(x,y);
      nr++;
			if (nr >= fac) {
        nr = 0;
        r++;
        if (r > 255) {
          r = 0;
          ng++;
          if (ng >= fac) {
            ng = 0;
            g++;
          }
          if (g > 255) {
            g = 0;
          }
				}
      }
      else {
				b += dir;
				if (b > 255) {
          dir = -1;
          b = 255;
				}
        else if (b < 0) {
          b = 0;
          dir = 1;
        }
      }
		}
    console.log('y = '+y+' r='+r+' g='+g+' b='+b);
	}
	//console.log('r='+r+' g='+g+' b='+b);
}

function draw() { 
}

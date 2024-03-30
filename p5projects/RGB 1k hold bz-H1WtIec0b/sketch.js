// RGB 1k hold
var fac = 4;
var dim = 256*fac;
var cre = 0;
var cgr = 0;
var cbl = 0;
var nred = 0;
var ngre = 0;
var dir = 1;
var y = 0;
var x = 0;
var drate = 4;

function setup() { 
  createCanvas(dim, dim);
  background(color(0, 0, 0));
}

function draw() { 
  for (var cnt = drate; cnt > 0; cnt--) draw1();
}

function draw1() { 
	if (y >= dim) return;
  for (x = 0; x < dim; x++) {
    stroke(color(cre,cgr,cbl));
    point(x,y);
    nred++;
    if (nred >= fac) {
      nred = 0;
      cre++;
      if (cre > 255) {
        cre = 0;
        ngre++;
        if (ngre >= fac) {
          ngre = 0;
          cgr++;
          if (cgr > 255) {
            cgr = 0;
          }
        }
      }
    }
    else {
      cbl += dir;
      if (cbl > 255) {
        dir = -1;
        cbl = 254;
      }
      else if (cbl < 0) {
        dir = 1;
        cbl = 1;
      }
    }
  }
	y++;
  cbl=0;
	console.log('y = '+y+' cre='+cre+' cgr='+cgr+' cbl='+cbl);
}
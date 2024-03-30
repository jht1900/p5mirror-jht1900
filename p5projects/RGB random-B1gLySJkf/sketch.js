// RGB nk save
var fac = 4;
var dim = 256*fac;
var y = 0;
var x = 0;
var drate = 4;
var filename = 'p5 RGB random f'+fac+'.png';
var savefile = 0;

function setup() { 
  createCanvas(dim, dim);
  background(color(0, 0, 0));
}

function draw() { 
  for (var cnt = drate; cnt > 0; cnt--) draw1();
}

function draw1() { 
	if (y >= dim) { saveImage(); return; }
	//console.log('y = '+y+' cre='+cre+' cgr='+cgr+' cbl='+cbl);
  for (x = 0; x < dim; x++) {
    var cre = random(256);
    var cgr = random(256);
    var cbl = random(256);
    stroke(color(cre,cgr,cbl));
    point(x,y);
  }
	y++;
  //cbl = 0;
}

function saveImage() {
  if (! savefile) return;
  savefile = 0;
  save(filename);
}
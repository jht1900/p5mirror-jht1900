//For future reference, where would I have to put fill color so that it doesn't flicker?

let mycolor;
let len = 30;

function setup() {
  createCanvas(400, 400);
  mycolor = random(10,100)
}

function draw() {
  background(240);
  
  for (x=20; x<=width; x=x+50){
    for (y=5; y<=height; y=y+75){
      // fill(x,y,10,mycolor)
      fill(mycolor)
      rect(x,y,len);
    }
    
  }
}

function keyTyped() {
  if (key == 'a') {
    mycolor = 'red';
  }
  else if (key == 's') {
    mycolor = 'yellow';
  }
  else if (key == 'd') {
    mycolor = 'green';
  }
  else {
    mycolor = 0;
  }
}
let c1 = { x: 0, y: 0, d: 180 };
let c2 = { x: 0, y: 0, d: 120 };
function setup() {
  createCanvas(600, 400);
  background(220);

  c1.x = width / 2 - c1.d;
  c1.y = height / 2;
  fill(255);
  // circle(x, y, d)
  circle(c1.x, c1.y, c1.d);
  let r1 = c1.d / 2;
  let a1 = PI*r1*r1;
  console.log('area a1', a1);
  
  c2.x = c1.x ;
  c2.y = height / 2;
  circle(c2.x, c2.y, c2.d);
  c2.x += c2.d;
  circle(c2.x, c2.y, c2.d);
  let r2 = c2.d / 2;
  let a2 = PI*r2*r2;
  console.log('area 2*a2', 2*a2);
  console.log('area a1/2/a2', a1/2/a2);
  console.log('area a2/(a1/2)', a2/(a1/2));
  
  // createImg(src, alt)
  createImg('./two-pizzas.png', 'two pizzas')
  .style('width','600px')
}

function draw() {
  // background(220);
}
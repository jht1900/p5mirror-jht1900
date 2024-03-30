function sketch_ui() {
  {
    let span = createSpan('Press any key on rows 1, Q, A, Z');
    span.style('font-size', '30px');
  }
  createP();

  {
    let elm = createSpan().id('a_keys');
    elm.style('font-size', '30px');
  }
}

function show_num(label, num) {
  let elm = select('#' + label);
  num = round(num, 2);
  elm.html('[' + label + ' ' + num + '] ');
}

function show_value(label, value) {
  let elm = select('#' + label);
  value = JSON.stringify(value);
  elm.html('[' + label + ' ' + value + '] ');
}
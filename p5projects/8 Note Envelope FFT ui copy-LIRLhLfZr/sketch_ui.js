function sketch_ui() {
  {
    let span = createSpan('').id('freqValue');
    span.style('font-size', '30px');
  }

  {
    let elm = createSpan().id('a_note');
    elm.style('font-size', '30px');
  }
  createP();

  // Not working yet.
  // {
  //   let span = createSpan('a_volume:');
  //   span.style('font-size', '30px');
  //   // createSlider(min, max, [value], [step])
  //   let slider = createSlider(0, 1, a_volume, 0.01);
  //   slider.style('width', '360px');
  //   slider.input(function() {
  //     a_volume = slider.value();
  //   });
  // }
  // createP();

  {
    let span = createSpan('a_offset:');
    span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    let slider = createSlider(0, 100, a_offset, 1);
    slider.style('width', '360px');
    slider.input(function() {
      a_offset = slider.value();
    });
  }
  createP();

  {
    let elm = createSpan().id('a_offset');
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
let a_devices = [];
let i_width = 320;
let i_height = 240;
let a_masks = [];

function setup() {
  createCanvas(i_width, i_height);
  media_enum();
  createSpan().id('ifps');
  createElement('br');
  init_masks();
}

function draw() {
  background(255);
  for (let ii = 0; ii < a_devices.length; ii++) {
    let ent = a_devices[ii];
    let img = ent.vcapture.get();
    img.mask(a_masks[ii % a_masks.length]);
    image(img, 0, 0, i_width, i_height);
  }
  let fps = round(frameRate(), 2);
  select('#ifps').html('[fps='+fps+']');
}

// image(img, x, y, [width], [height])
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])

function init_masks() {
  a_masks[0] = mask_0();
  a_masks[1] = mask_1();
}

function mask_0() {
  let msk = createGraphics(i_width, i_height);
  msk.background(0, 0, 0, 0);
  msk.fill(255, 255, 255, 255);
  let w = i_width;
  let h = i_height;
  msk.rect(0, 0, w, h);
  return msk.get();
}

function mask_1() {
  let msk = createGraphics(i_width, i_height);
  msk.background(0, 0, 0, 0);
  msk.fill(255, 255, 255, 255);
  let w = i_width;
  let h = i_height;
  msk.ellipse(w / 2, h / 2, w, h);
  return msk.get();
}

function create_videos(devices) {
  for (let ii = 0; ii < devices.length; ii++) {
    let ent = devices[ii];
    let vwidth = i_width;
    let vcap = { video: { 
      deviceId: { exact: ent.deviceId }, 
      width: {exact: vwidth} 
    } };
    let vcapture = createCapture(vcap);
    vcapture.size(320, 240);
    vcapture.hide();
    //a_videos.push(vid);
    ent.vcapture = vcapture;
    createSpan(ent.label);
    createElement('br');
  }
}

function media_enum() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    return;
  }
  // List cameras and microphones.
  navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        // console.log('device', device);
        // console.log(device.kind + ": " + device.label + " id = [" + device.deviceId + ']');
        if (device.kind == 'videoinput') {
          console.log('device.deviceId', device.deviceId);
          let { label, deviceId } = device;
          a_devices.push({ label, deviceId });
        }
      });
      console.log('a_devices', a_devices);
      create_videos(a_devices);
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });

}

// https://editor.p5js.org/jht1900/sketches/Gx8gNq4kt
// capture mask oval

// https://editor.p5js.org/jht1900/sketches/VZ3dNvyZL
// capture mediaDevices.enumerateDevices

// https://editor.p5js.org/jht1900/sketches/V_2B-60A9
// capture invert mediaDevices.enumerateDevices
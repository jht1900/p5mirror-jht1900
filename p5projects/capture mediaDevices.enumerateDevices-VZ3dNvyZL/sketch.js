let a_devices = [];
let i_width = 320;
let i_height = 240;

function setup() {
  createCanvas(i_width*2, i_height);
  media_enum();
  createSpan().id('ifps');
  createElement('br');
}

function draw() {
  background(255);
  for (let ii = 0; ii < a_devices.length; ii++) {
    let ent = a_devices[ii];
    image(ent.vcapture, ii*i_width, 0, 320, 240);
  }
  let fps = round(frameRate(), 2);
  select('#ifps').html('[fps='+fps+']');
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

// https://editor.p5js.org/jht1900/sketches/VZ3dNvyZL
// capture mediaDevices.enumerateDevices

// https://editor.p5js.org/jht1900/sketches/V_2B-60A9
// capture invert mediaDevices.enumerateDevices
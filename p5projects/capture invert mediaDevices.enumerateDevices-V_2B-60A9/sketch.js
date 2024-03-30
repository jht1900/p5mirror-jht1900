var capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
  
  media_enum();
}

function draw() {
  background(255);
  image(capture, 0, 0, 320, 240);
  filter(INVERT);
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
        console.log(device.kind + ": " + device.label + " id = [" + device.deviceId+']');
      });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });

}

// https://editor.p5js.org/jht1900/sketches/V_2B-60A9
// capture invert mediaDevices.enumerateDevices


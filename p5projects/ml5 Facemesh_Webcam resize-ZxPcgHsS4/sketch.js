let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, gotVideo);
  // video.size(width, height);

  console.log('video', video);
  console.log('video.width', video.width, video.height);
  
  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function gotVideo(stream) {
  a_stream = stream;
  console.log('stream', stream);
  console.log('gotVideo video.width', video.width, video.height);
  resizeCanvas(video.width, video.height);
}
function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}

// https://editor.p5js.org/jht1900/sketches/ZxPcgHsS4
// ml5 Facemesh_Webcam resize

// https://editor.p5js.org/ml5/sketches/MuL4iKCo_
// ml5 Facemesh_Webcam


// This advanced example combines a video drawn to a canvas with a audio track to send to a peer.

let myVideo;
let myAudio;
let myCanvas;
let otherVideo;

function setup() {
  myCanvas = createCanvas(400, 400);
  console.log(myCanvas);
  
  // Requesting audio and video from createCapture
  let constraints = {
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 480
      },
      optional: [{ maxFrameRate: 30 }]
    },
    audio: true
  };
  
  myVideo = createCapture(constraints, function(stream) {
    // Need to use the callback to get at the audio/video stream
    
    // Get a stream from the canvas
    let canvasStream = myCanvas.elt.captureStream();
    
    // Get the audio tracks from the a/v stream
    let audioTracks = stream.getAudioTracks();
    
    // Use the first audio track
    if (audioTracks.length > 0) {
      // Add it to the canvas stream
      canvasStream.addTrack(audioTracks[0]);
    }
    
    // Give the canvas stream to SimpleSimplePeer as a "CAPTURE" stream
    let p5lm = new p5LiveMedia(this,"CAPTURE",canvasStream, "p5LiveMediaAdvancedTest");
    p5lm.on('stream', gotStream);       
  });
  myVideo.elt.muted = true;
  myVideo.hide();
}

function draw() {
  background(220);
  
  image(myVideo,0,0,width,height);
  ellipse(mouseX,mouseY,50,50);
  
  // Do the threshold 1 time in setup
  loadPixels();
  for (let i = 0; i < pixels.length; i+=4) {
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];
        
    if (r+b+g > 200) {
      pixels[i] = 255;
      pixels[i+1] = 255;
      pixels[i+2] = 255;
    } else {
      pixels[i] = 0;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }
  }
  updatePixels();
  
  
}

// We got a new stream!
function gotStream(stream) {
  // This is just like a video/stream from createCapture(VIDEO)
  otherVideo = stream;
  //otherVideo.id is the unique identifier for this peer
  //otherVideo.hide();
}
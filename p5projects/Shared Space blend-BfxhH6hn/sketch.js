let otherVideos = {};
let myVideo;

function setup() {
  createCanvas(320, 240);
  // let constraints = { audio: true, video: true };
  // Request video only, no audio
  let constraints = { video: true };
  myVideo = createCapture(constraints, function (stream) {
    let p5l = new p5LiveMedia(this, "CAPTURE", stream, "Shared Space");
    p5l.on("stream", gotStream);
    p5l.on("disconnect", gotDisconnect);
  });
  // setting muted does not appear to work
  // myVideo.elt.muted = true;
  // without size myVideo defaults to width=300 height=150
  myVideo.size(width, height);
  myVideo.hide();
  console.log("myVideo width=" + myVideo.width + " height=" + myVideo.height);
}

function draw() {
  image(myVideo, 0, 0, width, height);
  for (const id in otherVideos) {
    let ovid = otherVideos[id];
    let srcImage = ovid.get();
    blend(srcImage, 0, 0, ovid.width, ovid.height, 0, 0, width, height, ADD);
    // blend(srcImage, sx, sy, sw, sh, dx, dy, dw, dh, blendMode)
  }
}

// We got a new stream!
function gotStream(stream, id) {
  console.log("gotStream id=" + id);
  // This is just like a video/stream from createCapture(VIDEO)
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifiers
  otherVideo.hide();
  otherVideos[id] = stream;
}

function gotDisconnect(id) {
  console.log("gotDisconnect id=" + id);
  delete otherVideos[id];
}

// https://editor.p5js.org/jht1900/sketches/-BfxhH6hn
// Shared Space blend

// https://editor.p5js.org/shawn/sketches/1XRw9Mut5
// Shared Space by shawn

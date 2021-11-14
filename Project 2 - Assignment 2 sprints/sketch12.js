// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
    // THNAKS TO CODINGTRAIN I MIRRORED THE VIDEO FOR BETTER HUMAN INTERACTION
translate(video.width,0);
scale(-1,1);
// End of flipping video
  image(video, 0, 0, width, height);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

//    NOSE TRACKING CODE THING
    
    const nose = pose.nose;
    // if the nose position is on the left of screen then change the colour of nose to yellow
    if (nose.x > width/2 && nose.y < height/2){
        fill("red");
        document.body.style.backgroundColor = "red";
    }
// if nose is in bottom left quadrent, set html background to yellow
    else if (nose.x > width/2 && nose.y > height/2){
        fill("yellow");
        document.body.style.backgroundColor = "yellow";
    }
    // if nose is in bottom right quadrent, set html background to green
    else if (nose.x < width/2 && nose.y > height/2){
        fill("green");
        document.body.style.backgroundColor = "green";
    }
    // if nose is in top right quadrent, set html to blue
    else if (nose.x < width/2 && nose.y < height/2){
        fill("blue");
        document.body.style.backgroundColor = "blue";
    }
    // if the nose position is on the right of the screen change the colour to pink
    else{
        fill(255, 215, 0);
        document.body.style.backgroundColor = "white";
    }
    
    ellipse(nose.x, nose.y, 20, 20);

// END OF NOSE TRACKING THING

    // // Create a yellow ellipse for the right eye
    // fill(255, 215, 0);
    // const rightEye = pose.rightEye;
    // ellipse(rightEye.x, rightEye.y, 20, 20);

    // // Create a yellow ellipse for the right eye
    // fill(255, 215, 0);
    // const leftEye = pose.leftEye;
    // ellipse(leftEye.x, leftEye.y, 20, 20);
      
    // fill(0,255,0);
    //   const rightShoulder = pose.rightShoulder;
    // ellipse(rightShoulder.x, rightShoulder.y, 20, 20 );  
  }
}
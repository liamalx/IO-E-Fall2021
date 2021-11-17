// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

/*
References for these codes:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/


// Serial port varibles
let serial; // Declare a "SerialPort" object
let menu;
let result = '';
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

// var serial;          // variable to hold an instance of the serialport library
// var portName = '/dev/tty.usbserial-1410';  // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino
var outData = 0;  // variable to hold the output data to Arduino

// posenet varibles for video
let video;
let poseNet;
let poses = [];

var myVoice = new p5.Speech(); // new P5.Speech object
myVoice.interrupt = true; //When this is set to true it does not accept double clicks to cue more than the one speech

function setup() {
    // source for inserting canvas into div https://stackoverflow.com/questions/35660240/how-to-put-p5-js-canvas-in-a-html-div/36540479
    var canvasDiv = document.getElementById('video');
    var width = canvasDiv.offsetWidth;

    // var canvasDiv = document.getElementById('video');
    // var width = canvasDiv.offsetWidth;
    // var width = canvasDiv.offsetWidth;
    var myCanvas = createCanvas(width, (width*0.5625)); //make the video 16:9 no matter the div size
    myCanvas.parent("video");
    // var sketchCanvas = createCanvas(width,450);
    // console.log(sketchCanvas);
    // sketchCanvas.parent("myCanvas");

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
  
  //set up communication port
  serial = new p5.SerialPort();       // make a new instance of the serialport library
//   serial.on('list', printList);  // set a callback function for the serialport list event
//   serial.on('connected', serverConnected); // callback for connecting to the server
//   serial.on('open', portOpen);        // callback for the port opening
//   serial.on('data', serialEvent);     // callback for when new data arrives
//   serial.on('error', serialError);    // callback for errors
//   serial.on('close', portClose);      // callback for the port closing
  
//   serial.list();                      // list the serial ports
//   serial.open(portName);              // open a serial port
  

  serial.list();
  serial.on('list', printList);
  serial.on('data', gotData);
  }
  


function draw(){
    
    // THNAKS TO CODINGTRAIN I MIRRORED THE VIDEO FOR BETTER HUMAN INTERACTION
translate(video.width,0);
scale(-1,1);
// End of flipping video
  image(video, 0, 0, width, height);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      // console.log(pose);

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
var led = nose.x;
// END OF NOSE TRACKING THING
  
  // right side setup, using a variable for Part 3 purpose, currently it does not change
//   var rightBrightness = map(led, 0, width, 0, 255);   // read the value from slider and write to visualization
  //fill(rightBrightness);
  //rect(width/2,0,width/2,height);

  // set up serial output, to write the control value to the port
  var rightBrightness = map(led, 0, width, 0, 255);
outData = rightBrightness;
 serial.write(outData);
  
//   serial.write(led);
  console.log("data sent");
}
// var rightBrightness = map(led, 0, width, 0, 255);
// outData = rightBrightness;
//  serial.write(outData);

}

function readInstructions(){
    myVoice.speak("To adjust the brightness of the LED on your Sensor kit, move your head left to right when infront of the webcam.");
}


function modelReady() {
    select('#status').html('Model Loaded');
  }
  
function mousePressed(){
    console.log(JSON.stringify(poses))
  }


function openPort() {
    portName = menu.elt.value;
    serial.open(portName);
  }

  function closePort() {
    portName = menu.elt.value;
    serial.close(portName);
  }
  
  //start of code from three circle 
  // There is data available to work with from the serial port
  function gotData() {
    var currentString = serial.readLine();  // read the incoming string
    trim(currentString);                    // remove any trailing whitespace
    if (!currentString) return;             // if the string is empty, do no more
    // console.log("currentString  ", currentString);             // println the string
    latestData = currentString;            // save it for the draw method
    console.log("latestData" + latestData);   //check to see if data is coming in
    splitter = split(latestData, ',');       // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    // joystickX = splitter[0];                 //put the first sensor's data into a variable
    // joystickY = splitter[1]; 
    // button = splitter[2];
  }
  //end of code from 3 circle
  
  // We got raw data from the serial port
  function gotRawData(thedata) {
    println("gotRawData" + thedata);
  }
  //end from week 6 three circle
  
  function printData() {
    let inString = serial.readStringUntil('\r\n');
    trim(inString);
    if (!inString) return;
    result = inString;
  }
  
  // Got the list of ports
  function printList(serialList) {
    menu = createSelect();
    let title = createElement('option', 'Choose a port:');
    menu.child(title);
    menu.parent("port");
    menu.changed(openPort);

    for (let i = 0; i < serialList.length; i++) {
      let thisOption = createElement('option', serialList[i]);
      thisOption.value = serialList[i];
      menu.child(thisOption);
      print(i + " " + serialList[i]);
    }
  }
  
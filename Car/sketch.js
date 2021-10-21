
/*
Serial list ports
Lists serial ports in an options menu. When you choose one, opens the port
and displays any incoming strings as text onscreen.
Works with P5 editor as the serial server, version 0.5.5 or later.
created 2 Oct 2015
by Tom Igoe
*/

let serial; // Declare a "SerialPort" object
let menu;
let result = '';
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let truck, truckL, motor;
let joystickX = 0, joystickY = 0;
let currentCarPosX = 0;
let currentCarPosY = 0;
let lastCarPosX = 0, lastCarPosY=0;
//refrenced from https://www.youtube.com/watch?v=i2C1hrJMwz0 on how to preload images in p5
function preload(){
  console.log ("did it ");
   motor = loadSound('assets/muscle-car-idle.wav');
truck = loadImage("assets/moonwalk.png");

}


function setup() {
  
  // motor = loadSound('assets/muscle-car-idle.wav');
  truckL = loadImage("assets/truckL.png");
  truck = loadImage("assets/truck.png");
  createCanvas(1000, 900); // window size
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', printList);
  serial.on('data', gotData);
  
}


function draw() {
  background(250);
  fill(0);
  text(latestData, 10, 60);
  noFill();
  drive();
  
  if (joystickX <0){
   
    image (truckL, currentCarPosX, currentCarPosY, truck.width, truck.height);    
  } if (joystickX >=0) {
    
image (truck, currentCarPosX, currentCarPosY, truck.width, truck.height);  }
if (joystickX>0 || joystickY >0 || joystickX<0 || joystickY<0){
  if (!motor.isPlaying()) {
    // .isPlaying() returns a boolean
    motor.loop();
  } }   
else{
     motor.stop();
   }
  
  // image (truck, currentCarPosX, currentCarPosY, truck.width, truck.height);
  console.log("car postition"+ currentCarPosX +","+currentCarPosY);
}

function drive(){
if (currentCarPosX <= (1000- (truck.width)) && currentCarPosX >= 0){
  currentCarPosX = lastCarPosX + joystickX/2;
lastCarPosX= currentCarPosX;}
if (currentCarPosY <= (900-truck.height/2) && currentCarPosY >= 0){
currentCarPosY = lastCarPosY + joystickY/2;
lastCarPosY= currentCarPosY;}
if (currentCarPosY < 0 || lastCarPosY <0){
  currentCarPosY=currentCarPosY*-1;
  lastCarPosY = lastCarPosY*-1;
}
if (currentCarPosX < 0 || lastCarPosX <0){
  currentCarPosX =currentCarPosX*-1;
  lastCarPosX = lastCarPosX*-1;
}

if (currentCarPosX> (1000- (truck.width ))&& currentCarPosX<1000){
  currentCarPosX = currentCarPosX-5;
lastCarPosX= currentCarPosX;}
else{
  lastCarPosX= currentCarPosX;
  lastCarPosY= currentCarPosY;
}


}


function openPort() {
  portName = menu.elt.value;
  serial.open(portName);
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
  joystickX = splitter[0];                 //put the first sensor's data into a variable
  joystickY = splitter[1]; 
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
  menu.position(10, 10);
  menu.changed(openPort);
  for (let i = 0; i < serialList.length; i++) {
    let thisOption = createElement('option', serialList[i]);
    thisOption.value = serialList[i];
    menu.child(thisOption);
    print(i + " " + serialList[i]);
  }
}

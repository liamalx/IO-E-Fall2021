
int brightness = 0;    // variable for indicating how bright the LED is

const int led2Pin = 6;// set up pin for second LED
int led2brightness = 0; // set up another variable for visualize second LED's brightness
int incomingByte; // variable for reading from serial port - from p5.js 

void setup() {
  Serial.begin(9600); // initialize the serial for communication
  pinMode(led1Pin, OUTPUT);  // Set up the LED pin to be an output:  
}

void loop() {
  int sensorValue;

 byte message;

  // check if data has been sent from the computer:
  if (Serial.available()) {
      incomingByte = Serial.read(); // read it
      led2brightness = map(incomingByte, 0, 255, 0, 255); // map the input value to the brightness for second LED
  }
analogWrite(led2Pin, led2brightness); // write the brightness to the led pin 2
]
    }

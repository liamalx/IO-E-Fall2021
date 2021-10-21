//Sprint 1 Cars on a screen make sounds
//Liam Alexander
//Interative Object 1 


int joyX, joyY;
int joy[2];
void setup() {
  Serial.begin(9600); // initialize serial communications
}
 
void loop() {
  // read the input pin:
//  int potentiometer = analogRead(A0);                  
//  // remap the pot value to fit in 1 byte:
//  int mappedPot = map(potentiometer, 0, 1023, 0, 255); 
//  // print it out the serial port:
//  Serial.write(mappedPot);                             
//  // slight delay to stabilize the ADC:
//  delay(1);  

//code from https://learn.parallax.com/tutorials/robot/shield-bot/robotic-drawing-arm-project/putting-it-all-together
//taken the joystick code to gain varibles
  joyX = analogRead(A1);            // reads the value of the potentiometer (value between 0 and 1023)
  joyY = analogRead(A0);            // reads the value of the potentiometer (value between 0 and 1023)

  //Lots of if statements to give the joystick a deadband and reasonable XY response

  if (joyX < 25) joyX = -10;
  if (joyX >= 25 && joyX < 50 ) joyX = -9;
  if (joyX >= 50 && joyX < 75 ) joyX = -8;
  if (joyX >= 75 && joyX < 100 ) joyX = -7;
  if (joyX >= 100 && joyX < 125 ) joyX = -6;
  if (joyX >= 125 && joyX < 150 ) joyX = -5;
  if (joyX >= 150 && joyX < 200 ) joyX = -4;
  if (joyX >= 200 && joyX < 250 ) joyX = -3;
  if (joyX >= 250 && joyX < 300 ) joyX = -2;
  if (joyX >= 300 && joyX < 375 ) joyX = -1;
  if (joyX >= 375 && joyX < 575 ) joyX = 0;
  if (joyX >= 575 && joyX < 650 ) joyX = 1;
  if (joyX >= 650 && joyX < 725 ) joyX = 2;
  if (joyX >= 725 && joyX < 775 ) joyX = 3;
  if (joyX >= 775 && joyX < 825 ) joyX = 4;
  if (joyX >= 825 && joyX < 875 ) joyX = 5;
  if (joyX >= 875 && joyX < 900 ) joyX = 6;
  if (joyX >= 900 && joyX < 925 ) joyX = 7;
  if (joyX >= 925 && joyX < 950 ) joyX = 8;
  if (joyX >= 950 && joyX < 975 ) joyX = 9;
  if (joyX >= 975) joyX = 10;

  if (joyY < 25) joyY = -10;
  if (joyY >= 25 && joyY < 50 ) joyY = -9;
  if (joyY >= 50 && joyY < 75 ) joyY = -8;
  if (joyY >= 75 && joyY < 100 ) joyY = -7;
  if (joyY >= 100 && joyY < 125 ) joyY = -6;
  if (joyY >= 125 && joyY < 150 ) joyY = -5;
  if (joyY >= 150 && joyY < 200 ) joyY = -4;
  if (joyY >= 200 && joyY < 250 ) joyY = -3;
  if (joyY >= 250 && joyY < 300 ) joyY = -2;
  if (joyY >= 300 && joyY < 375 ) joyY = -1;
  if (joyY >= 375 && joyY < 575 ) joyY = 0;
  if (joyY >= 575 && joyY < 650 ) joyY = 1;
  if (joyY >= 650 && joyY < 725 ) joyY = 2;
  if (joyY >= 725 && joyY < 775 ) joyY = 3;
  if (joyY >= 775 && joyY < 825 ) joyY = 4;
  if (joyY >= 825 && joyY < 875 ) joyY = 5;
  if (joyY >= 875 && joyY < 900 ) joyY = 6;
  if (joyY >= 900 && joyY < 925 ) joyY = 7;
  if (joyY >= 925 && joyY < 950 ) joyY = 8;
  if (joyY >= 950 && joyY < 975 ) joyY = 9;
  if (joyY >= 975) joyY = 10;
//end of code borrowed


joy[0] = joyX;
joy[1] = joyY;

//Start of code from week6-threeSensorExample
for (int thisJoy = 0; thisJoy < 2; thisJoy++) {

        int joyValue = joy[thisJoy];
      
      // if you're on the last sensor value, end with a println()
      // otherwise, print a comma
      //The number of sensors needs to be hard coded, in this example 3 sensors are running 0,1,2
      
      Serial.print(joyValue);
      if (thisJoy == 1) {
         Serial.println();
      } else {
         Serial.print(",");
      }
   }
// end of code from week 6-threeSensorsExample
                                            
}

#include "Arduino_SensorKit.h"
int accell[2];
int accellX,accellY;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  while(!Serial);
  
  Accelerometer.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  // 3 axis
//  Serial.print("x:"); 
//  Serial.print(Accelerometer.readX()); 
//  Serial.print("  ");
//  Serial.print("y:"); 
//  Serial.print(Accelerometer.readY());        
//  Serial.print("  ");
//  Serial.print("z:"); 
//  Serial.println(Accelerometer.readZ());
 accell[0] = Accelerometer.readX()*10;
 accell[1]= Accelerometer.readY()*10;
//  delay(500);
  for (int thisSensor = 0; thisSensor < 2; thisSensor++) {

        int sensorValue = accell[thisSensor];
      
      // if you're on the last sensor value, end with a println()
      // otherwise, print a comma
      //The number of sensors needs to be hard coded, in this example 3 sensors are running 0,1,2
      
      Serial.print(sensorValue);
      if (thisSensor == 1) {
         Serial.println();
      } else {
         Serial.print(",");
      }
   }
}

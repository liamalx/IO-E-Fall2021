// ml5.js: Object Detection with COCO-SSD (Webcam Persistance)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ




// let img;
let video;
let detector;
let detections = {};
let idCount = 0;
// an array to add multiple particles
let particles = [];

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }

  let labels = Object.keys(detections);
  for (let label of labels) {
    let objects = detections[label];
    for (let object of objects) {
      object.taken = false;
    }
  }

  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    let label = object.label;

    if (detections[label]) {
      let existing = detections[label];
      if (existing.length == 0) {
        object.id = idCount;
        idCount++;
        existing.push(object);
        object.timer = 100;
      } else {
        // Find the object closest?
        let recordDist = Infinity;
        let closest = null;
        for (let candidate of existing) {
          let d = dist(candidate.x, candidate.y, object.x, object.y);
          if (d < recordDist && !candidate.taken) {
            recordDist = d;
            closest = candidate;
          }
        }
        if (closest) {
          // copy x,y,w,h
          let amt = 0.75; //0.75;
          closest.x = lerp(object.x, closest.x, amt);
          closest.y = lerp(object.y, closest.y, amt);
          closest.width = lerp(object.width, closest.width, amt);
          closest.height = lerp(object.height, closest.height, amt);
          closest.taken = true;
          closest.timer = 100;
        } else {
          object.id = idCount;
          idCount++;
          existing.push(object);
          object.timer = 100;
        }
      }
    } else {
      object.id = idCount;
      idCount++;
      
      detections[label] = [object];
      object.timer = 100;
    }
  }
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);
}


function draw() {
  image(video, 0, 0);
  for(let i = 0;i<particles.length;i++) {
    // particles[i].createParticle();
    
    // particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
   }
  let labels = Object.keys(detections);
  for (let label of labels) {
    let objects = detections[label];
    for (let i = objects.length - 1; i >= 0; i--) {
      let object = objects[i];
      if (object.label == 'person') {
        particles.push(new Particle(object.x,object.y));
        stroke(0, 255, 0);
        strokeWeight(4);
        fill(0, 255, 0, object.timer);
        rect(object.x, object.y, object.width, object.height);
        noStroke();
        fill(0);
        textSize(32);
        text(object.label + " " + object.id, object.x + 10, object.y + 24);
      }
      object.timer -= 2;
      if (object.timer < 0) {
        objects.splice(i, 1);
      }

    }

  }
  

}

// CODE FOR PARTICLE CLASS
// https://p5js.org/examples/simulate-particles.html
// this class describes the properties of a single particle.
// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
    constructor(personX,personY){
       this.x = personX;
      this.y = personY;
      this.r = random(1,8);
      this.xSpeed = random(-2,2);
      this.ySpeed = random(-1,1.5);
    }
  
  // creation of a particle.
    createParticle() {
      noStroke();
      fill('rgba(200,169,169,0.5)');
      circle(this.x,this.y,this.r);
    }
  
  // setting the particle in motion.
    // moveParticle() {
    //   if(this.x < 0 || this.x > width)
    //     this.xSpeed*=-1;
    //   if(this.y < 0 || this.y > height)
    //     this.ySpeed*=-1;
    //   this.x+=this.xSpeed;
    //   this.y+=this.ySpeed;
    // }
  
  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
    joinParticles(particles) {
      particles.forEach(element =>{
        let dis = dist(this.x,this.y,element.x,element.y);
        if(dis<85) {
          stroke('rgba(255,255,255,0.04)');
          line(this.x,this.y,element.x,element.y);
        }
      });
    }
  }
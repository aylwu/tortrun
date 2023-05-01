/*
 * @name TortRun
 * @description TBD
 */
let rectWidth;
let x, y, ox, oy;
let speed=1;
let statsBar;
let direction='STOP';
let prevDirection;
let distance=0;
let framesPerSec=50;
let startTime, stopTime, deltaTime;
let velocity;
let acceleration;

function setup() {
  speed=1;
  direction='STOP';
  distance=0;
  framesPerSec=50;
  startTime=Date.now();
  deltaTime=0;
  velocity=0;
  
  frameRate(framesPerSec);
  statsBar=createGraphics(200, 400);
  let canvas=createCanvas(720, 400);
  ox=x=(width-200)/2+200, oy=y=height/2;
  noStroke();
  background(230);
  rectWidth = width / 4;
  circle(x, y, 20);
}

function draw() {
  statsBar.background(4444);
  // keep draw() here to continue looping while waiting for keys
  moveTort(direction);
  circle(x, y, 20);
  displayStats();
}

function displayStats() {
  
  let texty=10;
  let spos = 'starting position: ('+ox+','+oy+')';
  statsBar.fill(50);
  statsBar.text(spos, 10, texty, 280, 80);

  texty=texty+20;
  let cpos = 'current position: ('+x+','+y+')';
  statsBar.fill(50);
  statsBar.text(cpos, 10, texty, 280, 80);
  
  texty=texty+20;
  let nesw = 'direction: ['+direction+']';
  statsBar.fill(50);
  statsBar.text(nesw, 10, texty, 280, 80);
  
  texty=texty+20;
  velocity=(distance/(deltaTime/1000)).toFixed(2);
  let vel = 'velocity:'+velocity+'m/s';
  statsBar.fill(50);
  statsBar.text(vel, 10, texty, 280, 80);
  
  texty=texty+20;
  acceleration=(velocity/(deltaTime/1000)).toFixed(2)
  let acc = 'acceleration:'+acceleration+'m/s^2';
  statsBar.fill(50);
  statsBar.text(acc, 10, texty, 280, 80);
  
  texty=texty+20;
  let d = 'distance: '+distance+'m';
  statsBar.fill(50);
  statsBar.text(d, 10, texty, 280, 80);
  
  texty=texty+20;
  if (direction!='STOP')
    deltaTime=Date.now()-startTime;
  let t = 'time:'+deltaTime/1000+'s';
  statsBar.fill(50);
  statsBar.text(t, 10, texty, 280, 80);
  
  texty=texty+20;
  let dis = 'displacement:'+dist(ox, oy, x, y).toFixed(2)+'m';
  statsBar.fill(50);
  statsBar.text(dis, 10, texty, 280, 80);
  
  image(statsBar, 0, 0);

}

function moveTort(direction) {
  switch(direction) {
    case 'N':
      if (y>0) {
        y=y-speed;
        distance=distance+speed;
      }
      else
        stopTort();
      break;
    case 'S':
      if (y<400) {
        y=y+speed;
        distance=distance+speed;
      }
      else
        stopTort();
      break;
    case 'E':
      if (x<720) {
        x=x+speed;
        distance=distance+speed;
      }
      else
        stopTort();
      break;
    case 'W':
      if (x>200) {
        x=x-speed;
        distance=distance+speed;
      }
      else
        stopTort();
      break;
  }
}

function stopTort() {
  stopTime=Date.now();
  deltaTime=stopTime-startTime;
  direction='STOP';
  line(ox, oy, x, y);
  // stroke(69);
}

function keyPressed() {
  print(key);
  switch(key) {
    case 'ArrowUp':
      direction='N';
      break;
    case 'ArrowDown':
      direction='S';
      break;
    case 'ArrowRight':
      direction='E';
      break;
    case 'ArrowLeft':
      direction='W';
      break;
    case ' ':
      if (stopTime==undefined) {
        stopTort();
      }
      // if (direction!='STOP') {
      //   prevDirection=direction;
      //   direction='STOP';
      //   stopTime=Date.now();
      //   deltaTime=stopTime-startTime;
      //   print(startTime);
      //   print(stopTime);
      // }
      // else {
      //   direction=prevDirection;
      //   startTime=Date.now();
      // }
      break;
    case 'Enter':
      setup();
      break;
  }
}

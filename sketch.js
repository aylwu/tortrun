/*
 * @name TortRun
 * @description TBD
 */
let rectWidth;
let x, y, ox, oy;
let pixel=1;
let statsBar;
let direction='STOP';
let prevDirection;
let distance=0;
let framesPerSec=50;
let startTime, stopTime, deltaTime;
let velocity;
let acceleration;
let tort;

this.focus();

function setup() {
  pixel=1;
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
  background(189);
  rectWidth = width / 4;
  // circle(x, y, 20);
  tort = loadImage('darealtort.png');
}

// keep draw() here to continue looping while waiting for keys
function draw() {
  statsBar.background(888);
  moveTort(direction);
  // circle(x, y, 10);
  image(tort,x, y);
  stroke(69);
  displayStats();
}

function displayStats() {
  let texty=10;

  statsBar.text('[ENTER] start over', 10, texty, 280, 80);
  texty=texty+20;
  statsBar.text('[SPACE] stop', 10, texty, 280, 80);
  
  texty=texty+20;
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
        y=y-pixel;
        distance=distance+pixel;
      }
      else
        stopTort();
      break;
    case 'S':
      if (y<400) {
        y=y+pixel;
        distance=distance+pixel;
      }
      else
        stopTort();
      break;
    case 'E':
      if (x<720) {
        x=x+pixel;
        distance=distance+pixel;
      }
      else
        stopTort();
      break;
    case 'W':
      if (x>200) {
        x=x-pixel;
        distance=distance+pixel;
      }
      else
        stopTort();
      break;
  }
}

function stopTort() {
  if (direction!='STOP') {
    stopTime=Date.now();
    deltaTime=stopTime-startTime;
    direction='STOP';
    line(ox, oy, x, y);
    stroke(69);    
  }
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
      stopTort();
      break;
    case 'Enter':
      setup();
      break;
  }
}
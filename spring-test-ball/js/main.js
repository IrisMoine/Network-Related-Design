// ball
let x = 0;
let speed = 3;

let spring1 = new Spring();
let handleLeft = {
  x: new Spring(),
  y: 100,
};
let handleRight = {
  x: new Spring(),
  y: 100,
};

let groundLevel = 0.5;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  push();
  background(220);
  fill(255);
  drawGround();
  translate(mouseX, groundLevel * height);
  drawPlayer();
  pop();
  ellipse(x, 200, 100, 100);

  if(x > width){
    speed = -3;
  }

  x = x + speed;
}

function fillGradient() {
  let ctx = drawingContext;
  // Create gradient
  let grd = ctx.createLinearGradient(0, 100, 0, -100);
  grd.addColorStop(0, "black");
  grd.addColorStop(1, "white");
  // Fill with gradient
  ctx.fillStyle = grd;
}

function drawPlayer() {
  translate(0, -50);

  spring1.update(mouseX);
  handleLeft.x.update(mouseX);
  handleRight.x.update(mouseX);

  //stroke("blue");
  fillGradient();
  beginShape();

  vertex(-100, 100);
  bezierVertex(
    -100,
    100,
    -handleLeft.x.pos - 100 + mouseX,
    handleLeft.y,
    spring1.pos - mouseX,
    -100
  );
  vertex(spring1.pos - mouseX, -100);
  bezierVertex(
    spring1.pos - mouseX,
    -100,
    -handleRight.x.pos + 100 + mouseX,
    handleRight.y,
    100,
    100
  );
  vertex(100, 100);
  endShape(CLOSE);
}


function drawGround() {
  rect(0,groundLevel*height, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

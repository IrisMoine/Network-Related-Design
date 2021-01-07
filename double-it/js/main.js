let popSound;

let jumper;

let BALLS = [];

let id = Math.floor(Math.random() * 10000000);

let spring1 = new Spring();
let handleLeft = {
    x: new Spring(),
    y: 100,
};
let handleRight = {
    x: new Spring(),
    y: 100,
};

let upSpring = new Spring();



let groundLevel = 0.5;

function setup() {
    soundFormats('mp3');
    popSound = loadSound('assets/pop-1.mp3');
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);

    jumper = new Jumper();
    BALLS.push(new Ball(-50, 100, 3));

    noStroke();
}

function draw() {

    push();
    background(220);
    fill(255);
    drawGround();

    translate(jumper.pos.x, jumper.pos.y);
    drawPlayer();
    pop();


    jumper.pos.x = mouseX;

    if (mouseIsPressed) {
        jumper.jump(15);
    }

    jumper.run();

    for (let ball of BALLS) {
        ball.run();
    }
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
    upSpring.update(jumper.pos.y);

    //stroke("blue");
    fillGradient();
    beginShape();

    vertex(-100, 100);
    bezierVertex(-100,
        100, -handleLeft.x.pos - 100 + mouseX,
        handleLeft.y + upSpring.transform(jumper.pos.y),
        spring1.pos - mouseX, -100 + upSpring.transform(jumper.pos.y)
    );
    vertex(spring1.pos - mouseX, -100);
    bezierVertex(
        spring1.pos - mouseX, -100 + upSpring.transform(jumper.pos.y), -handleRight.x.pos + 100 + mouseX,
        handleRight.y + upSpring.transform(jumper.pos.y),
        100,
        100
    );
    vertex(100, 100);
    endShape(CLOSE);
}

function mousePressed() {
    // jumper.jump();
    // BALLS.push(new Ball())
}

function createBall(x, y, speed) {
    BALLS.push(new Ball(x, y, speed))
}

function drawGround() {
    rect(0, groundLevel * height, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
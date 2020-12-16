class Ball {
  constructor(x, y, speed) {
    // this.x = 0;
    this.pos = createVector(x, y);
    this.speed = speed;
    this.radius = 50;

    this.collided = false;

    this.collisionEnabled = jumper.onGround;
  }

  update() {
    this.pos.x += this.speed;

    if(this.collisionEnabled !== jumper.onGround && jumper.onGround === true)
    this.collisionEnabled = true;

  }

  display() {
    if(this.collided)
      fill('blue');
    else
      fill('black')

    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }

  run() {
    this.update();
    this.display();
    this.checkCollision();
  }
  
  checkCollision() {

    if(!this.collisionEnabled)
      return;

    let distance = this.pos.dist(jumper.pos);

    this.collided;
    let newCollisionState = distance < jumper.radius + this.radius;

    if(newCollisionState !== this.collided && newCollisionState === true) {
      createBall(this.pos.x-100, this.pos.y, this.speed);
      // this.speed*=2;
      this.pos.x += 100;
    }
      

    this.collided = newCollisionState;
  }
}

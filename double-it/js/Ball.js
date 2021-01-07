class Ball {
    constructor(x, y, speed) {
        // this.x = 0;
        this.pos = createVector(x, y);
        this.speed = speed;
        this.radius = 50;

        this.seed = Math.random();

        this.collided = false;
        this.collidedBord = false;

        this.collisionEnabled = jumper.onGround;
    }

    update() {
        this.pos.x += this.speed;

        if (this.collisionEnabled !== jumper.onGround && jumper.onGround === true)
            this.collisionEnabled = true;
    }

    display() {
        if (this.collided) fill("white") && popSound.play();
        else fill("black");

        ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }

    run() {
        this.pos.y += Math.sin(frameCount * .1 + this.seed * 500) * 2;


        this.update();
        this.display();
        this.checkCollision();
        if (this.pos.x > innerWidth && !this.collidedBord) {
            /* console.log("bord") */
            this.collidedBord = true;
            // créer ball player 2
            SEND_MESSAGE('messages/sendBall', { id: id, val: Math.random() })
        }
        if (this.pos.x > innerWidth + 30) {
            this.destroy();
        }
    }

    checkCollision() {
        if (!this.collisionEnabled) return;

        let distance = this.pos.dist(jumper.pos);

        this.collided;
        let newCollisionState = distance < jumper.radius + this.radius;

        if (newCollisionState !== this.collided && newCollisionState === true) {
            createBall(this.pos.x - 200, this.pos.y, this.speed);
            // this.speed*=2;
            this.pos.x += 50;
        }
        this.collided = newCollisionState;
    }
    destroy() {
        BALLS.splice(BALLS.findIndex(e => e == this), 1);
    }
}
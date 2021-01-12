class Ball {
    constructor(x, y, speed, radius = 50) {
        // this.x = 0;
        this.pos = createVector(x, y);
        this.posYinitial = y;
        this.speed = speed;
        this.radius = radius;
        this.acceleration = createVector(0, 0);
        this.fill = 255;

        this.canCreate = false;
        this.startingTime = time;

        this.seed = Math.random();

        this.collided = false;
        this.collidedBord = false;

        this.collisionEnabled = jumper.onGround;
    }

    update() {
        this.pos.x += this.speed;
        this.pos.y = Math.sin(this.pos.x * Math.PI / 180) * 100 + 150;

        this.pos.add(this.acceleration)
        this.acceleration.mult(.99);



        if (this.collisionEnabled !== jumper.onGround && jumper.onGround === true)
            this.collisionEnabled = true;

        if (!this.canCreate) {
            if (time - this.startingTime > 1000) {
                this.canCreate = true;
            }
        }
    }

    display() {
        if (this.collided || !this.canCreate) this.fill += 1 /* && popSound.play();*/
        else this.fill -= 5;
        fill(this.fill);
        this.fill = Math.max(Math.min(this.fill, 255), 0)

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
            /* SEND_MESSAGE('messages/sendBall', { id: id, val: Math.random() }) */
            if (player == 1) {
                let data = {
                    id: id,
                    x: this.pos.x,
                    y: this.pos.y,
                    speed: this.speed,
                    radius: this.radius,
                    accX: this.acceleration.x,
                    accY: this.acceleration.y,
                    seed: this.seed,
                }
                SEND_MESSAGE('messages/sendBall', data)
            } else {
                score++;
                SEND_MESSAGE('score', { score: score });
            }
        }
        if (this.pos.x > innerWidth + 30) {
            this.destroyFlag = true;
        }
    }

    checkCollision() {
        if (!this.collisionEnabled) return;

        let distance = this.pos.dist(jumper.pos);

        this.collided;
        let newCollisionState = distance < jumper.radius + this.radius;

        if (newCollisionState !== this.collided && newCollisionState === true && this.canCreate && this.radius > 20 && player == 1) {
            this.canCreate = false;
            this.fill = 255
            this.startingTime = time;
            console.log(this.radius)
            this.radius *= .75;
            /* createBall(this.pos.x - 200, this.pos.y, this.speed, this.radius); */
            /* createBall(this.pos.x, this.pos.y, this.speed, this.radius); */
            var b = new Ball(this.pos.x, this.pos.y, this.speed, this.radius);
            /* b.acceleration.x = 1; */
            b.seed = this.seed;
            BALLS.push(b);
            // this.speed*=2;
            /* this.pos.x += 50; */
            this.acceleration.x -= 3;
        }
        if (player == 2 && newCollisionState !== this.collided && newCollisionState === true) {
            this.destroyFlag = true;
        }
        this.collided = newCollisionState;
    }
    destroy() {
        BALLS.splice(BALLS.findIndex(e => e == this), 1);
        delete this;
    }
}
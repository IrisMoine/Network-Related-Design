class Jumper {
	constructor() {
		let groundPosY = groundLevel * height;

		this.pos = createVector(width>>1,groundPosY);
		this.vel = createVector();
		this.grav = 0.9;
		this.radius = 100;

		this.onGround = true;
		
	}

	update() {
		let groundPosY = groundLevel * height;

		this.vel.y += this.grav; // vy = vy + gravity;
		this.pos.y += this.vel.y; // y = y + vy;
		this.pos.y = constrain(this.pos.y, -1000, groundPosY);

		if(this.pos.y === groundPosY)
			this.onGround = true;

	}

	display() {
		fill('red');
		ellipse(this.pos.x,this.pos.y, this.radius*2);
	}

	jump(force = 24) {

		this.onGround = false;

		let groundPosY = groundLevel * height;
		this.vel.y = -force * map(this.pos.y, groundPosY, 0, 1, 0);
	}

	run() {
		this.update()
		// this.display();
	}
}
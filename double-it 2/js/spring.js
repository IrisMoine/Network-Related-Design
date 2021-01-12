class Spring {

    constructor() {
        this.pos = 0;
        this.vel = 0;
        this.drag = 0.75;
        this.strength = 0.1;
    }

    update(target) {

        let force = target - this.pos;
        force *= this.strength;

        this.vel *= this.drag;
        this.vel += force;

        this.pos += this.vel;
    }
    transform(offset) {
        return this.pos - offset;
    }
}
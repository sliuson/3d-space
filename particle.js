class Particle {

    constructor(pos, vel, mass) {
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.accel = createVector(0, 0, 0);
    }

    applyForce(F) {
        this.accel = p5.Vector.div(F, this.mass);
    }
    getMass() {
        return this.mass;
    }
    updatePhysics() {
        addInstantaneousVector(this.vel, this.accel);
        addInstantaneousVector(this.pos, this.vel);

    }



}
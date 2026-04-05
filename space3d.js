class Space3D {
    //There's 2 parts of this class:
    //1) the space: particles with mass in a xyz-coordinate system
    //2) the camera: a 2d projection of that 3d space that we can view.
    //The only interaction between these two things should be the space passing the camera particle coordinates and visual properties (size).
    //camera should never affect the world



    constructor(screenWidth, screenHeight, currentlyPressed, camPosition, camDirection, focalLength) {
        this.particles = [];
        this.cams = [];
        this.minParticleSize = 10;
        this.massSize = 10;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.currentlyPressed = currentlyPressed;
        this.cams.push(new Camera(camPosition, camDirection, focalLength));
        this.setActiveCam(this.cams[0]);

        

    }

    updateMovement(currentlyPressed) {
        this.updatePhysics();
        this.activeCam.movement(currentlyPressed);
    }


    //world function
    updatePhysics() {
        let momentum = createVector(0, 0, 0);
        for (let p of this.particles) {
            p.updatePhysics();
            momentum.add(p5.Vector.mult(p.vel, p.mass));
        }
    }

    //interface function
    drawSpace() {
        background(0);
        for (let i = 0; i < this.particles.length; i++) {
            let totalParticleSize = (this.minParticleSize + this.particles[i].mass / this.massSize) * 1000 / p5.Vector.sub(this.activeCam.pos, this.particles[i].pos).mag();
            this.projectPoint(this.particles[i].pos, this.totalParticleSize, this.activeCam, this.screenWidth, this.screenHeight);
        }
    }
    //world function
    addParticle(pos, vel, mass) {
        this.particles.push(new Particle(pos, vel, mass));
    }

    //camera function
    setActiveCam(cam) {
        this.activeCam = cam;
    }
    //camera function
    addCam(pos, direction, focalLength) {
        this.cams.push(new Camera(pos, direction, focalLength));
    }
    //camera function
    projectPoint(pos, pointSize, cam, screenWidth, screenHeight) {
        stroke(255);
        fill(255);

        //shift point
        let translatedPoint = p5.Vector.sub(pos, cam.pos);
        //rotate point around camera (active rotation, so use negative cam angle)
        let relativePoint = getRotatedYaw(translatedPoint, -cam.direction.x);
        relativePoint = getRotatedPitch(relativePoint, -cam.direction.y);

        if (relativePoint.z > 0) {
            return;
        }

        //*-1 on both because forward is negative z
        let projectedX = cam.focalLength * relativePoint.x / (relativePoint.z * -1) + screenWidth / 2;
        //*-1 to counteract processing flipped y axis
        let projectedY = (cam.focalLength * relativePoint.y / (relativePoint.z * -1)) * -1 + screenHeight / 2;
        //if(projectedX > screenWidth + pointSize/2 ||
        //  projectedX < 0-pointSize/2 ||
        //  projectedY > screenHeight + point
        strokeWeight(pointSize);
        point(projectedX, projectedY);
    }







}
let space;
function setup() {
    createCanvas(1600, 1200);
    frameRate(200);
    space = new Space3D(width, height, currentlyPressed, createVector(0, 0, 0), createVector(0, 0), 700);
    intializeParticles();
}


function draw() {
    for (let p of space.particles) {
        p.accel = createVector(0, 0, 0);
    }
    space.updateMovement(currentlyPressed);

    if (frameCount % 3 == 0) {
        space.drawSpace();
    }

}


//ACTIVE ROTATIONS
function getRotatedYaw(V, yaw) {

    /* latitude change
   Ry=
   cos  0  -sin
    0   1   0
   sin 0  cos
   **Transpose of normal y rotation matrix
   **because we want positive yaw to be rightward
   */
    return createVector(V.x * cos(yaw) + -V.z * sin(yaw),
        V.y,
        V.x * sin(yaw) + V.z * cos(yaw));


}
function getRotatedPitch(V, pitch) {
    /* longitude change
    Rx =
    1,0,0
    0,cos,-sin
    0,sin,cos
    */
    return createVector(V.x,
        V.y * cos(pitch) - V.z * sin(pitch),
        V.y * sin(pitch) + V.z * cos(pitch));
}

function addInstantaneousVector(V1, V2) {

    V1.add(p5.Vector.div(V2, frameRate));
}

function randomSpherePositions(R, n) {
    let points = [];
    for (let i = 0; i < n; i++) {

        let phi = 2 * PI * random(0, 1);
        let theta = acos(2 * random(0, 1) - 1);
        let r = random(0, R);
        points.push(createVector(r * sin(phi) * cos(theta), r * sin(phi) * sin(theta), r * cos(phi)));
    }
    return points;

}
function intializeParticles() {
    let n = 1000;
    let pos = randomSpherePositions(1000, n);
    let velocityRange = 10;
    for (let i = 0; i < 1000; i++) {
        space.particles.push(new Particle(pos[i], createVector(random(-velocityRange, velocityRange), random(-velocityRange, velocityRange), random(-velocityRange, velocityRange)), 1));
    }

}

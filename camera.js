class Camera {
    constructor(pos, direction, focalLength) {
      this.pos = pos;
      this.focalLength = focalLength;
      //latitude,longitude
      this.direction=direction;
      this.speed = 300;
      this.tiltSpeed = PI/100;
    }
    movement(currentlyPressed) {
  
      let moveDirection = createVector(0,0,0);
      let tiltDirection = createVector(0,0);
      for (let i = 0; i < currentlyPressed.length; i ++) {
        //when looking at xy-plane, forward is -z
        if (currentlyPressed[i] == 'w') {
          moveDirection.z -=1;
        }
        if (currentlyPressed[i] == 's') {
          moveDirection.z +=1;
        }
        if (currentlyPressed[i] == 'd') {
          moveDirection.x += 1;
        }
        if (currentlyPressed[i] == 'a') {
          moveDirection.x -=1;
        }
        if (currentlyPressed[i] == 'e') {
          moveDirection.y +=1;
        }
        if (currentlyPressed[i] == 'q') {
          moveDirection.y -=1;
        }
        
        
        if (currentlyPressed[i] == 'l'){
          tiltDirection.x += 1;
        }
        if (currentlyPressed[i] == 'j'){
          tiltDirection.x -= 1;
        }
        if (currentlyPressed[i] == 'i'){
          tiltDirection.y += 1;
        }
        if (currentlyPressed[i] == 'k'){
          tiltDirection.y -= 1;
        }
      }
      tiltDirection.normalize();
      moveDirection.normalize();
      
      //convert from relative movement vector to world movement vector
      moveDirection = getRotatedPitch(moveDirection, this.direction.y);
      moveDirection = getRotatedYaw(moveDirection, this.direction.x);
      
      
      
      let velocity = moveDirection.mult(this.speed);
      let tiltVelocity = tiltDirection.mult(this.tiltSpeed);
      
      let frameVelocity = p5.Vector.div(velocity,frameRate);
      let frameTiltVelocity = p5.Vector.div(tiltVelocity,frameRate);
      this.direction.add(frameTiltVelocity);
      this.pos.add(frameVelocity);
    }
  }
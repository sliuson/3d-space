let currentlyPressed = [];

function keyPressed(){
  
  for(let i = 0; i <currentlyPressed.length; i ++){
    if(currentlyPressed[i] == key){
      return;
    }
  }
  currentlyPressed.push(key);
}
function keyReleased(){
  for (let i = 0; i < currentlyPressed.length; i ++){
    if(currentlyPressed[i] == key){
      currentlyPressed.splice(i,1);
      i--;
    }
  }
  
}
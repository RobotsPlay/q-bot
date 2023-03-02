import Level from './Level.js';
import Screen from './Screen.js';

let screen = new Screen();
let level = new Level(screen);

function animate() {
  requestAnimationFrame( animate );

  level.updateCube();
  screen.renderScene();
}
animate();
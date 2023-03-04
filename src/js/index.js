import Level from './Level.js';
import Player from './Player.js';
import Screen from './Screen.js';

let screen = new Screen();
let level = new Level(screen);

let player = new Player(screen);
player.setCurrentCube(level.cubes[level.cubes.length -1]);

window.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'ArrowLeft':
      player.move('left', level.cubes);
      break;
    case 'ArrowUp':
        player.move('up', level.cubes);
        break;
    case 'ArrowRight':
      player.move('right', level.cubes);
      break;
    case 'ArrowDown':
      player.move('down', level.cubes);
      break;
    default:
      return;
  }
});

function animate() {
  requestAnimationFrame( animate );

  level.update();
  player.update();
  screen.renderScene();
}
animate();
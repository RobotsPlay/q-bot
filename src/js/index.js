import Level from './Level.js';
import Player from './Player.js';
import Screen from './Screen.js';

let screen = new Screen();
let level = new Level(screen);

let player = new Player(screen, level);
player.setCurrentCube(level.cubes[level.cubes.length -1], false);

window.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'ArrowLeft':
      player.move('left');
      break;
    case 'ArrowUp':
        player.move('up');
        break;
    case 'ArrowRight':
      player.move('right');
      break;
    case 'ArrowDown':
      player.move('down');
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
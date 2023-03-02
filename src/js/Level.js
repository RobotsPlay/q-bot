import * as THREE from 'three';

export default class Level {
  constructor(screen) {
    this.screen = screen;
    this.cube_size = 1;
    this.board_rows = 7;

    this.createBoard();
  }

  createBoard() {
    const colors = [
      0x22dddd,
      0x62dddd,
      0x922dddd,
      0xf2dddd,
      0x221ddd,
      0x544d33,
      0x227d74,
      0x22dddd,
      0x22dd3d,
      0x22dd8d
    ];

    const geometry = new THREE.BoxGeometry(this.cube_size, this.cube_size, this.cube_size);
    const cube_hypot = Math.hypot(this.cube_size, this.cube_size);
    
    for(let row_count = this.board_rows; row_count > 0; row_count--) {
      const y_pos = (this.board_rows - row_count) * this.cube_size;
      const z_pos = 0 - (this.board_rows - row_count) * (cube_hypot / 2);
      console.log(y_pos);
      
      for(let cube_count = row_count; cube_count > 0; cube_count--) {
        const material = new THREE.MeshLambertMaterial({ color: colors[Math.floor(Math.random() * (9 - 0 + 1) + 0)]});
        const start_x_offset = 0 - (cube_hypot * cube_count / 2);
        const x_pos = start_x_offset + ((row_count - cube_count) * (cube_hypot / 2));
        let cube = new THREE.Mesh(geometry, material);
        
        cube.position.x = x_pos;
        cube.position.y = y_pos;
        cube.position.z = z_pos;
  
        cube.rotation.y = 0.785398;
        
        this.screen.scene.add(cube);

      }
    }
  }

  updateCube() {

  }
}
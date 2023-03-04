import * as THREE from 'three';

export default class Level {
  constructor(screen) {
    this.screen = screen;
    this.cube_size = 1.25;
    this.board_rows = 7;
    this.cubes = [];

    this.createBoard();
  }

  createBoard() {
    const geometry = new THREE.BoxGeometry(this.cube_size, this.cube_size * .8, this.cube_size);
    const cube_hypot = Math.hypot(this.cube_size, this.cube_size);
    let current_index = 0;

    for(let row_count = this.board_rows; row_count > 0; row_count--) {
      const y_pos = ((this.board_rows - row_count) * this.cube_size * .8) + ((this.cube_size * .8) / 2);
      const z_pos = 0 - (this.board_rows - row_count) * (cube_hypot / 2);
      
      for(let cube_count = row_count; cube_count > 0; cube_count--) {
        const material = new THREE.MeshLambertMaterial({color: 0x22dddd});
        const start_x_offset = 0 - (cube_hypot * cube_count / 2) + (cube_hypot / 2);
        const x_pos = start_x_offset + ((row_count - cube_count) * (cube_hypot / 2));
        let cube = new THREE.Mesh(geometry, material);
        
        cube.position.x = x_pos;
        cube.position.y = y_pos;
        cube.position.z = z_pos;
  
        cube.rotation.y = 0.785398;
        
        this.screen.scene.add(cube);

        let left = null;
        let up = null;
        let right = null;
        let down = null;

        // calculate linked cubes
        // left
        if(row_count !== this.board_rows) { // is not in first row
          left = current_index - row_count - 1;
        }

        // up
        if(cube_count !== row_count) { // is not first of row
          up = current_index + row_count - 1;          
        }

        // right
        if(cube_count > 1) { // is not last of row
          right = current_index + row_count;      
        }

        // down
        if(row_count !== this.board_rows) { // is not in last row
          down = current_index - row_count;
        }

        this.cubes.push({
          mesh: cube,
          status: 0,
          point: new THREE.Vector3(cube.position.x, cube.position.y + ((this.cube_size * .8) / 2), cube.position.z),
          left,
          up,
          right,
          down
        });

        current_index++;
      }
    }
  }

  update() {

  }
}
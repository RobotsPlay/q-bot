import {
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  Mesh,
  MeshLambertMaterial,
  Vector3
} from 'three';

const base_color = 0x2266ee;
const states = [
  {
    color: 0x22dddd,
    next: 1,
    score: 25
  },
  {
    color: 0xfca510,
    next: 1,
    score: 0
  }
]

export default class Level {
  constructor(screen) {
    this.screen = screen;
    this.cube_size = 1.25;
    this.board_rows = 7;
    this.cubes = [];

    this.createBoard();
  }

  createBoard() {
    const cube_hypot = Math.hypot(this.cube_size, this.cube_size);
    let current_index = 0;

    for(let row_count = this.board_rows; row_count > 0; row_count--) {
      const y_pos = ((this.board_rows - row_count) * this.cube_size * .8) + ((this.cube_size * .8) / 2);
      const z_pos = 0 - (this.board_rows - row_count) * (cube_hypot / 2);
      
      for(let cube_count = row_count; cube_count > 0; cube_count--) {
        const geometry = new BoxGeometry(this.cube_size, this.cube_size * .8, this.cube_size).toNonIndexed();
        const material = new MeshLambertMaterial({
          vertexColors: true
        });
        const start_x_offset = 0 - (cube_hypot * cube_count / 2) + (cube_hypot / 2);
        const x_pos = start_x_offset + ((row_count - cube_count) * (cube_hypot / 2));

        let mesh = new Mesh(geometry, material);
        
        mesh.position.x = x_pos;
        mesh.position.y = y_pos;
        mesh.position.z = z_pos;
  
        mesh.rotation.y = 0.785398;
        
        this.screen.scene.add(mesh);

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

        let cube = {
          geometry,
          mesh,
          material,
          state: 0,
          point: new Vector3(mesh.position.x, mesh.position.y + ((this.cube_size * .8) / 2), mesh.position.z),
          left,
          up,
          right,
          down,
          index: current_index
        };

        this.setCubeColor(cube);

        this.cubes.push(cube);

        current_index++;
      }
    }
  }

  setCubeColor(cube) {
    const colors = [];
    let top_color =  new Color().setHex(states[cube.state].color);
    let three_base = new Color().setHex(base_color);

    // add colors for all 36 cube vertices
    for(let i = 0; i < 36; i++) {
      if(i > 11 && i < 18) { // for top face vertices use top color
        colors.push(top_color.r, top_color.g, top_color.b);
      }
      else { // otherwise use base color
        colors.push(three_base.r, three_base.g, three_base.b);
      }
    }
    cube.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
  }

  advanceCubeState(cube) {
    cube.state = states[cube.state].next;
    this.setCubeColor(cube);
  }

  update() {

  }
}
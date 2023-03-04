import {
    Mesh,
    MeshLambertMaterial,
    SphereGeometry
} from 'three';

export default class Player {
    constructor(screen, level) {
        this.screen = screen;
        this.level = level;
        this.current_cube = null;
        this.radius = .325;

        this.createAvatar();
    }

    createAvatar() {
        const geometry = new SphereGeometry(this.radius, 12, 12);
        const material = new MeshLambertMaterial({color: 0xee0000});
        this.avatar = new Mesh(geometry, material);
        this.avatar.position.x = 0;
        this.avatar.position.y = 0;
        this.avatar.position.z = 1;

        this.screen.scene.add(this.avatar);
    }

    setCurrentCube(cube, advanceCubeState = true) {
        this.current_cube = cube;
        this.avatar.position.x = cube.point.x;
        this.avatar.position.y = cube.point.y + (this.radius);
        this.avatar.position.z = cube.point.z;

        if(advanceCubeState) {
            this.level.advanceCubeState(this.current_cube);
        }
    }

    move(direction) {
        if(this.current_cube[direction] !== null && this.level.cubes[this.current_cube[direction]]) {
            this.setCurrentCube(this.level.cubes[this.current_cube[direction]]);

            
        }
    }

    update() {

    }
}
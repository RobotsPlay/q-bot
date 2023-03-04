import * as THREE from 'three';

export default class Player {
    constructor(screen) {
        this.screen = screen;
        this.current_cube = null;
        this.radius = .325;

        this.createAvatar();
    }

    createAvatar() {
        const geometry = new THREE.SphereGeometry(this.radius, 12, 12);
        const material = new THREE.MeshLambertMaterial({color: 0xee0000});
        this.avatar = new THREE.Mesh(geometry, material);
        this.avatar.position.x = 0;
        this.avatar.position.y = 0;
        this.avatar.position.z = 1;

        this.screen.scene.add(this.avatar);
    }

    setCurrentCube(cube) {
        this.current_cube = cube;
        this.avatar.position.x = cube.point.x;
        this.avatar.position.y = cube.point.y + (this.radius);
        this.avatar.position.z = cube.point.z;
    }

    move(direction, cubes) {
        if(this.current_cube[direction] !== null && cubes[this.current_cube[direction]]) {
            this.setCurrentCube(cubes[this.current_cube[direction]]);
        }
    }

    update() {

    }
}
import * as THREE from 'three';

export default class Level {
  constructor(screen) {
    this.screen = screen;
    this.cube;

    this.createCube();
  }

  createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x22dddd });
    this.cube = new THREE.Mesh(geometry, material);
    this.screen.scene.add(this.cube);
  }

  updateCube() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}
import * as THREE from 'three';

export default class Screen {
  constructor() {
    this.scene;
    this.camera;
    this.renderer;
    this.cube;

    this.initThree();
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;
  }

  renderScene() {
    this.renderer.render( this.scene, this.camera );
  }
}
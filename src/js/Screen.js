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
    this.camera = new THREE.OrthographicCamera(window.innerWidth / -165, window.innerWidth / 165, window.innerHeight / 165, window.innerHeight / -165, 1, 1000);

    var ambient_light = new THREE.AmbientLight(0x404040);
    this.scene.add(ambient_light);

    let light = new THREE.HemisphereLight(0x404040, 0xFFFFFF, 0.5);
    this.scene.add(light);

    let direction_light = new THREE.DirectionalLight(0x404040, 0.5);
    this.scene.add(direction_light);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.x = 0;
    this.camera.position.z = 1;
    this.camera.position.y = 6;

    this.camera.rotation.x= -0.58398;
  }

  renderScene() {
    this.renderer.render( this.scene, this.camera );
  }
}
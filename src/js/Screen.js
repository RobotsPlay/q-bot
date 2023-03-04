import {
  AmbientLight,
  DirectionalLight,
  OrthographicCamera,
  Scene,
  WebGLRenderer
} from 'three';

export default class Screen {
  constructor() {
    this.scene;
    this.camera;
    this.renderer;
    this.cube;

    this.initThree();
  }

  initThree() {

    this.scene = new Scene();
    this.camera = new OrthographicCamera(window.innerWidth / -165, window.innerWidth / 165, window.innerHeight / 165, window.innerHeight / -165, 1, 1000);

    var ambient_light = new AmbientLight(0xffffff, .75);
    this.scene.add(ambient_light);

    let direction_light = new DirectionalLight(0xffffff, .325);
    this.scene.add(direction_light);
    
    const directional_light_side = new DirectionalLight(0xffffff, .25);
    directional_light_side.position.set(10, -10, 10);
    this.scene.add( directional_light_side );

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.x = 0;
    this.camera.position.z = 1;
    this.camera.position.y = 6;

    this.camera.rotation.x= -0.58398;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }
}
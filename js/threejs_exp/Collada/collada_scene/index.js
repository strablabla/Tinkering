// Generated by CoffeeScript 1.4.0
(function() {
  var D, aspect, camera, height, light, loader, material, renderer, scene, width;

  width = 960;

  height = 500;

  aspect = width / height;

  D = 8;

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(-D * aspect, D * aspect, D, -D, 1, 1000);

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });

  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  material = new THREE.MeshPhongMaterial({
    wireframe: true
  });

  light = new THREE.DirectionalLight(0xffffff, 1.1);

  light.position.set(10, 20, 15);

  scene.add(light);

  camera.position.set(20, 20, 20);

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  camera.rotation.z = 5 / 6 * Math.PI;

  loader = new THREE.ColladaLoader();

  loader.load('scene.dae', function(collada) {
    collada.scene.scale.set(0.1, 0.1, 0.1);
    scene.add(collada.scene);
    return renderer.render(scene, camera);
  });

}).call(this);
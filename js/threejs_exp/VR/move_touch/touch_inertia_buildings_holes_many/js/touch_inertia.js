
var moving = false
var clock = new THREE.Clock();

function init() {
      renderer = new THREE.WebGLRenderer();
      //----------------
      renderer.physicallyCorrectLights = true;
      renderer.gammaInput = true;
      renderer.gammaOutput = true;
      renderer.shadowMap.enabled = true;
      //-------------
      element = renderer.domElement;
      container = document.getElementById('container');
      container.appendChild(element);
      //-------------
      effect = new THREE.StereoEffect(renderer);
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
      camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);
      //camera.position.set(-500, 400, -200);
      camera.position.set(dist/2, dist/2, dist/2);
      scene.add(camera);
      //-------------
      controls = new THREE.OrbitControls(camera, element);
      // controls.rotateUp(Math.PI / 4);
      controls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
      );
      controls.noZoom = true;
      controls.noPan = true;

    function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();
        element.addEventListener('click', fullscreen, false);
        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);

      hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6 );
      scene.add( hemiLight );


      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);
      window.addEventListener('touchstart', function() {
          moving = !moving
         }); // end touchstart
} // end init

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;
  //-------------
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  //renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();
  camera.updateProjectionMatrix();
  controls.update(dt);
}

var previousShadowMap = false;
function render(dt) {
  if (moving){
      var direction = camera.getWorldDirection();
      distance = 2;
      camera.position.add( direction.multiplyScalar(distance) );
  }

  // renderer.toneMappingExposure = Math.pow( params.exposure, 5.0 ); // to allow for very bright scenes.
  // renderer.shadowMap.enabled = params.shadows;
  // hemiLight.intensity = hemiLuminousIrradiances[ params.hemiIrradiance ];
  effect.render(scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);
  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

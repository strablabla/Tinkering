
var camera, scene, renderer;
var effect, controls;
var element, container;
var bulbLight, bulbMat, floorMat, hemiLight
var dist = 500
var size_cube = 5
var size_house_piece = 50
var size_bulb = 5
var param_bulb = 0
var moving = false


var geometry, material, mesh;
var objects = [];
var raycaster;

var instructions = document.getElementById( 'instructions' );
var size_house_piece = 50
var dist = 500

window.onload = function(event) {



    var params = {
        shadows: true,
        exposure: 0.68,
        bulbPower: Object.keys( bulbLuminousPowers )[ 0 ],
        hemiIrradiance: Object.keys( hemiLuminousIrradiances )[0]
    };

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

      effect = new THREE.StereoEffect(renderer);

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
      hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
      scene.add( hemiLight );

      camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 10000);
      //camera.position.set(-500, 400, -200);
      camera.position.set(dist/2, dist/2, dist/2);
      scene.add(camera);

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

    } // end init


   window.addEventListener('deviceorientation', setOrientationControls, true);

    //   Bulb light

    list_bulbs = []
    bulbMat = new THREE.MeshStandardMaterial ( {
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000
       });
    for (i=0; i<10; i++){
          var bulbGeometry = new THREE.SphereGeometry( size_bulb, 16, 8 );
          bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );
          bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
          bulbLight.castShadow = true;
          bulbLight.position.set( Math.random()*300, Math.random()*300, 100 );
          list_bulbs.push(bulbLight)
          scene.add( bulbLight );
    }

    // Sky

     var size_sphere = 1000
     make_sky(size_sphere)

      // Buildings

      list_house_pieces = []

      for (i = 0; i<15; i++){
        //make_groundy()
        //make_ground_repetitive('Decor/photo-oriental-mosaic-decoration-in-doha.jpg', 0, 30, 16)
        sx = size_house_piece
        sy = (1+Math.random()*0.3)*size_house_piece
        sz = size_house_piece
        var geom_house_piece = new THREE.CubeGeometry( sx, sy, sz )
        //var material_house_piece = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        var material_house_piece = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("textures/brick_diffuse.jpg") })
        house_piece = new THREE.Mesh( geom_house_piece, material_house_piece );
        //   house_piece.setColor( 0xffffff );
        //alert(Math.random())
        house_piece.position.y = sy/2; //*Math.power(-1,i);
        house_piece.position.z = Math.random()*dist;
        house_piece.position.x = Math.random()*dist;
        list_house_pieces.push(house_piece)
        scene.add(house_piece);
      }

          };

      make_ground(3000)

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);

      window.addEventListener('touchstart', function() {
          moving = !moving
         }); // end touchstart
    }

    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

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

      renderer.toneMappingExposure = Math.pow( params.exposure, 5.0 ); // to allow for very bright scenes.
      renderer.shadowMap.enabled = params.shadows;

      if( params.shadows !== previousShadowMap ) {
        //   material.needsUpdate = true;
          //floorMat.needsUpdate = true;
          previousShadowMap = params.shadows;
      }

      bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.02, 2.0 ); // convert from intensity to irradiance at bulb surface
      hemiLight.intensity = hemiLuminousIrradiances[ params.hemiIrradiance ];
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

    init();
    animate();

}

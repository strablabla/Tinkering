window.onload = function(event) {

    var camera, scene, renderer;
    var effect, controls;
    var element, container;
    var bulbLight, bulbMat
    var dist = 500
    var size_cube = 20

    // ref for lumens: http://www.power-sure.com/lumens.htm
    var bulbLuminousPowers = {
        "110000 lm (1000W)": 110000,
        "3500 lm (300W)": 3500,
        "1700 lm (100W)": 1700,
        "800 lm (60W)": 800,
        "400 lm (40W)": 400,
        "180 lm (25W)": 180,
        "20 lm (4W)": 20,
        "Off": 0
    };

    // ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
    var hemiLuminousIrradiances = {
        "0.0001 lx (Moonless Night)": 0.0001,
        "0.002 lx (Night Airglow)": 0.002,
        "0.5 lx (Full Moon)": 0.5,
        "3.4 lx (City Twilight)": 3.4,
        "50 lx (Living Room)": 50,
        "100 lx (Very Overcast)": 100,
        "350 lx (Office Room)": 350,
        "400 lx (Sunrise/Sunset)": 400,
        "1000 lx (Overcast)": 1000,
        "18000 lx (Daylight)": 18000,
        "50000 lx (Direct Sun)": 50000
    };

    var params = {
        shadows: true,
        exposure: 0.68,
        bulbPower: Object.keys( bulbLuminousPowers )[ 4 ],
        hemiIrradiance: Object.keys( hemiLuminousIrradiances )[0]
    };

    var clock = new THREE.Clock();

    init();
    animate();

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

      camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);
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
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);

    //   Bulb light

      var bulbGeometry = new THREE.SphereGeometry( 0.02, 16, 8 );
      bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );

      bulbMat = new THREE.MeshStandardMaterial ( {
          emissive: 0xffffee,
          emissiveIntensity: 1,
          color: 0x000000
      });
      bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      // bulbLight.position.set( 1000, 2000, 1000 );
      bulbLight.castShadow = true;
      scene.add( bulbLight );

      var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
      //var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
      //var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      scene.add(light);

      // Floor

      var texture = THREE.ImageUtils.loadTexture(
        'texture/checker.png'
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat = new THREE.Vector2(50, 50);
      texture.anisotropy = renderer.getMaxAnisotropy();

      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
      });

      var geometry = new THREE.PlaneGeometry(1000, 1000);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);


      list_cubes = []

      for (i=0; i<3; i++){

          cube = new THREE.Mesh( new THREE.CubeGeometry( size_cube, size_cube, size_cube ), new THREE.MeshNormalMaterial() );
          //alert(Math.random())
          cube.position.y = Math.random()*dist; //*Math.power(-1,i);
          cube.position.z = Math.random()*dist;
          cube.position.x = Math.random()*dist;
          bulbLight.position.set( cube.position.x+500, cube.position.y+500, cube.position.z+500 );
          list_cubes.push(cube)
          scene.add(cube);
      }

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);
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

    function render(dt) {

      for (i in list_cubes){
          var cube = list_cubes[i]
          cube.rotation.x += 0.2* Math.random();
          cube.rotation.y += 0.225* Math.random();
          cube.rotation.z += 0.175* Math.random();
      }

    //   effect.toneMappingExposure = Math.pow( params.exposure, 5.0 ); // to allow for very bright scenes.
    //   effect.shadowMap.enabled = params.shadows;
      bulbLight.castShadow = params.shadows;
      //
      bulbLight.power = bulbLuminousPowers[ params.bulbPower ];
      bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.02, 2.0 ); // convert from intensity to irradiance at bulb surface

    //   bulbLight.position.y = 2000 *(Math.cos( dt ) * 0.75 + 1.25);

      effect.render(scene, camera);
    }


    function animate(t) {
      requestAnimationFrame(animate);
      for (i in list_cubes){
          var cube = list_cubes[i]
          cube.rotation.x += 0.005;
          cube.rotation.y += 0.01;
      }

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

}

function tableau(txt, size,  x, z, y, roty){
    // on créé un  plan pour lequel on définit un matériau puis on l’ajoute à la scène
    var geom = new THREE.PlaneGeometry( size, size, 2);
    var mat= new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(txt), overdraw: true } );
    var tabl = new THREE.Mesh( geom, mat); // , new THREE.SphericalReflectionMapping()

    tabl.position.x = +x;
    tabl.position.z = +z;
    tabl.rotation.y += roty;
    tabl.position.y = y; //hauteur
    scene.add(tabl);
}

function make_ground(pic, level) {
  var geom = new THREE.CubeGeometry( 500, 1, 500);
  var mat = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( pic
  ), overdraw: true, receiveShadow : true  } ); // new THREE.SphericalReflectionMapping()
  ground = new THREE.Mesh(geom, mat);
  ground.position.y = level;
  scene.add(ground);
}

function make_ground_repetitive(pic, level, size) {
    halfnb = 10
    for (j=-halfnb; j<halfnb; j++){
          for (i=-halfnb; i<halfnb; i++){
              var geom = new THREE.CubeGeometry( size, 1, size);
              var mat = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( pic
              ), overdraw: true, receiveShadow : true  } ); // new THREE.SphericalReflectionMapping()
              ground = new THREE.Mesh(geom, mat);
              ground.position.y = level;
              ground.position.x = size*i
              ground.position.z = size*j;
              scene.add(ground);
         }
      }

}
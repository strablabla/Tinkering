function import_collada(addr, scale, position, rotation){ // import collada files
    loader = new THREE.ColladaLoader();
    loader.load(addr, function(collada) {
      collada.scene.scale.set(scale[0],scale[1],scale[2]);
      collada.scene.position.x = position[0];
      collada.scene.position.y = position[1];
      collada.scene.position.z = position[2];
      collada.scene.rotation.x = rotation[0];
      scene.add(collada.scene)
    })
}// end import_collada

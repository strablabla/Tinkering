function make_ground(dim){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( dim, 10, dim );

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x0000ff } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = 0;
        object.position.y = 0 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object

} // end function

function make_board(){
    //alert("in make_board")
    var size = 150;
    var geometry = new THREE.CubeGeometry( size, size, 5 );
    var square_color
    for ( var i = 0; i < 64; i ++ ) {

        if ((i+Math.floor(i/8))%2==0){square_color = 0x000000}
        else{square_color = 0xffffff}
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );

        object.material.ambient = object.material.color;

        object.position.x = (i%8-4) * size
        object.position.y = (Math.floor(i/8)-4) * size
        object.position.z = 0
        object.castShadow = true;
        object.receiveShadow = true;

        scene.add( object );
        // objects.push( object );

    }

} // end function

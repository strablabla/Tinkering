function make_uniform_ground(){
    //alert("in make_board")
    var size_square = 1100;
    var geometry = new THREE.CubeGeometry( size_square, size_square, 5 );
    var square_color = 0xffffff
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );
    object.material.ambient = object.material.color;
    object.position.x = 0
    object.position.y = 0
    object.position.z = 0
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add( object );
} // end function
function make_ground_chess(){
    //alert("in make_board")
    var size_square = 150;
    var geometry = new THREE.CubeGeometry( size_square, size_square, 5 );
    var square_color
    for ( var i = 0; i < 64; i ++ ) {
        if ((i+Math.floor(i/8))%2==0){square_color = 0x000000}
        else{square_color = 0xffffff}
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );
        object.material.ambient = object.material.color;
        object.position.x = (i%8-4) * size_square
        object.position.y = (Math.floor(i/8)-4) * size_square
        object.position.z = 0
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        // objects.push( object );
    }
} // end function

function make_wall(){
    //alert("in make_wall")
    wall_color = 0x800000
    var wall_length = 150;
    var wall_width = 5;
    var wall_height = 300;
    var geometry = new THREE.CubeGeometry( wall_width, wall_length, wall_height );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: wall_color } ) );
    object.material.ambient = object.material.color;
    object.position.x = 0
    object.position.y = 0
    object.position.z = 0
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add( object );
    objects.push( object );

} // end function

function make_small_seats(){
    //alert("in make_small_seats")
    var size_square = 150;
    var size_pawns = 50;
    var geometry = new THREE.CubeGeometry( size_pawns, size_pawns, size_pawns );
    var square_color;
    for ( var i = 0; i < 16; i ++ ) {
        if (Math.floor(i/8)%2==0){
            square_color = 0x800000
            var posy = 1
           }
        else{
            square_color = 0xf0f0f5
            var posy = 6
           }
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );
        object.material.ambient = object.material.color;
        object.position.x = (i%8-4) * size_square
        object.position.y = (posy-4) * size_square
        object.position.z = 5
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        objects.push( object );
    } // end for
} // end function

function make_seat(){
    //alert("in make_pawns")
    var size_square = 150;
    var size_towers = 50;
    var geometry = new THREE.CylinderGeometry( 50, 25, 100);
    var square_color;
    for ( var i = 0; i < 4; i ++ ) {
        if (Math.floor(i/2)%2==0){
            square_color = 0x800000
            var posy = 1
           }
        else{
            square_color = 0xf0f0f5
            var posy = 6
           }
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );
        object.material.ambient = object.material.color;
        object.position.x = (i%8-4) * size_square
        object.position.y = (posy-4) * size_square
        object.position.z = 100
        object.rotation.x = -Math.PI/2
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        objects.push( object );
    } // end for
} // end function

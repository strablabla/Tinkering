var road_length = 200000

function make_pitch(){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 200, 10, road_length );

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x000000 } ) );
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


posx = 0

function make_car(pos_z){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 20, 20, 50 );

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = posx;
        object.position.y = 20 ;
        object.position.z = pos_z;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object

} // end function

linespace = 10
function make_line(){
    //alert("make_line")
    for (var i=-road_length/linespace/2; i<road_length/linespace/2; i++){

        var geometry = new THREE.CubeGeometry( 5, 1, 7 );
        if (i%2==0){color_line = 0xffffff }
        else{color_line = 0xffff99}
            var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color:color_line } ) );
            object.material.ambient = object.material.color;
            //----------------
            object.position.x = 0;
            object.position.y = 10 ;
            object.position.z = i*linespace;
            //----------------
            object.castShadow = true;
            object.receiveShadow = true;
            //----------------
            scene.add( object );
            objects.push( object );
    }
} // end function

function make_bullet(){
    //alert("make ball")
    var geometry = new THREE.SphereGeometry( 5, 16, 16 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffdd99 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = posx;
        object.position.y = 20 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object
} // end function

function make_square_bullet(){
    //alert("make ball")
    var geometry = new THREE.CubeGeometry( 5, 5, 5 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = posx;
        object.position.y = 20 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object
} // end function


var simple_colored_buildings = function(esp){

    //Houses
    /*
    nb_buildings : number of buidlings
    esp : space inside each block of the building
    dist_inter_build : distance between each building
    */

    var size_cubes = 50;
    var dist_build = size_cubes*5
    var nb_buildings = road_length/dist_build

    for ( var j = 0; j < nb_buildings; j ++ ) {
        group = new THREE.Group();
        

        // Cube

        var geometry = new THREE.BoxGeometry( size_cubes, size_cubes, size_cubes );

        for ( var i = 0; i < geometry.faces.length; i += 2 ) {

                var hex = Math.random() * 0xffffff;
                geometry.faces[ i ].color.setHex( hex );
                geometry.faces[ i + 1 ].color.setHex( hex );

        }
        var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5, roughness: 0.5, metalness: 1.0 } );



        for ( var i = 0; i < 7; i ++ ) {

            var cube = new THREE.Mesh( geometry, material );
            cube.position.x = Math.random() * esp;
            cube.position.y = Math.random() * esp;
            cube.position.z = Math.random() * esp;
            cube.scale.multiplyScalar( Math.random() + 0.5 );
            group.add( cube );

        } // end for

        group.position.y = 50/2; //*Math.power(-1,i);
        group.position.z =  dist_build*j ;
        if (j%2==0){
            group.position.x = 600 //+(500+Math.random()*dist_build); // Math.power(-1,j)*
        }
        else{
            group.position.x = -600 
        }
        scene.add( group );
        

    } // end for  nb_buildings

}

function make_trunk(){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 20, 80, 20 );

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x000000 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = 0;
        object.position.y = 130 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        var hex = Math.random() * 0xffffff;
        object.material.color.setHex( hex );
        return object

} // end function

function make_green_bowl(){
    //alert("make_head")
    var geometry = new THREE.SphereGeometry( 70, 32, 32 );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x33cc33 } ) );
    object.material.ambient = object.material.color;
    //----------------
    object.position.x = 0;
    object.position.y = 200 ;
    object.position.z = 0;
    //----------------
    object.castShadow = true;
    object.receiveShadow = true;
    return object
} // end function

function make_green_cone(){
    //alert("make_head")
    var geometry = new THREE.ConeGeometry( 60, 200, 32 );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x33cc33 } ) );
    object.material.ambient = object.material.color;
    //----------------
    object.position.x = 0;
    object.position.y = 200 ;
    object.position.z = 0;
    //----------------
    object.castShadow = true;
    object.receiveShadow = true;
    return object
} // end function


function make_simple_tree(kind){
    group_tree = new THREE.Object3D();//create an empty container
    //-------------------------------
    var kind = kind || 'bowl';
    var trunk = make_trunk()
    if (kind == 'bowl'){
        var green_bowl = make_green_bowl()
        group_tree.add( green_bowl );
    }
    else if (kind == 'cone'){
        var green_cone = make_green_cone()
        group_tree.add( green_cone );
    }

    group_tree.add( trunk );
    scene.add( group_tree );//when done, add the group to the scene
    return group_tree
} // end function

function make_flower_foot(){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 5, 100, 5 );

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x000000 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = 0;
        object.position.y = 130 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        var hex = Math.random() * 0xffffff;
        object.material.color.setHex( hex );
        return object

} // end function

function make_flower_bowl(){
    //alert("make_head")
    group_flower_head = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry( 10, 32, 32 );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x33cc33 } ) );
    object.material.ambient = object.material.color;
    //----------------
    object.position.x = 0;
    object.position.y = 200 ;
    object.position.z = 0;
    //----------------
    object.castShadow = true;
    object.receiveShadow = true;
    group_flower_head.add(object)
    var nb_petals = 5
    dist_petal = 20
    for (i=0; i<nb_petals; i++){
        var petal = object.clone()
        petal.scale.set(2,0.1,2)
        //var hex = Math.random() * 0xffffff;
        petal.material.color.setHex(0xffffff)
        var angle = 2*Math.PI/nb_petals*i
        petal.position.set(dist_petal*Math.cos(angle), 200, dist_petal*Math.sin(angle))
        group_flower_head.add(petal)
    }
    return group_flower_head
} // end function

function make_simple_flower(){
    group_flower = new THREE.Object3D();//create an empty container
    //-------------------------------
    var flower_foot = make_flower_foot()
    var flower_bowl = make_flower_bowl()
    //flower_bowl.rotation.set(Math.random(), 0, Math.random())
    //flower_bowl.rotation.set(Math.PI/3, Math.random(), 0)
    group_flower.add( flower_bowl);
    group_flower.add( flower_foot );
    //group_flower.position.set(100,100,100)
    scene.add( group_flower );//when done, add the group to the scene
    return group_flower
} // end function


function make_legs_bank(){
    //alert("make_legs")
    group_legs = new THREE.Object3D();//create an empty container
    for (i=0;i<2;i++){
        var geometry = new THREE.CubeGeometry( 10, 20, 10 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffdd99 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = i*20-10;
        object.position.y = 10 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        group_legs.add( object )
    }
    return group_legs
} // end function

function make_seat_bank(){

    var geometry = new THREE.CubeGeometry( 40, 1, 20 );
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffdd99 } ) );
    object.material.ambient = object.material.color;
    //----------------
    object.position.x = 0;
    object.position.y = 20 ;
    object.position.z = 0;
    //----------------
    object.castShadow = true;
    object.receiveShadow = true;


    return object
} // end function

function make_bank(){
    group_bank = new THREE.Object3D();//create an empty container
    //-------------------------------
    var legs = make_legs_bank()
    var seat = make_seat_bank()
    group_bank.add( legs );
    group_bank.add( seat );
    scene.add( group_bank );//when done, add the group to the scene
    return group_bank
} // end function


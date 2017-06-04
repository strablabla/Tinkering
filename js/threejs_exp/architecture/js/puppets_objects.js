

posx = 0

function make_body(){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 40, 80, 40 );

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
function make_arms(){
    //alert("make_arms")
    group_arms = new THREE.Object3D();//create an empty container
    for (i=0;i<2;i++){
        var geometry = new THREE.CubeGeometry( 5, 5, 60 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffdd99 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = i*30-15;
        object.position.y = 120 ;
        object.position.z = 40 ;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        group_arms.add( object )
    }
    return group_arms
} // end function

function make_legs(){
    //alert("make_legs")
    group_legs = new THREE.Object3D();//create an empty container
    for (i=0;i<2;i++){
        var geometry = new THREE.CubeGeometry( 10, 80, 10 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffdd99 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = i*20-10;
        object.position.y = 50 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        group_legs.add( object )
    }
    return group_legs
} // end function

function make_head(){
    //alert("make_head")
    var geometry = new THREE.SphereGeometry( 20, 32, 32 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffdd99 } ) );
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

function make_eyes(){
    //alert("make ball")
    group_eye = new THREE.Object3D();//create an empty container
    for (i=0;i<2;i++){
        var geometry = new THREE.SphereGeometry( 2, 32, 32 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x000000 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = i*10;
        object.position.y = 200 ;
        object.position.z = 23;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        group_eye.add( object )
    }
    for (i=0;i<2;i++){
        var geometry = new THREE.SphereGeometry( 4, 32, 32 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = i*10;
        object.position.y = 200 ;
        object.position.z = 20;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        group_eye.add( object )
    }
    return group_eye
} // end function

function make_puppet(){
    group_puppet = new THREE.Object3D();//create an empty container
    //-------------------------------
    var head = make_head()
    var eyes = make_eyes()
    var body = make_body()
    var arms = make_arms()
    var legs = make_legs()
    group_puppet.add( head );
    group_puppet.add( eyes );
    group_puppet.add( body );
    group_puppet.add( arms );
    group_puppet.add( legs );
    scene.add( group_puppet );//when done, add the group to the scene
    return group_puppet
} // end function

function make_many_puppets(){
    for (i=0; i<3; i++){
        var pup = new make_puppet()
        pup.scale.set(0.1,0.1,0.1)
        pup.position.set(Math.random()*10,Math.random()*10,Math.random()*10)
        list_pup.push(pup)
    }
}

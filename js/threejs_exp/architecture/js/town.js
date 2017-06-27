
var extruded_buildings = function(nb_buildings, esp, dist_inter_build){

	//Houses
	/*
	nb_buildings : number of buidlings
	esp : space inside each block of the building
	dist_inter_build : distance between each building
	*/

	for ( var j = 0; j < nb_buildings; j ++ ) {
		group = new THREE.Group();
		scene.add( group );

		// Cube

		var geometry = new THREE.BoxGeometry( 50,50,50 );

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
			group.position.y = 50/2; //*Math.power(-1,i);
			group.position.z = Math.random()*dist_inter_build;
			group.position.x = Math.random()*dist_inter_build;

		} // end for
	}

}

var simple_colored_buildings = function(nb_buildings, esp, dist_inter_build){

	//Houses
	/*
	nb_buildings : number of buidlings
	esp : space inside each block of the building
	dist_inter_build : distance between each building
	*/

	for ( var j = 0; j < nb_buildings; j ++ ) {
		group = new THREE.Group();
		scene.add( group );

		// Cube

		var geometry = new THREE.BoxGeometry( 50,50,50 );

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
			group.position.y = 50/2; //*Math.power(-1,i);
			group.position.z = Math.random()*dist_inter_build;
			group.position.x = Math.random()*dist_inter_build;

		} // end for
	}

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

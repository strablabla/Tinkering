function make_pitch(){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 200, 10, 400 );

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

function make_net(){
    //alert("make racket")
    for (var i=-9; i<10; i++){

        var geometry = new THREE.CubeGeometry( 5, 2, 2 );

            var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
            object.material.ambient = object.material.color;
            //----------------
            object.position.x = i*10;
            object.position.y = 10 ;
            object.position.z = 0;
            //----------------
            object.castShadow = true;
            object.receiveShadow = true;
            //----------------
            scene.add( object );
            objects.push( object );
    }
} // end function

posx = 0

function make_racket(pos_z){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 40, 20, 10 );

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

function make_ball(){
    //alert("make ball")
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
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

function make_pong_ball(){
    //alert("make ball")
    var geometry = new THREE.CubeGeometry( 10, 10, 10 );
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


function make_score(player, numb, zpos){
    alert("make counter")
    // https://www.sonelec-musique.com/electronique_theorie_afficheurs_led.html
    var xpos = -130;
    alert(numb)
    alert(zpos)
    if (player == 1){
        zpos = -20
    }
    else{
        zpos = 20
    }
    var dic_numb = {
                    0:[1,1,1,1,1,1,0], // A,B,C,D,E,F,G
                    1:[0,1,1,0,0,0,0],
                    2:[1,1,0,1,1,0,1],
                    3:[1,1,1,1,0,0,1],
                    4:[0,1,1,0,0,1,1],
                    5:[1,0,1,1,0,1,1],
                    6:[1,0,1,1,1,1,1],
                    7:[1,1,1,0,0,0,0],
                    8:[1,1,1,1,1,1,1],
                    9:[1,1,1,1,0,1,1]
                };
    var cn = dic_numb[numb] // current number
    var col = 0xff0000
    //-----------------
    var dic_horiz = [cn[3],cn[6],cn[0]] // A,D,G
    for (i=0; i<3; i++){
        var geometry = new THREE.CubeGeometry(3,3,10);
        //alert(dic_horiz[i])
        var obj = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({color: col}) );
        obj.material.ambient = obj.material.color;
        obj.position.x = xpos;
        obj.position.y = i*10 ;
        obj.position.z = 5 + zpos;
        //----------------
        obj.castShadow = true;
        obj.receiveShadow = true;
        //----------------
        if (dic_horiz[i]==1){
            scene.add(obj)
            list_score.push(obj)
        }
    }

    var dic_vert = [cn[2],cn[1],cn[4],cn[5]] // C,B,E,F
    for (i=0; i<4; i++){
        var geometry = new THREE.CubeGeometry(3,10,3);
        //alert(dic_vert[i])
        var obj = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({color: col}) );
        obj.material.ambient = obj.material.color;
        obj.position.x = xpos;
        obj.position.y = (i%2)*10+5 ;
        obj.position.z = Math.floor(i/2)*10 + zpos;
        //----------------
        obj.castShadow = true;
        obj.receiveShadow = true;
        //----------------
        if (dic_vert[i]==1){
            scene.add(obj)
            list_score.push(obj)
        }
    }
} // end function make_score

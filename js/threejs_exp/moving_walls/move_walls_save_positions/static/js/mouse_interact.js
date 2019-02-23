function init_drag(){

    projector = new THREE.Projector();
    var size_plane = 10000
    plane = new THREE.Mesh( new THREE.PlaneGeometry( size_plane, size_plane, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
    plane.visible = true;
    scene.add( plane );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );
    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    if ( SELECTED ) {

        var intersects = raycaster.intersectObject( plane );
        var interptsub = intersects[ 0 ].point.sub( offset )
        interptsub.z = SELECTED.position.z
        SELECTED.position.copy( interptsub );

        return;

    }

    var intersects = raycaster.intersectObjects( objects );
    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            // 0xf0f0f5
            // INTERSECTED.currentHex
            if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex); //
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

        }

        container.style.cursor = 'pointer';

    } else {
        // 0xf0f0f5
        // INTERSECTED.currentHex
        if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;
        container.style.cursor = 'auto';

    }

}

function onDocumentMouseDown( event ) {

    event.preventDefault();
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );
    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {

        controls.enabled = false;
        SELECTED = intersects[ 0 ].object;
        var intersects = raycaster.intersectObject( plane );
        container.style.cursor = 'move';

    }
    if ( INTERSECTED ) INTERSECTED.material.color.setHex( 0x66ff33 ); // changing color in green when selected

}

function onDocumentMouseUp( event ) {

    event.preventDefault();
    controls.enabled = true;
    if ( INTERSECTED ) {
        SELECTED = null;
    }
    container.style.cursor = 'auto';

}

function mousepos(){

      /*
      Return the mouse coordinates in the plane
      */

      event.preventDefault();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      //---------------------------------
      var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
      projector.unprojectVector( vector, camera );
      var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
      //---------------------------------
      var intersects = raycaster.intersectObject( plane );
      var interptsub = intersects[ 0 ].point.sub( offset )
      return interptsub

}

function mouse_create_object_or_action(){

    /*
    Create an object or an action where the mouse is located in the plane.
    */

    if (create_new_obj){
          var newname = Math.random().toString(36).substring(2, 15) ; // + Math.random().toString(36).substring(2, 15)
          interptsub = mousepos()
          var creobj = make_wall(newname, interptsub, {"x":0, "y":0, "z":0}, 0xffffff)  // new wall created at the momuse's position..
    }

    //------------------------- Mouse select area..
    if (select_obj){

        /*
        Select area
        */

        if ( selpos.length < 2 ){
            //make_mark()
            var newname = Math.random().toString(36).substring(2, 15) ; // + Math.random().toString(36).substring(2, 15)
            interptsub = mousepos()
            var creobj = make_mark(newname, interptsub, {"x":0, "y":0, "z":0}, 0xffffff)
            selpos.push(creobj)
            if (selpos.length == 2){
                  make_area(selpos)   // plane created with mouse click..
                  selpos = []         // position of the diagonal of the plane
                  select_obj = !select_obj;
            }
        } // Select area

    } // end select_obj

    if (select_poscam){

            /*
            Select camera position
            */

            interptsub = mousepos()
            camera.position.z = 1000;
            camera.position.y = interptsub.y;
            camera.position.x = interptsub.x;
            camera.up = new THREE.Vector3(0,0,1); // good orientation of the camera..

      } // end select_poscam

} // end mouse_create_object_or_action


function give_infos(){

      /*
      Give infos about the selected object.
      The information appears close to the object selected..
      */

      if ( INTERSECTED ){
            var x = document.getElementsByClassName("panel");
            var i;
            for (i = 0; i < x.length; i++) {
              x[i].style.visibility = "visible";
              x[i].style.backgroundColor = "grey";
              x[i].style.left = event.pageX + "px";  				// mouse x
              x[i].style.top = event.pageY + "px";   				// mouse y
            }
      }
      else{

        var x = document.getElementsByClassName("panel");
        var i;
        for (i = 0; i < x.length; i++) {
              //x[i].style.backgroundColor = "red";
              x[i].style.left = "10px";                			// upper left position
              x[i].style.top = "10px";
              x[i].style.visibility = "hidden";
          }
      }
  } // end give infos

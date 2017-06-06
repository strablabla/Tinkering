pos_sphere = 0
function animate_town_light() {

    requestAnimationFrame( animate_town_light );

    if ( controlsEnabled ) {
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects( objects );
        var isOnObject = intersections.length > 0;
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 1.0 * delta;               // velocity x
        velocity.z -= velocity.z * 1.0 * delta;               // velocity z
        // velocity.y = 0;
        velocity.y -= 9.8 * 10.0 * delta; // 100.0 = mass   // velocity y  taking in account the gravity.

		var horiz_speed = 120.0 // Horizontal speed
		var vert_speed = 40.0 // Vertical speed
        if ( moveForward ) velocity.z -= horiz_speed * delta;
        if ( moveBackward ) velocity.z += horiz_speed * delta;
        if ( moveLeft ) velocity.x -= horiz_speed * delta;
        if ( moveRight ) velocity.x += horiz_speed * delta;
		// if ( moveUp ) velocity.y -= vert_speed * delta;       // moving up
		// if ( moveDown ) velocity.y += vert_speed * delta;     // moving down
        pos_sphere += delta
		for (i=0; i<list_lights.length; i++){
            pos_sphere_i = list_lights_speeds[i]*pos_sphere
			list_lights[i].position.x = list_lights_initpos[i][0] + 50*Math.cos(pos_sphere_i)
            list_lights[i].position.z = list_lights_initpos[i][2] + 50*Math.sin(pos_sphere_i)
            list_lights[i].position.y = list_lights_initpos[i][1] + 20*Math.sin(0.2*pos_sphere_i)

		}

        if ( isOnObject === true ) {
            velocity.y = Math.max( 0, velocity.y );
            canJump = true;
        }

        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta ); // velocity.y * delta
        controls.getObject().translateZ( velocity.z * delta );

        if ( controls.getObject().position.y < posy ) {
            velocity.y = 0;
            controls.getObject().position.y = posy;
            canJump = true;
        }
        prevTime = time;
    }
    renderer.render( scene, camera );
}

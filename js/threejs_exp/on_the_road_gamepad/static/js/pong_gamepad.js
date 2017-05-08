
window.gamepad = new Gamepad();

gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
    console.log('Connected', device);
    // alert("device.index: " + device.index + "device.id: " + device.id)
    $('#connect-notice').hide();
});

gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
    console.log('Disconnected', device);
    if (gamepad.count() == 0) {
        $('#connect-notice').show();
    }
});

function gamepad_handle_event(){

    gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
        var gamepad, control, value, i, j;

        for (i = 0; i < gamepads.length; i++) {
            gamepad = gamepads[i];
            if (gamepad) {
                for (control in gamepad.state) {
                    value = gamepad.state[control];
                    if (value!=0){
                        //alert(control + '_' + value)
                        if (control=='LEFT_TOP_SHOULDER'){
                            rack1.position.x += 10
                        }
                        if (control=='RIGHT_TOP_SHOULDER'){
                            rack1.position.x += -10
                        }
                    }
                } // end for
            } // end if game
        }
    }); // end gamepad.bind(Gamepad.Event.TICK

}

if (!gamepad.init()) {
    alert('Your browser does not support gamepads, get the latest Google Chrome or Firefox.');
}

#!/usr/bin/env python
'''
Server for communication with vehicule.
threaded = True in app.run for not blocking communication with SSE.
Integration of annyang.js for speech recognition(need a web connection).
This interface uses SocketIO. Directly inspired from Michael Grinberg.
ATTENTION !!!! pour faire connection avec pyserial faire "sudo $HOME/anaconda/bin/python run.py"
'''

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on available packages.
async_mode = None

if async_mode is None:
    try:
        import eventlet
        async_mode = 'eventlet'
    except ImportError:
        pass

    if async_mode is None:
        try:
            from gevent import monkey
            async_mode = 'gevent'
        except ImportError:
            pass

    if async_mode is None:
        async_mode = 'threading'

    print('async_mode is ' + async_mode)

# monkey patching is necessary because this application uses a background
# thread
if async_mode == 'eventlet':
    import eventlet
    eventlet.monkey_patch()
elif async_mode == 'gevent':
    from gevent import monkey
    monkey.patch_all()

import os, sys, time
sys.path.append('/usr/lib/python2.7/dist-packages')
from threading import Thread
import flask
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit
from time import sleep
import serial
import platform
platf = platform.system()

app = Flask(__name__, static_url_path = '/static')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None

try:
    if platf == 'Darwin':
        ser = serial.Serial('/dev/tty.usbmodem3A22', 115200, timeout=1)    # Establish serial connection.
    else:
        ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)             # Establish serial connection.
        print('serial connection established !! ')
except:
    print("no serial connection")

def accelero(ser):
    l = ser.readline()
    return l

def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        time.sleep(10)
        count += 1
        socketio.emit('my response',
                      {'data': 'Server generated event', 'count': count},
                      namespace='/test')
@app.route('/')
def index():
    global thread
    if thread is None:
        thread = Thread(target=background_thread)
        thread.daemon = True
        thread.start()
    return render_template('first_page.html')

@socketio.on('my event', namespace='/test')
def test_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1

    emit('my response',
         {'data': message['data'], 'count': session['receive_count']})

@socketio.on('my direction', namespace='/test')
def direction(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    dic = {"head":"f", "back":"b", "right":"r", "left":"l", "no mvt":"o"}
    print("direction is ", dic[str(message['data'])])
    data_accel = accelero(ser)
    print(data_accel)
    emit('my response',
         {'data': message['data'], 'count': session['receive_count'], 'accel': str(data_accel)})


if __name__ == '__main__':
    socketio.run(app, debug=True)

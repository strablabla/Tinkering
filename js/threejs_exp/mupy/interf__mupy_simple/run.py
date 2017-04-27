'''
Server for communication with vehicule.
threaded = True in app.run for not blocking communication with SSE.
'''

######### Eventlet

import eventlet
eventlet.monkey_patch()

import os, sys, time
#sys.path.append('/usr/lib/python2.7/dist-packages')
import numpy as np
from threading import Thread
from time import sleep
import platform
platf = platform.system()

from flask import Flask, render_template,request,\
			redirect, url_for, session
import flask
### Flask Socket io
from flask_socketio import SocketIO
from flask_socketio import send, emit

###
import subprocess
import serial
from threading import Thread

app = Flask(__name__, static_url_path = '/static')
socketio = SocketIO(app) # Flask websocket

def accelero(ser):
    l = ser.readline()
    return l

def background_thread():
    '''
    Background task
    '''
    if platf == 'Darwin':
        ser = serial.Serial('/dev/tty.usbmodem3A22', 115200, timeout=1)    # Establish serial connection.
    else:
        ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)             # Establish serial connection.
    while True:
        data = accelero(ser)
        #print(data)
        socketio.emit('follow', {'data': data}, namespace='/accelero')

@app.route('/')
def index():
    launch_thread()
    return render_template('gallerie_locker_v1_mupy.html')

def launch_thread():
    thread = Thread(target=background_thread)
    thread.daemon = True
    thread.start()

if __name__ == "__main__":
    import threading, webbrowser
    # if platf == 'Darwin':
    #     chrome_path = "open -a /Applications/Google\ Chrome.app %s"
    # else:
    #     chrome_path = "/usr/bin/google-chrome %s"
    port = 9611
    url = "http://127.0.0.1:{0}".format(port)
    # threading.Timer(1.25, lambda: webbrowser.get(chrome_path).open(url)).start() # open a page in the browser.
    app.run(port = port, debug = False, use_reloader = False)                    # threaded = True, , ssl_context='adhoc'
    socketio.run(app)

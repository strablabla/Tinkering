#!/usr/bin/env python
# encoding: utf-8

"""

"""

######### Eventlet

import eventlet
eventlet.monkey_patch()

import sys, os, shutil, time, json, pickle
import os.path as op
import subprocess
from time import sleep
sys.path.append('Interf')
from threading import Thread
#########
# from matplotlib import pyplot as plt
import numpy as np
from plot_bokeh import BOKEH_PLOT
plt = BOKEH_PLOT()
######### Flask
from flask import Flask, render_template, request,\
			redirect, url_for, session
# from flask.ext.cache import Cache
## Flask Socket io
from flask_socketio import SocketIO
from flask_socketio import send, emit
### 
### Instantiate and configure Flask
app = Flask(__name__, static_url_path='/static')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'F34TF$($e34D';
socketio = SocketIO(app) # Flask websocket 

####
Debug = True

### Initialization of the Interface

@app.route('/')
def index():
    '''
    Interface first page.
    '''
    
    return render_template('interface.html')  

@socketio.on('pos', namespace='/save')
def savepos(pos):
    print('##### position is {0} '.format(pos))
    
def shutdown_server():
    '''
    Quit the application
    called by method shutdown() (hereunder)
    '''
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown', methods = ['POST'])
def shutdown():
    '''
    Shutting down the server.
    '''
    shutdown_server()
    return 'Server shutting down...'

if __name__ == '__main__':
    import threading, webbrowser
    port = 5017 
    url = "http://127.0.0.1:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.open(url, new=1)).start() # open a page in the browser.
    app.run(port = port, debug = Debug, use_reloader = False)
    socketio.run(app)

#!/usr/bin/env python
# encoding: utf-8

"""

"""

######### Eventlet

import eventlet
eventlet.monkey_patch()

import sys, os, shutil, time, json, pickle
import os.path as op
sys.path.append('Interf')
from threading import Thread
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
dic_connex = {}
num_connex = 1
Debug = False

@app.route('/')
def index():
    '''
    Interface first page.
    '''
    return render_template('interface.html')

@socketio.on('message', namespace='/save')
def savepos(message):
    print('######## position is {0} from client {1} !!!!!! '.format(message, request.sid))
    socketio.emit('received',
              {'data': 1},
              namespace='/save')

@socketio.on('pos', namespace='/save')
def tellpos(pos):
    global num_connex
    print('######## position is {0} from client {1} !!!!!! '.format(pos, request.sid))
    if not request.sid in dic_connex:
        dic_connex[request.sid]  = num_connex
        num_connex += 1
    print(dic_connex[request.sid])
    socketio.emit('server_id_choice',
              {'id': dic_connex[request.sid]},
              namespace='/save')
    if dic_connex[request.sid] == 1:
        print("dict is ", pos)
        socketio.emit('info_move',
          {'id': dic_connex[request.sid], 'pl':pos['pl'], 'pt':pos['pt']},
          namespace='/save', broadcast=True, include_self=False)
        

if __name__ == '__main__':
    import threading, webbrowser
    port = 5017
    # url = "http://127.0.0.1:{0}".format(port)
    url = "http://0.0.0.0:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.open(url, new=1)).start() # open a page in the browser.
    socketio.run(app, port = port, debug = Debug)

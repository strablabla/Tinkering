#!/usr/bin/env python
# encoding: utf-8

"""

"""

######### Eventlet

import eventlet
eventlet.monkey_patch()

#########

import sys, os
import os.path as op
sys.path.append('Interf')
from threading import Thread
######### Flask
from flask import Flask, render_template, request,\
			redirect, url_for, session
## Flask Socket io
from flask_socketio import SocketIO
from flask_socketio import send, emit

### Instantiate and configure Flask

app = Flask(__name__, static_url_path='/static')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'F34TF$($e34D';
socketio = SocketIO(app) # Flask websocket

####
dic_connex = {}   # Dictionary linking client to an index
num_connex = 1    #
Debug = False

@app.route('/')
def index():
    '''
    Interface first page.
    '''
    return render_template('interface.html')

@socketio.on('message', namespace='/synchro')
def init_connexion(message):
    '''
    Sending first message to clients
    '''
    print('######## position is {0} from client {1} !!!!!! '.format(message, request.sid))
    socketio.emit('received', namespace='/synchro') # 

@socketio.on('pos', namespace='/synchro')
def sending_position(pos):
    '''
    Coordinating
    '''
    global num_connex
    print('######## position is {0} from client {1} !!!!!! '.format(pos, request.sid))
    if not request.sid in dic_connex:
        dic_connex[request.sid]  = num_connex   # Linking client to index
        num_connex += 1
    print(dic_connex[request.sid])
    socketio.emit('server_id_choice',
                  {'id': dic_connex[request.sid]}, 
                  namespace='/synchro')
    if dic_connex[request.sid] == 1:
        print("dict is ", pos)
        socketio.emit('info_move',
          {'id': dic_connex[request.sid], 'pl':pos['pl'], 'pt':pos['pt']},
          namespace='/synchro', broadcast=True, include_self=False)  # sending information to all the client except the sender
        
if __name__ == '__main__':
    import threading, webbrowser
    port = 5017
    url = "http://0.0.0.0:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.open(url, new=1)).start() # open a page in the browser.
    socketio.run(app, port = port, debug = Debug)

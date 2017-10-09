#!/usr/bin/env python
'''
Server.
threaded = True in app.run for not blocking communication with SSE.
Integration of annyang.js for speech recognition(need a web connection).
This interface uses SocketIO. Directly inspired from Michael Grinberg.
ATTENTION !!!! pour faire connection avec pyserial faire "sudo $HOME/anaconda/bin/python run.py"
'''

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on available packages.

import eventlet
eventlet.monkey_patch()
#################
import os, sys, time
sys.path.append('/usr/lib/python2.7/dist-packages')
from threading import Thread
import flask
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit
from time import sleep
import platform
platf = platform.system()

app = Flask(__name__, static_url_path = '/static')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app) #, async_mode=async_mode
thread = None

####
dic_connex = {}   # Dictionary linking client to an index
num_connex = 1    #
Debug = False

@app.route('/')
def index():

    return render_template('pong_keys.html') #
    #return render_template('first_page.html') #

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
    Synchronizing
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
    numplayer = str(dic_connex[request.sid])
    # if dic_connex[request.sid] == 1:
    print("dict is ", pos)
    socketio.emit('info_move',
      {'id': numplayer,
                'posrack1':pos['posrack1'],
                'posrack2':pos['posrack2']
                },
      namespace='/synchro', broadcast=True, include_self=False)  # sending information to all the client except the sender

@socketio.on('ball', namespace='/synchro')
def ball_position(pos):
    print("receiving posball")
    print("pos['posball'] ", pos['posball'])
    socketio.emit('ball',{'posball': pos['posball']},
            namespace='/synchro', broadcast=True, include_self=False)  # sending information to all the client except the sender

if __name__ == '__main__':
    import threading, webbrowser
    port = 5017
    url = "http://0.0.0.0:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.open(url, new=1)).start() # open a page in the browser.
    socketio.run(app, port = port, debug = Debug)

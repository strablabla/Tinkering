'''
Server for communication with vehicule.
threaded = True in app.run for not blocking communication with SSE.
'''
import os, sys, time
#sys.path.append('/usr/lib/python2.7/dist-packages')
import numpy as np
from threading import Thread
from time import sleep
from flask import Flask, render_template, request
import flask
import subprocess

app = Flask(__name__, static_url_path = '/static')

@app.route('/')
def index():
    return render_template('straptoc_eg_small.html')

@app.route('/zic', methods = ['POST'])
def zic():
    print(request.form.get('musique'))
    if request.form.get('musique'):
        print('triggering the music !!!! ')
        #subprocess.Popen(['vlc', '/home/lio/Téléchargements/youtube/zic/Sexy/Papetti'])
        subprocess.Popen(['vlc', '/home/lio/Téléchargements/youtube/zic/Films/LalaLand'])
    return render_template('hello.html')

if __name__ == "__main__":
    import threading, webbrowser
    chrome_path = '/usr/bin/google-chrome %s'
    port = 9600
    url = "https://127.0.0.1:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.get(chrome_path).open(url)).start() # open a page in the browser.
    app.run(threaded = True, port = port, debug = False, use_reloader = False, ssl_context='adhoc')

'''
Server for communication with vehicule.
threaded = True in app.run for not blocking communication with SSE.
'''
import os, sys, time
#sys.path.append('/usr/lib/python2.7/dist-packages')
import numpy as np
from threading import Thread
from time import sleep
from flask import Flask, render_template,request,\
			redirect, url_for, session
import flask
import subprocess

app = Flask(__name__, static_url_path = '/static')

@app.route('/')
def index():
    return render_template('straptoc_eg_small.html')

@app.route('/notes', methods = ['POST'])
def notes():
	print(request.form.get('mes_notes'))
	if request.form.get('mes_notes'):
		print('opening notes !!!! ')
		utow='$HOME/CloudStation/Infosutiles/own/utiles_own.html'
		tdow='$HOME/CloudStation/Todo/own/todo_own.html'
		comm0 = 'atom {0} {1}'.format(utow, tdow)
		comm1 = 'screen -S chrome_ow chromium-browser {0} {1} ; exit'.format(utow, tdow)
		subprocess.call(comm0, shell=True)
		subprocess.call(comm1, shell=True)
	return redirect(url_for('index'))

@app.route('/syno', methods = ['POST'])
def syno():
	print(request.form.get('synology'))
	if request.form.get('synology'):
		print('opening synology !!!! ')
		comm0 = 'sudo /usr/bin/synology-cloud-station-drive'
		subprocess.call(comm0, shell=True)
	return redirect(url_for('index'))

@app.route('/zic', methods = ['POST'])
def zic():
	if request.form.get('jazz'): print('########  jazz')
	if request.form.get('french'): print('########  french')
	if request.form.get('bollywood'): print('########  bollywood')

	if request.form.get('sexy'):
		print(request.form.get('musique'))
		print('triggering the music !!!! ')
		subprocess.Popen(['vlc', '/home/lio/Téléchargements/youtube/zic/Sexy'])

	#subprocess.Popen(['vlc', '/home/lio/Téléchargements/youtube/zic/Films/LalaLand'])
	# return render_template('hello.html')
	return redirect(url_for('index'))

if __name__ == "__main__":
    import threading, webbrowser
    chrome_path = '/usr/bin/google-chrome %s'
    port = 9600
    url = "https://127.0.0.1:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.get(chrome_path).open(url)).start() # open a page in the browser.
    app.run(threaded = True, port = port, debug = False, use_reloader = False, ssl_context='adhoc')

# activate eventlet
import eventlet
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO

import datetime
from time import sleep

# create a new Flask application
app = Flask(__name__)

# activate Flask-socketio
socketio = SocketIO(app)

# a short running task that returns immediately
@app.route('/shortTask')
def short_running_task():
  start = datetime.datetime.now()
  return 'Started at {0}, returned at {1}'.format(start, datetime.datetime.now())

# a long running tasks that returns after 30s
@app.route('/longTask')
def long_running_task():
  start = datetime.datetime.now()
  sleep(30)
  return 'Started at {0}, returned at {1}'.format(start, datetime.datetime.now())

# run the webserver with socketio
if __name__ == '__main__':
    socketio.run(app, debug=True)
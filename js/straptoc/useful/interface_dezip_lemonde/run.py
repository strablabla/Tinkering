# -*- coding: utf-8 -*-
"""
    Flask-upload-dropzone
"""
import errno, os, sys, csv, json, glob
opd, opb, opj = os.path.dirname, os.path.basename, os.path.join
path_ilt = opj(opd(opd(os.getcwd())), '2d_ilt_unified')
print("### path_ilt ", path_ilt)
sys.path.append(path_ilt)
import numpy as np
import shutil as sh
from colorama import Fore, Back, Style
import time
####
from matplotlib import pyplot as mplt
from plot_bokeh import BOKEH_PLOT
####
from flask import Flask, render_template, request
####
from all_2D_ILT import T2T2_ILT as T2T2
from all_2D_ILT import T1T2_ILT as T1T2
from all_2D_ILT import DT2_ILT as DT2

from threading import Thread
import eventlet
eventlet.monkey_patch()

## Flask Socket io
from flask_socketio import SocketIO
from flask_socketio import send, emit

app = Flask(__name__)
app.config['UPLOADED_PATH'] = os.getcwd() + '/upload'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'F34TF$($e34D';
socketio = SocketIO(app) # Flask websocket 

plt = BOKEH_PLOT()

list_processed = [] # list containing the names of the datasets yet registered for processing.

def init():
    '''
    Prepare interface.
    '''
    upload = app.config['UPLOADED_PATH']
    sh.rmtree(upload)
    os.mkdir(upload)


def background_thread():
    '''

    Background task for following the processing
    Reads information about processing in nbfolders.txt
    Called in index()

    '''
    global time_elapsed
    count = 0
    t0 = time.time()
    while True:
        time.sleep(2) #
        count += 1
        # print("count is ", count)
        t1 = time.time()
        time_elapsed = str(round((t1-t0)/60.0, 1))
        socketio.emit('infos',
              {'informations': "blabla"},
              namespace='/follow_proc')

def scan(path):
    '''
    Searching for datasets and building the list dict_data for the processing.
    '''
    global dict_data
    dic_kind = {'difflist' : 'DT2', 'vclist' : 'T2T2', 'vdlist' : 'T1T2'}
    dict_data = {}
    for root, dirs, files in os.walk(path):
        for file_ in files:
            full_name = os.path.join(root, file_)
            if opb(full_name) == 'ser':
                dict_data[full_name] = []
                print(Fore.RED + 'ser file !!!')
                print(Style.RESET_ALL)
                # print(full_name)
                for kind in ['difflist', 'vdlist', 'vclist']:
                    pathkind = opj(opd(full_name), kind)
                    if os.path.exists(pathkind):
                        print(Fore.BLUE + "experiment " + dic_kind[kind])
                        print(Style.RESET_ALL)
                        print('##### dict_data[full_name] is ', dict_data[full_name])
                        dict_data[full_name].append(pathkind)
                        dict_data[full_name].append(dic_kind[kind])

    print("at the end of scan dict_data is ", dict_data)
    return dict_data

def extract_name(addr):
    '''
    Extract name for processings
    '''
    num = opb(opd(addr))
    name = opb(opd(opd(addr)))
    return name + '-' + num

def process(dict_data):
    '''
    Apply the processing on the datasets registered on the list dict_data.
    '''
    print("######## dict_data is ", dict_data)
    for addr in dict_data:
        if  addr not in list_processed:                                       # if not yet processed
            t0 = time.time()
            print("######## Processing {0} ".format(addr)) 
            if dict_data[addr][1] == 'T2T2': 
                print("dict_data inside T2T2 is ",dict_data)                  
                tt = T2T2(addr, start_decay=1, resol=10, rank=15)             # T2T2
            elif dict_data[addr][1] == 'T1T2':                   
                tt = T1T2(addr, start_decay=1, resol=10, rank=25)             # T1T2
            elif dict_data[addr][1] == 'DT2':                         
                tt = DT2(addr, start_decay=1, resol=10, rank=25)              # DT2
            tt.NNLS_tikhonovK_simplified(alpha=0.5, kind_nnls='active-set')   # NNLS Tikhonov
            tt.visu_proc()
            folder_proc = opj(os.getcwd(), 'static', 'processings')
            tt.save_proc(opj(folder_proc, extract_name(addr))) # Save proccessing in processings folder..
            t1 = time.time()
            list_processed.append(addr)
            count = int(len(list_processed)/len(dict_data)*100)
            print("#### count ", count)
            socketio.emit('follow',
                      {'count': count},
                      namespace='/follow_proc')
            print('time elapsed is {0} min '.format((t1-t0)/60))

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    '''
    Upload the datasets and make the processing list.
    '''
    global dict_data
    if request.method == 'POST':
        for f in request.files.getlist('file'):
            file_in_folder_path = request.form.get('fullPath')
            #print("file_in_folder_path are ", file_in_folder_path)
            full_path = os.path.join(app.config['UPLOADED_PATH'], file_in_folder_path)
            try:
                f.save(full_path)
            except IOError as e:
                # ENOENT(2): file does not exist, raised also on missing parent dir
                if e.errno != errno.ENOENT:
                    raise
                # try creating parent directories
                os.makedirs(os.path.dirname(full_path)) # Makes folder
                f.save(full_path)
    dict_data = scan(app.config['UPLOADED_PATH'])

    return render_template('index_folder.html')

def clean_list(selected_addr):
    '''
    Keeping only the datasets selected in the interface with checkboxes.
    '''
    new_dict_data = {}  # dict_data retaining only the checked datasets.
    for addr in dict_data:
        for seladd in selected_addr:
            if seladd in addr:
                print("found {0} in {1} ".format(seladd, addr))
                new_dict_data[addr] = dict_data[addr]
    return new_dict_data

# @app.route('/proc', methods=['GET', 'POST'])
@socketio.on('msg', namespace='/follow_proc')
def proc(msg):
    '''
    Process the data
    '''
    global dict_data
    print("############### dict_data is ", dict_data)
    print("############### msg is ", msg)
    selected_proc_json = json.loads(msg)
    selected_addr = [spj.replace('box_','').replace('-','/') for spj in selected_proc_json]
    dict_data = clean_list(selected_addr)
    print("############### dict_data clean is ", dict_data)
    process(dict_data)
    # try:
    #     process(dict_data)
    # except:
    #     print("can't process !! ")

def launch_websocket():
    '''
    '''
    thread = Thread(target=background_thread)
    thread.daemon = True
    thread.start()  

if __name__ == '__main__':
    init()
    launch_websocket()
    app.run(debug=True)
    socketio.run(app)
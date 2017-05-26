#!/usr/bin/env python
# encoding: utf-8
"""
ask_data.py
"""
import sys, os
try:
    from PyQt4 import QtGui
    inherit = QtGui.QWidget
except:
    from PyQt5 import QtGui, QtWidgets
    inherit = QtWidgets.QWidget
from flask import url_for, session
import pickle


class FIND_DATA(inherit):
        '''
        PyQt interface for chosing the data.
        two possible session values:
            * session['data_file'] or session['data_folder']
        '''
        def __init__(self):
            super(FIND_DATA, self).__init__()
            self.curDir = os.getcwd()
        
        def browse(self, kind = 'file'):
            '''
            Finds the folder or file.
            '''
            diagdata = {'file': 'OpenFileName', 'folder': 'ExistingDirectory'}
            try:
                meth = getattr(QtGui.QFileDialog, 'get' + diagdata[kind])
            except:
                meth = getattr(QtWidgets.QFileDialog, 'get' + diagdata[kind])
            selected_data = meth(self, "Select_" + kind,  self.curDir)
            session['data_' + kind] = str(selected_data)
            #pickle.dump(str(selected_data), open('data_folder.p', 'w'))
            print(type(selected_data))
            ####################################
            addr = str(selected_data)
            f = open('data_folder.p', 'wb')
            pickle.dump(addr, f)
            f.close()
            print('data_' + kind)
            print("### session['data_folder'] ", session['data_folder'])
            print("session[{0}] ".format('data_' + kind), session['data_' + kind])
            print("#### selected_data is ", selected_data)

            
def search_data(kind):
    '''
    Opens the PyQt interface for searching the folder
    When the folder is chosen the program stops the Qt interface. 
    '''
    try:
        app = QtGui.QApplication(sys.argv)
        ff = FIND_DATA()
        ff.browse(kind) 
        app.exit()
    except:
        app = QtWidgets.QApplication(sys.argv)
        ff = FIND_DATA()
        ff.browse(kind) 
        sys.exit(app.exec_())
    
if __name__ == "__main__":
   print("nothing")


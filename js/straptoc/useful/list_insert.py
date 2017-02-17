# coding: utf8
import sys, os, glob

'''
Build the straptoc code for inserting images, pdf etc in a straptoc document.
syntax:
    python list_insert.py kind_of_object_to_insert corr
'''

if __name__=='__main__':
    for f in glob.glob('*'):
        print(f)

# coding: utf8
import sys, os, glob
import os.path as op
from path import path

'''
Build the straptoc code for inserting images, pdf etc in a straptoc document.
syntax:
     lins type corr (alias lins="python git/../list_insert.py")

'''
p = path()

class LIST_INSERT(object):
    '''
    Class for producing text to insert in Straptoc.
    '''
    def __init__(self, kind='pdf'):
        '''
        '''
        self.kind = kind            # Kind of files on which we want to make straptoc code
        self.strap_kind = {'pdf':'$pdf', 'vid':'$vid', 'img':'$portf', 'html':'$htm'}

    def pref(self, level):
        '''
        Prefix for folders
        '''
        return " "*level*4 + '* '
    def make_code(self, f, kind):
        code = {'pdf':'[{0} §§]({1})'.format(f[:-4], f),      # pdf
                'vid':'[{0}%%]({1})'.format(f[:-4], f),       # vid
                'img':'![%{0}%]({1})'.format(f[:-4], f),      # img
                'html':'[{0},,]({1})'.format(f[:-5], f)       # iframes
                }
        return code[kind]

    def find_insert(self, dic_infos={}, level=0):
        '''
        Produces the code to be inserted in the straptoc document. 
        '''
        pf = os.getcwd()                   # path folder
        dn = os.path.basename(pf)          # directory name
        addr = path.joinpath(*path(pf).splitall()[-(level+1):])[:]
        dic_infos[dn] = [level,addr]
        if level>0:
            print(self.pref(level) + self.strap_kind[self.kind])
            print(" "*level*4 + '+++ ' + addr)
        for f in glob.glob('*'):
            if path(f).isfile():
                dic_infos[dn].append(f)
                print(" "*level*4 + self.make_code(f, self.kind))
            elif path(f).isdir():  #
                print(self.pref(level) + f + ' ::')
                os.chdir(f)                      # go inside
                level +=1
                self.find_insert(level=level)    # recursion
                os.chdir(path('../'))            # go back
                level +=-1
        #print(dic_infos)
        self.dic_infos = dic_infos

def make_list():
    mess = "root in CloudStation? eg encours/blabla finishing before current folder "
    root = input(mess)  # root python 3

if __name__=='__main__':
    li = LIST_INSERT()
    li.find_insert()

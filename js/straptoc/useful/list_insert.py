# coding: utf8
import sys, os, glob
import os.path as op
from path import path

'''
Build the straptoc code for inserting images, pdf etc in a straptoc document.
syntax:
     lins type corr (alias lins="python git/../list_insert.py")
Becareful !!! don't use underscore for folders names.

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
        self.strap_kind = {'pdf':'$pdf', 'vid':'$vid', 'img':'$portf', 'html':'$htm'} # elements inserted for strptoc code
        self.kind_filter = {'pdf':['.pdf'], 'vid':['.mp4'], 'img':['jpg','png'], 'html':['.htm']} # list for filtering

    def pref(self, level):
        '''
        Prefix for folders
        '''
        return " "*level*4 + '* '

    def make_code(self, f, kind):
        '''
        Makes the code according to the type of element to insert in the staptoc document.
        '''
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
        pf = os.getcwd()                                # path folder
        dn = os.path.basename(pf)                       # directory name
        root = path.joinpath(*path(pf).splitall()[-(level+1):])[:]  # root address for straptoc
        for i,f in enumerate(glob.glob('*')):
            if path(f).isfile():
                if i == 0:
                    if level>0:
                        print(self.pref(level) + self.strap_kind[self.kind])
                        print(" "*level*4 + '+++ ' + root)
                for k in  self.kind_filter[self.kind]:
                    if k in f:
                        print(" "*level*4 + self.make_code(f, self.kind))
            elif path(f).isdir():  #
                print(self.pref(level) + f + ' ::')
                os.chdir(f)                      # go inside
                level +=1
                self.find_insert(level=level)    # recursion
                os.chdir(path('../'))            # go back
                level +=-1

def make_list():
    mess = "root in CloudStation? eg encours/blabla finishing before current folder "
    root = input(mess)  # root python 3

if __name__=='__main__':
    kind = sys.argv[1]
    li = LIST_INSERT(kind=kind)
    li.find_insert()

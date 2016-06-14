# coding: utf8
import sys, os

'''
Build the straptoc code for inserting images, pdf etc in a straptoc document. 
syntax: 
    python list_insert.py kind_of_object_to_insert corr
'''

class LIST_INSERT(object):
    '''
    '''
    def __init__(self, kind, param1=None):
        '''
        '''
        self.kind = kind
        if param1 == "corr":
            self.corr = True
        else:
            self.corr = False
        self.first = True
    
    def build_list(self):
        '''
        '''
        limages = ['.jpg', '.png']
        liframes = ['.html']
        lvideo = ['.mp4']
        dic_corr = {"'":"_", ",":"_","\(":"_","\)":"_",
                     "é":"e","û":"u","û":"u",
                    "â":"a","ô":"o","à":"a",
                    "è":"e" }
        root = raw_input("root in CloudStation? eg encours/blabla finishing before current folder ")  # root
        self.prefix = os.getcwd()
        self.prefix  = '../../' + root + self.prefix.split(root)[1]
        dic_categ = {} # list categories
        for path, dirs, files in os.walk('.'): # Go through the folders
            for f in files:
                fold = f
                l = f.split()
                oldpath = os.path.join(path, fold)
                if len(l) > 1:    # empty spaces detected , need of correction
                    f = '_'.join(l)    # remove empty spaces
                    newpath = os.path.join(path, f)    # newpath
                    if self.corr: 
                        os.rename(oldpath , newpath)    # if correction asked (argument 'corr'), make correction
                else:
                    newpath = oldpath    # no empty spaces detected
                root,ext = os.path.splitext(newpath)
                self.folder_subfolder(newpath, dic_categ)

    def folder_subfolder(self, newpath, dic_categ):
        '''
        '''
        filename = os.path.basename(newpath[2:])#[:-4]
        strap = {'pdf':'$pdf', 'vid':'$vid', 'img':'$portf', 'html':'$htm'}
        strapline = {'pdf':'    [{0} §§]({1})'.format(filename[:-4], filename), # pdf
                     'vid':'    [{0}%%]({1})'.format(filename[:-4], filename), # vid
                     'img':'    ![%{0}%]({1})'.format(filename[:-4], filename),  # img
                     'html':'    [{0},,]({1})'.format(filename[:-5], filename) # html
                     }
        nwps = newpath[2:].split('/')
        if len(nwps) > 1: # subfolders
            if nwps[0] not in dic_categ : 
                dic_categ[nwps[0]] = 1 # initialize
                cat0 = '* {0} :: \n    * '.format(nwps[0])
                cat1 = strap[self.kind]
                cat2 = ' \n     +++ {1}/{0} \n'.format(nwps[0], self.prefix)
                category = cat0 + cat1 + cat2 
            else:
                dic_categ[nwps[0]] += 1 # increment
                category = '    '
        else:  # first level
            if self.first:
                cat0 = ' \n     +++ {0} \n'.format(self.prefix)
                category = '* '+ strap[self.kind] + cat0
                self.first = False
            else:
                category = ''
        strline = category + strapline[self.kind]
        print strline
        
if __name__=='__main__':
    help = '''
Build the straptoc code for inserting images, pdf etc in a straptoc document. 
syntax: 
    python list_insert.py kind_of_object_to_insert corr
'''
    largkind = ['pdf', 'img', 'vid', 'html']
    li = LIST_INSERT(*sys.argv[1:])
    print '#############',sys.argv
    if sys.argv[1] in largkind:
        li.build_list()
    elif sys.argv[1]=='help':
        print help

    
        
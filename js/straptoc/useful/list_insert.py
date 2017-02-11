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
        #print('self.corr is ', self.corr)
        self.first = True
        self.limages = ['.jpg', '.png']
        self.liframes = ['.html']
        self.lvideo = ['.mp4']
        self.dic_corr = {"'":"_", ",":"_","\(":"_","\)":"_","-":"_",
                     "é":"e","û":"u","û":"u",
                    "â":"a","ô":"o","à":"a",
                    "è":"e", "(":"_",")":"_"}

    def corr_carac(self, f):
        '''
        Correcting the characters
        '''
        for k in self.dic_corr:
            if k in f:
                f = f.replace(k,self.dic_corr[k])
        return f

    def build_list(self):
        '''
        '''
        mess = "root in CloudStation? eg encours/blabla finishing before current folder "
        try:
            root = raw_input(mess)  # root
        except:
            root = input(mess)  # root
        self.prefix = os.getcwd()
        self.prefix  = '../../' + root + self.prefix.split(root)[1]
        dic_categ = {}                                                # list categories
        for path, dirs, files in os.walk('.'):                        # Go through the folders
            for f in files:                                           # considering files
                oldpath = os.path.join(path, f)
                if self.corr:
                    f = self.corr_carac(f)                            # Correction on characters
                    intermpath = os.path.join(path, f)
                    if intermpath != oldpath:
                        os.rename(oldpath , intermpath)               # if correction  make correction
                else:
                    intermpath = oldpath
                l = f.split()
                if len(l) > 1:                                        # empty spaces detected , need of correction
                    f = '_'.join(l)                                   # remove empty spaces
                    newpath = os.path.join(path, f)                   # newpath
                    if self.corr:
                        os.rename(intermpath , newpath)               # if correction asked (argument 'corr'), make correction
                else:
                    newpath = intermpath                              # no empty spaces detected
                root,ext = os.path.splitext(newpath)
                self.folder_subfolder(newpath, dic_categ)

    def folder_subfolder(self, newpath, dic_categ):
        '''
        '''
        filename = os.path.basename(newpath[2:])#[:-4]
        strap = {'pdf':'$pdf', 'vid':'$vid', 'img':'$portf', 'html':'$htm'}
        strapline = {'pdf':'    [{0} §§]({1})'.format(filename[:-4], filename),      # pdf
                     'vid':'    [{0}%%]({1})'.format(filename[:-4], filename),       # vid
                     'img':'    ![%{0}%]({1})'.format(filename[:-4], filename),      # img
                     'html':'    [{0},,]({1})'.format(filename[:-5], filename)       # html
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
        print(strline)

if __name__=='__main__':
    help = '''
Build the straptoc code for inserting images, pdf etc in a straptoc document.
syntax:
    python list_insert.py kind_of_object_to_insert corr

kind_of_object_to_insert : pdf, img, vid, html
'''
    largkind = ['pdf', 'img', 'vid', 'html']
    li = LIST_INSERT(*sys.argv[1:])
    if sys.argv[1] in largkind:
        li.build_list()
    elif sys.argv[1]=='help':
        print(help)

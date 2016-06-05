# coding: utf8
import sys, os, glob
import zipfile

'''
This program builds all  the addresses in the local folder with correction
 for inserting the pdf in a straptoc document.
syntax : lem corr
'''

class lemonde_straptoc(object):
    def __init__(self):
        self.prefix = raw_input("prefix? (folder containing all the files and folders) ") 
        # self.pathfiles = os.getcwd()
        # print self.pathfiles
        #self.prefix = self.pathfiles
        self.dic_categ = {} # list of the folders 
        self.first = True

    def unzipfiles(self): # extract all the zip files
        for path, dirs, files in os.walk('.'):
            # print "path {0}, dirs{1}, files{2} ".format(path, dirs, files)
            # #print os.path.join(path, files)
            pathzip = os.path.join(path,'*.zip')
            print pathzip
            for f in glob.glob(pathzip):
                print f
                z = zipfile.ZipFile(f, 'r')
                z.extractall(path)
                z.close()


    def straptoc_pdf(self):
        '''
        Handles two levels of folders
        '''
        filename = os.path.basename(self.newpath[2:])[:-4]
        nwps = self.newpath[2:].split('/')
        if len(nwps) > 1: # subfolders
            if nwps[0] not in self.dic_categ : 
                self.dic_categ[nwps[0]] = 1 # initialize
                category = '* {0} :: \n    * $pdf \n        +++ {1}/{0} \n'.format(nwps[0], self.prefix)  # Category
                category += '    '
            else:
                self.dic_categ[nwps[0]] += 1 # increment
                category = '    '
            # strpdf = category + '    [{0} §§]({0}.pdf)'.format(filename) #
        else:  # no subfolder
            if self.first:
                category = '* $pdf \n    +++ {0} \n'.format(self.prefix)
                self.first = False
            else:
                category = ''
        strpdf = category + '    [{0} §§]({0}.pdf)'.format(filename) #
        print strpdf

    def list_corr(self, corr):

        for path, dirs, files in os.walk('.'):
            for f in files:
                fold = f
                l = f.split()
                oldpath = os.path.join(path, fold)
                if len(l) > 1: 
                    f = '_'.join(l) # remove empty spaces
                    self.newpath = os.path.join(path, f) # newpath
                    if corr: 
                        os.rename(oldpath , self.newpath) # if correction asked (argument 'corr'), make correction
                else:
                    self.newpath = oldpath # no empty spaces
                root,ext = os.path.splitext(self.newpath)
                #print '############  ', newpath
                if ext == '.pdf':
                    self.straptoc_pdf()
        
if __name__=='__main__':
    ls = lemonde_straptoc()
    try:
        corr = sys.argv[1]
    except: 
        corr = False
    ls.unzipfiles()
    ls.list_corr(corr) # if corr == True, make the corrections.
    
        
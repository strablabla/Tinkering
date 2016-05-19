# coding: utf8
import sys, os

'''
All the addresses in the local folder with correction for inserting in infos_utiles.
'''

def list_corr(corr):
    prefix = raw_input("prefix? ")  # Prefix : folder containing all the files and folders.. 
    dic_categ = {} # list categories
    first = True
    for path, dirs, files in os.walk('.'):
        for f in files:
            fold = f
            l = f.split()
            oldpath = os.path.join(path, fold)
            if len(l) > 1: 
                f = '_'.join(l) # remove empty spaces
                newpath = os.path.join(path, f) # newpath
                if corr: 
                    os.rename(oldpath , newpath) # if correction asked (argument 'corr'), make correction
            else:
                newpath = oldpath # no empty spaces
            root,ext = os.path.splitext(newpath)
            #print '############  ', newpath
            if ext == '.pdf':
                filename = os.path.basename(newpath[2:])[:-4]
                nwps = newpath[2:].split('/')
                if len(nwps)>1:
                    
                    if nwps[0] not in dic_categ : 
                        dic_categ[nwps[0]] = 1 # initialize
                        category = '* {0} :: \n    * $pdf \n     +++ {1}/{0} \n'.format(nwps[0], prefix)  # Category
                    else:
                        dic_categ[nwps[0]] += 1 # increment
                        category = '    '
                else:
                    if first:
                        category = '* $pdf \n'
                        first = False
                    else:
                        category = ''
                strpdf = category + '    [{0} §§]({0}.pdf)'.format(filename) #
                print strpdf
        
if __name__=='__main__':
    try:
        corr = sys.argv[1]
    except: 
        corr = False
    list_corr(corr) # if corr == True, make the corrections.
    
        
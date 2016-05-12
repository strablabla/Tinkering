# coding: utf8
import sys, os

'''
All the addresses in the local folder with correction for inserting on infos_utiles.
'''

def list_corr(corr):
    for path, dirs, files in os.walk('.'):
        for f in files:
            fold = f
            l = f.split()
            oldpath = os.path.join(path, fold)
            if len(l) > 1: 
                f = '_'.join(l)
                newpath = os.path.join(path, f)
                if corr: 
                    os.rename(oldpath , newpath)
            else:
                newpath = oldpath
            root,ext = os.path.splitext(newpath)
            if ext == '.pdf':
                filename = os.path.basename(newpath[2:])[:-4]
                category = newpath[2:].split('/')[0]
                strpdf = '['+ category + ': ' + filename + ' §§]('+newpath[2:]+')'
                print strpdf
        
if __name__=='__main__':
    try:
        corr = sys.argv[1]
    except: 
        corr = False
    list_corr(corr) # if corr == True, make the corrections.
    
        
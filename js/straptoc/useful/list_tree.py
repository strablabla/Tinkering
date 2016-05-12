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
            print newpath[2:]
        
if __name__=='__main__':
    try:
        corr = sys.argv[1]
    except: 
        corr = False
    list_corr(corr) # if corr == True, make the corrections.
    
        
# coding: utf8

import sys, os
import glob
import re

'''
Makes the list of pics or iframe for inserting the text in the doc. 
If the names are not with right syntax, it makes the corrections. 
'''

def list_pic_frames(corr):

    limages = ['.jpg', '.png']
    liframes = ['.html']
    lvideo = ['.mp4']
    dic_corr = {"'":"_", "é":"e","û":"u","û":"u",
                "â":"a","ô":"o","à":"a","\(":"_","\)":"_",
                "è":"e" }

    for i, name in enumerate(glob.glob('*.*')):
        nameold = name
        l = name.split()
        for k in dic_corr: 
            # print k
            name = re.sub(k, dic_corr[k], name)
            #print name
        if len(l) >1: 
            name = '_'.join(l)
        if corr:
            os.rename(nameold, name)
        root, ext = os.path.splitext(name)
        #print ext
        if ext in limages:
            print '![%{0}%]({1})'.format(name[:-4], name)
        elif ext in liframes:
            print '[{0},,]({1})'.format(name[:-5], name)
        elif ext in lvideo:
            print '[{0}%%]({1})'.format(name[:-4], name)
    print i

if __name__=='__main__':
    try:
        corr = sys.argv[1]
    except: 
        corr = False
    list_pic_frames(corr) # if corr == True, make the corrections.
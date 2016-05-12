# coding: utf8

import os
import glob
import re

'''
Makes the list of pics or iframe for inserting the text in the doc. 
If the names are not with right syntax, it makes the corrections. 
'''

limages = ['.jpg', '.png']
liframes = ['.html']
dic_corr = {"'":"_", "é":"e","û":"u","û":"u",
            "â":"a","ô":"o","à":"a","\(":"_","\)":"_",
            "è":"e" }

for i, name in enumerate(glob.glob('*.*')):
    nameold = name
    l = name.split()
    for k in dic_corr: 
        # print k
        name = re.sub(k, dic_corr[k], name)
        print name
    if len(l) >1: 
        name = '_'.join(l)
    os.rename(nameold, name)
    root, ext = os.path.splitext(name)
    print ext
    if ext in limages:
        print '![%{0}%]({1})'.format(name[:-4], name)
    elif ext in liframes:
        print '[{0},,]({1})'.format(name[:-4], name)
print i
import os
# coding: utf8

'''
To place inside the folder
'''

for path, dirs, files in os.walk('.'):
	for f in files:
		fold = f
		l = f.split()
		oldpath = os.path.join(path, fold)
		if len(l) > 1: 
			f = '_'.join(l)
			newpath = os.path.join(path, f)
			os.rename(oldpath , newpath)
		else:
			newpath = oldpath
		root,ext = os.path.splitext(newpath)
		print newpath[2:]
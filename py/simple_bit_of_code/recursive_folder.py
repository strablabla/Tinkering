import os,sys
from os.path import join

def recurswalk(somepath): # Walking recursively in the folder
    for root, dirs, files in os.walk(somepath):
        for curfile in files:
            yield join(root, curfile)


if __name__ == '__main__':
	folder = sys.argv[1]
	print folder
	for path in recurswalk(folder):
	    if path[-4:] == 'html' and path.find('_Notes')!=-1:
	        print "path is ", path
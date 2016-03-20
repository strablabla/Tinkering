import sys
import re
from os.path import join

'''
Replace cdn address for straptoc in all the html files
'''

deb = 'Tinkering/'.split('/')
end = '/js/straptoc/straptoc.js'.split('/')
###
regtag = '[\w\d]*'
newtag = '111111'
ins0, ins1 = '\\/', '/'
add = lambda ins, name: ins.join(deb)+name+ins.join(end)
old, new = add(ins0, regtag), add(ins1, newtag)

with open ('test_replace.txt', "r") as target:
     s=target.read()
with open ('test_replace.txt', "w") as result:
	result.write(re.sub(old,new, s))
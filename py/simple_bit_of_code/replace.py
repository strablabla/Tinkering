import sys
import re
from os.path import join

deb = 'Tinkering/'.split('/')
end = '/js/straptoc/straptoc.js'.split('/')
###
regnumb = '[\w\d]*'
newnumb = '111111'
ins0, ins1 = '\\/', '/'
add = lambda ins, name: ins.join(deb)+name+ins.join(end)
old, new = add(ins0, regnumb), add(ins1, newnumb)

with open ('test_replace.txt', "r") as target:
     s=target.read()
with open ('test_replace.txt', "w") as result:
	result.write(re.sub(old,new, s))
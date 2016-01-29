import glob
import os
import os.path as op
from os.path import join
from bs4 import BeautifulSoup

list_html = []
root = 'html'

text_insert = r'''
    $('.attribute').each(function(){
        if ($(this).children('dt').attr('id').search('_debug') !=-1 ) { $(this).hide()}
    })
'''

def hellothere(somepath):
    for root, dirs, files in os.walk(somepath):
        for curfile in files:
            yield join(root, curfile)


for path in hellothere(root):
    if path[-4:] == 'html':
        print "path is ", path
        with open(path,'r') as html_doc:
            soup = BeautifulSoup(html_doc)
            new_tag = soup.new_tag("script")
            new_tag.insert(1, text_insert)
            soup.body.append(new_tag)
            print "soup" 
        with open(path,'w') as html_doc_modif:
            html_doc_modif.write(soup.prettify("utf-8"))



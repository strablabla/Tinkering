import glob
import os
import os.path as op
from os.path import join
from bs4 import BeautifulSoup

'''
Find htmls in th folder and insert the javascript 
'''


class INSERTJS(object):
    '''
    Insert js code in htmls
    '''
    def __init__(self, folder, listinj):
        self.listinj = listinj
        self.folder = folder
        print self.listinj, self.folder

    def recurswalk(self, somepath): # Walking recursively in th folder
        for root, dirs, files in os.walk(somepath):
            for curfile in files:
                yield join(root, curfile)
                
    def insert_tag(self, inj):
        '''
        Insert a new tag
        '''        
        new_tag = self.soup.new_tag("script")        # make a script tag
        new_tag.insert(1, inj)           # insert the javascript for hiding attributes finishing in "_debug"
        self.soup.body.append(new_tag)               # append the script tag at the end of body
    
    def inject_in_all(self):
        print "inject_in_all"
        for path in self.recurswalk(self.folder):
            if path[-4:] == 'html':
                print "path is ", path
                with open(path,'r') as html_doc:
                    self.soup = BeautifulSoup(html_doc)          # Beautiful soup object
                    for inj in self.listinj:
                        self.insert_tag(inj)
                with open(path,'w') as html_doc_modif:
                    html_doc_modif.write(self.soup.prettify("utf-8")) # Rewrite the file with modification.


if __name__ == "__main__":
    
    hide_debug = r'''
        $('.attribute').each(function(){
            if ($(this).children('dt').attr('id').search('_debug') !=-1 ) { $(this).hide()}
        })
    '''
    ijs = INSERTJS(folder='spike_make_sphinx', listinj=[hide_debug])
    ijs.inject_in_all()
    
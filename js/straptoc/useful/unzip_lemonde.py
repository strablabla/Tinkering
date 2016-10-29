# coding: utf8
import sys, os, glob
import zipfile

'''
Program for extracting the Lemonde pdf from zipfile and building
 the code to be inserted in the straptoc document. 
syntax : lem corr
'''

class lemonde_straptoc(object):
    def __init__(self):
        try:
            self.prefix = raw_input("prefix? (folder containing all the files and folders) ") 
        except:
            self.prefix = input("prefix? (folder containing all the files and folders) ")
        self.dic_categ = {}                    # list of the folders 
        self.first = True
        self.dict_pdfs = {}

    def unzipfiles(self):                      # extract all the zip files
        for path, dirs, files in os.walk('.'):
            pathzip = os.path.join(path,'*.zip')
            print(pathzip)
            for f in glob.glob(pathzip):
                print(f)
                z = zipfile.ZipFile(f, 'r')
                z.extractall(path)
                z.close()

    def prepare_straptoc_pdf(self):
        '''
        Prepare the dic for inserting the pdf into straptoc files.
        '''
        filename = os.path.basename(self.newpath[2:])[:-4]
        year = filename[:4]
        month = filename[4:6]
        day = filename[6:8]
        if year not in self.dict_pdfs:
            self.dict_pdfs[year] = {}
        if month not in self.dict_pdfs[year]:
            self.dict_pdfs[year][month] = {}
        if day not in self.dict_pdfs[year][month]:
            self.dict_pdfs[year][month][day] = []
        kind = '_'+filename[-3:]
        strpdf = '    [{0} §§]({1}.pdf)'.format(day + kind, filename) # straptoc syntax for pdf files
        self.dict_pdfs[year][month][day].append(strpdf)

    def show_straptoc_pdf(self):
        '''
        Producing the code to paste in the straptoc file.
        '''
        dic_month = {1:'janv', 2: 'fev', 3:'mars', 4:'avr', 5: 'mai',
              6:'juin', 7:'juill' , 8:'aout', 9:'sept',
               10:'oct', 11:'nov', 12:'dec'}
        for y in [2014]:
            print('## '+ str(y))
            
            for m in range(1,13):
                try:
                    test_exist = self.dict_pdfs[str(y)][str(m)]
                    print('\n'+ '### '+ dic_month[m] +'\n')
                    print('* $pdf \n    +++ {0} '.format(self.prefix))
                except:
                    pass
                # print(self.dict_pdfs[str(y)])
                for d in range(1,32):
                    try:
                        list_pdfs = self.dict_pdfs[str(y)][str(m)][str(d)]
                        # print('------------------'+ str(d) +'\n')
                        for p in list_pdfs:
                            print(p)
                    except:
                        pass

    # def make_straptoc_pdf(self):
    #     '''

    #     '''
    #     nwps = self.newpath[2:].split('/')           # Cut the address
    #     if len(nwps) > 1:                            # subfolders
    #         if nwps[0] not in self.dic_categ : 
    #             self.dic_categ[nwps[0]] = 1          # initialize
    #             category = '* {0} :: \n    * $pdf \n        +++ {1}/{0} \n'.format(nwps[0], self.prefix)  # Category
    #             category += '    '
    #         else:
    #             self.dic_categ[nwps[0]] += 1         # increment
    #             category = '    '
    #     else:                                        # no subfolder
    #         if self.first:
    #             category = '* $pdf \n    +++ {0} \n'.format(self.prefix)
    #             self.first = False
    #         else:
    #             category = ''

    def list_corr(self, arg):
        '''
        Makes correction on the names. 
        Launches once all the zips are dezipped. 
        Parameters:
            * arg : if it equal to "corr", then make corrections
                * remove empty space etc.. 

        '''

        for path, dirs, files in os.walk('.'):
            for f in files:
                fold = f
                l = f.split()
                oldpath = os.path.join(path, fold)
                if len(l) > 1: 
                    f = '_'.join(l)                        # remove empty spaces
                    self.newpath = os.path.join(path, f)   # newpath
                    if arg == 'corr': 
                        os.rename(oldpath , self.newpath)  # if correction asked (argument 'corr'), make correction
                else:
                    self.newpath = oldpath                 # no empty spaces
                root,ext = os.path.splitext(self.newpath)
                if ext == '.pdf':
                    self.prepare_straptoc_pdf()                    # Code for straptoc
        
if __name__=='__main__':
    ls = lemonde_straptoc()
    try:
        arg = sys.argv[1]
    except: 
        arg = False
    ls.unzipfiles()      # unzip all the files
    ls.list_corr(arg)    # if corr 
    ls.show_straptoc_pdf()
    
        
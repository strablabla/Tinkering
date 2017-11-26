# coding: utf8
import sys, os, glob
import shutil as sh
import zipfile
from collections import defaultdict
opj = os.path.join
opd= os.path.dirname
opb = os.path.basename

'''
Program for extracting the Lemonde pdf from zipfile and building
 the code to be inserted in the straptoc document.
syntax : lem
'''

class lemonde_straptoc(object):
    def __init__(self):
        self.prefix = os.getcwd()
        self.dic_categ = {}                    # list of the folders
        self.first = True
        self.dict_pdfs = {}
        self.dic_month = {1:'Janv', 2: 'Fev', 3:'Mars', 4:'Avr', 5: 'Mai',
                      6:'Juin', 7:'Juill' , 8:'Aout', 9:'Sept',
                       10:'Oct', 11:'Nov', 12:'Dec'}
        self.dict_pdfs = defaultdict(lambda: defaultdict(dict))

    def unzipfiles(self, debug=1):                      # extract all the zip files
        '''
        Search the zip files and unzip
        '''
        print("************ unzipfiles ***************")
        for path, dirs, files in os.walk('.'):
            pathzip = os.path.join(path,'*.zip')
            if debug>0: print(pathzip)
            for fzip in glob.glob(pathzip):
                newdir = fzip[:-4]
                if debug>0:  print(newdir)
                dirname = opd(newdir)
                above_dirname = opd(opd(newdir))     # address above the directory above the directory containing the zipfiles.
                basename = opb(newdir)
                namedate = basename.split('_')[2]
                y, m, d = self.extract_ymd(namedate)
                if not os.path.exists(y):
                    os.mkdir(y)
                ym = opj(y,m)  # year/month
                if not os.path.exists(ym):
                    os.mkdir(ym)
                fullpath = opj(above_dirname,ym,basename)
                if debug>0: print(fzip)
                z = zipfile.ZipFile(fzip, 'r')
                z.extractall(fullpath)
                z.close()

    def extract_ymd(self, name, debug=0):
        '''
        Extract year, month, day form name taken from zip file.
        '''
        y = name[:4]
        m = self.dic_month[int(name[4:6])]
        d = name[6:8]
        return y, m, d

    def save_pdf(self, filename, fullpath, y, m, d, debug=0):
        '''
        Save pdf informations in the dictionary  self.dict_pdfs with year, month and day information.
        '''
        kind = '_' + filename[-3:]
        strpdf = '[{0} §§]({1}.pdf)'.format(d + kind, fullpath) # straptoc syntax for pdf files
        if debug>0 : print(strpdf)
        self.dict_pdfs[y][m][d].append(strpdf)
        if debug>0 : print('*********------*******---***----' + str(self.dict_pdfs))

    def prepare_straptoc_pdf(self, debug=0):
        '''
        Prepare the dic for inserting the pdf into straptoc files.
        '''
        if debug>0 : print("************ prepare_straptoc_pdf ***************")
        filename = os.path.basename(self.newpath[2:])[:-4]
        y, m, d = self.extract_ymd(filename)
        print(y, m, d)
        fullpath = opj(y, m, 'Le_Monde_' + filename[:8], filename)
        try:
            if debug>0 : print('**** in prepare_straptoc_pdf ' + str(self.dict_pdfs))
            if len(self.dict_pdfs[y][m][d]) >= 0:
                self.save_pdf(filename, fullpath, y, m, d)
        except:
            self.dict_pdfs[y][m][d] = []
            self.save_pdf(filename, fullpath, y, m, d)

    def show_straptoc_pdf(self, debug=0):
        '''
        Producing the code to be pasted in the straptoc file.
        '''
        print("************ show_straptoc_pdf ***************")
        list_years = [i for i in range(2014, 2018)]
        for y in list_years:
            print('\n## '+ str(y))
            for mth in range(1,13):
                m = self.dic_month[mth]
                if debug>0 : print(m)
                if debug>0 : print("########### self.dict_pdfs[str(y)][m] ", self.dict_pdfs[str(y)][m])
                m_str = ''
                try:
                    if debug>0 : test_exist = self.dict_pdfs[str(y)][m]  # test if the month exists
                    m_str += '* ' + m + '::'
                except:
                    pass
                if debug>0 : print(self.dict_pdfs[str(y)])
                dtot = ''                               # string with days and pdf infos
                for d in range(1,32): # Read each day
                    d_str = ''           # string for day and straptoc code
                    dpdfs_str = ''       # string for pdfs
                    strd = str(d)
                    if len(strd) == 1: strd = '0' + strd    # transforms x in 0x
                    try:
                        list_pdfs = self.dict_pdfs[str(y)][m][strd]
                        if debug>0 : print(list_pdfs)
                        d_str += '    * ' + strd + '::\n'
                        d_str += '        * $pdf \n        +++ ../../../../..{0}\n'.format(self.prefix)
                        for p in list_pdfs:
                            dpdfs_str += '        ' + p + '\n'
                        if dpdfs_str != '':
                            dtot += d_str + dpdfs_str
                    except:
                        pass
                if dtot != '':
                    print(m_str)
                    dtot = dtot[:-1] # removing \n
                    print(dtot)

    def prepare_dic(self, arg='corr'):
        '''
        Prepare the dictionary for making the straptoc code.
        Launches once all the zips are dezipped.
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
    ls.unzipfiles()      # unzip all the files
    ls.prepare_dic()    #
    ls.show_straptoc_pdf()

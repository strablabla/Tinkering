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
        self.dic_month = {1:'Janv', 2: 'Fev', 3:'Mars', 4:'Avr', 5: 'Mai',
                      6:'Juin', 7:'Juill' , 8:'Aout', 9:'Sept',
                       10:'Oct', 11:'Nov', 12:'Dec'}
        self.dict_pdfs = defaultdict(lambda: defaultdict(dict))

    def unzipfiles(self):                      # extract all the zip files
        for path, dirs, files in os.walk('.'):
            pathzip = os.path.join(path,'*.zip')
            print(pathzip)

            for fzip in glob.glob(pathzip):
                newdir = fzip[:-4]
                print(newdir)
                dirname = opd(newdir)
                basename = opb(newdir)
                namedate = basename.split('_')[2]
                y, m, d = self.extract_ymd(namedate)
                if not os.path.exists(y):
                    os.mkdir(y)
                ym = opj(y,m)
                if not os.path.exists(ym):
                    os.mkdir(ym)
                fullpath = opj(dirname,ym,basename)
                print(fzip)
                z = zipfile.ZipFile(fzip, 'r')
                z.extractall(fullpath)
                z.close()
    def extract_ymd(self, name):
        '''
        Extract year, month, day
        '''
        y = name[:4]
        m = self.dic_month[int(name[4:6])]
        d = name[6:8]
        return y, m, d

    def prepare_straptoc_pdf(self):
        '''
        Prepare the dic for inserting the pdf into straptoc files.
        '''
        filename = os.path.basename(self.newpath[2:])[:-4]
        y, m, d = self.extract_ymd(filename)
        print(y, m, d)
        fullpath = opj(y, m, 'Le_Monde_' + filename[:8], filename)
        try:
            if len(self.dict_pdfs[y][m][d]) >= 0:
                kind = '_' + filename[-3:]
                strpdf = '    [{0} §§]({1}.pdf)'.format(d + kind, fullpath) # straptoc syntax for pdf files
                self.dict_pdfs[y][m][d].append(strpdf)
                print(self.dict_pdfs)
        except:
            self.dict_pdfs[y][m][d] = []

    def show_straptoc_pdf(self):
        '''
        Producing the code to paste in the straptoc file.
        '''

        for y in [2014]:
            print('## '+ str(y))

            for mth in range(1,13):
                m = self.dic_month[mth]
                m_str = ''
                try:
                    test_exist = self.dict_pdfs[str(y)][m]  # test if the month exists
                    m_str += '* ' + m + '::\n'
                    m_str += '    * $pdf \n    +++ {0} \n'.format(self.prefix)
                except:
                    pass
                # print(self.dict_pdfs[str(y)])

                dtot = ''
                for d in range(1,32): # Read each day
                    d_str = ''
                    dpdfs_str = ''
                    try:
                        list_pdfs = self.dict_pdfs[str(y)][m][str(d)]
                        d_str += '    * ' + str(d) + '::\n'
                        for p in list_pdfs:
                            dpdfs_str += '        * ' + p + '\n'
                        if dpdfs_str != '':
                            dtot += d_str + dpdfs_str
                    except:
                        pass
                if dtot != '':
                    print(m_str)
                    print(dtot)


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

# coding: utf8
import sys, os, glob
import shutil as sh
import zipfile
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

    def unzipfiles(self):                      # extract all the zip files
        for path, dirs, files in os.walk('.'):
            pathzip = os.path.join(path,'*.zip')
            print(pathzip)

            for fzip in glob.glob(pathzip):
                newdir = fzip[:-4]
                print(newdir)
                dirname = opd(newdir)
                basename = opb(newdir)
                numbmonth = int(basename.split('_')[2][4:6])
                year = basename.split('_')[2][:4]
                dirmonth = self.dic_month[numbmonth]
                print(numbmonth)
                print(dirmonth)
                if not os.path.exists(year):
                    os.mkdir(year)
                yearmonth = opj(year,dirmonth)
                if not os.path.exists(yearmonth):
                    os.mkdir(yearmonth)
                fullpath = opj(dirname,yearmonth,basename)
                print(fzip)
                z = zipfile.ZipFile(fzip, 'r')
                z.extractall(fullpath)
                z.close()

    def prepare_straptoc_pdf(self):
        '''
        Prepare the dic for inserting the pdf into straptoc files.
        '''
        filename = os.path.basename(self.newpath[2:])[:-4]
        year = filename[:4]
        month = filename[4:6]
        day = filename[6:8]
        fullpath = opj(year, self.dic_month[int(month)], 'Le_Monde_'+filename[:8], filename)
        if year not in self.dict_pdfs:
            self.dict_pdfs[year] = {}
        if month not in self.dict_pdfs[year]:
            self.dict_pdfs[year][month] = {}
        if day not in self.dict_pdfs[year][month]:
            self.dict_pdfs[year][month][day] = []
        kind = '_' + filename[-3:]
        strpdf = '    [{0} §§]({1}.pdf)'.format(day + kind, fullpath) # straptoc syntax for pdf files
        self.dict_pdfs[year][month][day].append(strpdf)

    def show_straptoc_pdf(self):
        '''
        Producing the code to paste in the straptoc file.
        '''

        for y in [2014]:
            print('## '+ str(y))

            for m in range(1,13):
                try:
                    test_exist = self.dict_pdfs[str(y)][str(m)]  # test if the month exists
                    print('* ' + self.dic_month[m] + '::')
                    print('    * $pdf \n    +++ {0} '.format(self.prefix))
                except:
                    pass
                # print(self.dict_pdfs[str(y)])
                for d in range(1,32): # Read each day
                    try:
                        list_pdfs = self.dict_pdfs[str(y)][str(m)][str(d)]
                        print('    * ' + str(d) + '::')
                        for p in list_pdfs:
                            print('        * ' + p)
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

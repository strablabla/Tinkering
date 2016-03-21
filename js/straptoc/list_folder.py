import os, sys, re, json, glob

if __name__ == '__main__':
	listf = []
	target = sys.argv[1] # target : html file to be analysed.
	regselect = re.compile('\[.*\<\<.*\]') # regexp for finding the lines
	regadd = re.compile('\(.*\)') # regexp for address
	with open(target) as html:
		for l in html.readlines():
			brack = regselect.search(l) # containing title name. 
			if brack :
				ll = regadd.search(l).group()[1:-1] # find the adress where to search
				print 'will search in ',  ll
				print os.getcwd() # pwd
				for f in glob.glob(os.path.join(ll,'*.pdf')):
					print f
					listf.append(f)
				if not os.path.exists('json'):
					os.mkdir('json')
				namejson = brack.group().split('<<')[0][1:-1].strip()
				print "namejson", namejson
				addjson = os.path.join('json',namejson+'.json')
				print "addjson is ", addjson
				json.dump(listf, open(addjson,'w'))
	

	
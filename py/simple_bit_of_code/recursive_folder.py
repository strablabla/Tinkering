def recurswalk(somepath): # Walking recursively in th folder
    for root, dirs, files in os.walk(somepath):
        for curfile in files:
            yield join(root, curfile)

for path in recurswalk(folder):
    if path[-4:] == 'html':
        print "path is ", path
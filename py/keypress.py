import os
import sys
os.system("stty raw -echo")
c = sys.stdin.read(1)
print ord(c)
os.system("stty -raw echo")
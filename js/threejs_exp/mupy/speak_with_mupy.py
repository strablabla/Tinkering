import serial
import subprocess as sub

'''
# uPy side

import pyb
import time

acc = pyb.Accel()

green = pyb.LED(2)
green.on()
yellow = pyb.LED(3)
yellow.on()
while 1:
    #time.sleep(1)
    print('x:' + str(acc.x()) + ' y:' + str(acc.y())) # + '\n'

#-------------------------------
# Sending a command to the uPy
ser.write('pyb.LED(1).on() \r') #
'''

ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1) # Establish serial connection.

while 1:
    l=ser.readline()
    print(l)

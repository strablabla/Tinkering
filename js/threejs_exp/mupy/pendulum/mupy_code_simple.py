'''
Code put in the file main.py
'''
import pyb
import time

acc = pyb.Accel()        # Accelerometer

green = pyb.LED(2)
green.on()
yellow = pyb.LED(3)
yellow.on()

while 1:
    time.sleep(0.025)
    print(str(acc.x()) + ',' + str(acc.y())+ ',' + str(acc.z()))

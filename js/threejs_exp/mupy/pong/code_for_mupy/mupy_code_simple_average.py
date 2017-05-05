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

count = 0
acx,acy,acz = 0,0,0
rep = 10
while 1:
    time.sleep(0.025)
    acx += float(acc.x()); acy += float(acc.y()); acz += float(acc.z());
    if count % rep == 0:
        print(str(int(acx/rep)) + ',' + str(int(acy/rep))+ ',' + str(int(acz/rep)))
        count = 0
        acx,acy,acz = 0,0,0
    count += 1

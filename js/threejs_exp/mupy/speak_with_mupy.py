import serial
import subprocess as sub

'''
# uPy side
acc = pyb.Accel()
print(acc.x()+'\n')

# Sending a command to the uPy
ser.write('pyb.LED(1).on() \r') #
'''

ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1) # Establish serial connection.

while 1:
    l=ser.readline()
    print(l)

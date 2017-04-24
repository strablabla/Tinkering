import serial
import subprocess as sub

# sub.call('sudo screen /dev/ttyACM0')
# sub.call('pyb.LED(1).on()')

ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1) # Establish serial connection.
#ser.write('print("Helllllo")') # sending command to car.
ser.write('pyb.LED(1).on()') # sending command to car.
ser.write('pyb.LED(0).on()') # sending command to car.
# print(ser.readline())

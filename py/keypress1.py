from pyhooked import hook
def foo():
    print "foo"
hk=hook() #make a new instance of PyHooked
hk.Hotkey(["LCtrl","A"],foo) #add a new shortcut ctrl+a, that calls foo() when pressed
hk.listen() #start listening for key presses
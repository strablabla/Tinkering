from opencv import*
from opencv.highgui import*
import win32api
import win32con
from ctypes import windll
from SendKeys import SendKeys
from win32com.client import constants
import win32com.client
import pythoncom
import pyHook
import threading
import sys
import time
import pyTTS

'''
Programme pour guide la souris avec le pointeur laser
lors d'une projection de l'écran d'ordi sur un mur
Interaction possible du laser avec écran..
Code liostock 29/04/2010
'''

global keystr,testobj,name,extra
keystr='L'
testobj=0
extra=''

tts = pyTTS.Create()
tts.Rate = -1

"""
Définitions pour la souris
"""
def m_move(x,y):
    windll.user32.SetCursorPos(x,y)

def l_click(x="current", y="current"):
    if x == "current" and y == "current":
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN, 0, 0)
        time.sleep(0.05)
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP, 0, 0)
    else:
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN, x, y)
        time.sleep(0.05)
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP, x, y)

def r_click(x="current", y="current"):
    if x == "current" and y == "current":
        win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTDOWN, 0, 0)
        time.sleep(0.05)
        win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTUP, 0, 0)
    else:
        win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTDOWN, x, y)
        time.sleep(0.05)
        win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTUP, x, y)

def croisementdroites(yr,xr,yt,xt,yf,xf,yg,xg) :
    u=float(yt-yr)/float(xt-xr)
    v=float(yg-yf)/float(xg-xf)
    #print "vecteur directeurs : ",u,v
    y0=(v*u)*(xr-xg-yr/u+yg/v)/(u-v)
    x0=(u*xr-v*xg+yg-yr)/(u-v)
    return (y0,x0)

def coordA (): global xa,ya ;xa=xcoul;ya=ycoul
def coordB (): global xb,yb ;xb=xcoul;yb=ycoul
def coordC (): global xc,yc ;xc=xcoul;yc=ycoul
def coordD (): global xd,yd ; xd=xcoul;yd=ycoul

def ptsfuite():
    global xh,yh,xv,yv
    (yh,xh)=croisementdroites(ya,xa,yb,xb,yc,xc,yd,xd)
    (yv,xv)=croisementdroites(ya,xa,yd,xd,yb,xb,yc,xc)

asscorn={"1": coordA,"2": coordB,"3": coordC,"4": coordD}

corner = 0
'''
yres=800
xres=1280
'''
yres=600
xres=1024

def redefcoord(xpos,ypos):
    #global xX,xY,yX,yY
    (yX,xX)=croisementdroites(ya,xa,yb,xb,ypos,xpos,yv,xv)# proj sur X
    (yY,xY)=croisementdroites(ya,xa,yd,xd,ypos,xpos,yh,xh)# proj sur Y


    '''
    yX=int(yX)
    xX=int(xX)
    yY=int(yY)
    xY=int(xY)
    '''
    yX=int((yX-ya)/float(yd-ya)*yres) #
    xX=xres-int((xX-xa)/float(xb-xa)*xres) #abscisse X
    yY=int((yY-ya)/float(yd-ya)*yres) #ordonnée Y
    xY=int((xY-xa)/float(xb-xa)*xres) #

    return (yX,xX,yY,xY)





# global variable which stores information about the pressed mousebuttons
mouse_events = [False,False,False,False,False,False,False,False,False,False]
event_detected = False

# Souris OpenCV
win_name = "testing..."
EVENTS = ['CV_EVENT_MOUSEMOVE', 'CV_EVENT_LBUTTONDOWN', 'CV_EVENT_RBUTTONDOWN',  'CV_EVENT_MBUTTONDOWN',  'CV_EVENT_LBUTTONUP',
        'CV_EVENT_RBUTTONUP', 'CV_EVENT_MBUTTONUP'  , 'CV_EVENT_LBUTTONDBLCLK','CV_EVENT_RBUTTONDBLCLK','CV_EVENT_MBUTTONDBLCLK']


# our callback function, 5th parameter not used here.
def callback_function(event,x,y,flag,param):
      global xcoul, ycoul ,keystr, xout, yout
      globals()["event_detected"] = True
      # check if event already occured; if not, output info about new event.
      if globals()["mouse_events"][event] == False:
            print "Event "+globals()["EVENTS"][event]+" detected."+"x,"+str(x)+"y,"+str(y)
            #globals()["mouse_events"][event] = True
            #cvCircle( frame, cvPoint(x,abs(theight-y)), 10, (10,100,250), 3 )
            xcoul=x
            ycoul=abs(theight-y)
            xout=x
            yout=y
            #cvShowImage(win_name, frame)
            if globals()["EVENTS"][event]=='CV_EVENT_LBUTTONDOWN':
                keystr='P'
            if globals()["EVENTS"][event]=='CV_EVENT_RBUTTONDOWN':
                keystr='H'


      return



def keyb():
    hm = pyHook.HookManager()
    hm.SubscribeKeyDown(onkey)
    hm.HookKeyboard()
    pythoncom.PumpMessages()
    print 'sortie pompe \n'
    hm.UnhookKeyboard()

def onkey(event):
    global keystr
    keystr=event.Key
    print keystr+'\n'
    if event.Key=='M' :
        windll.user32.PostQuitMessage(0) #Quitter la pompe
    if keystr=='F5' : #désactivation de F5 pour le pointeur laser Kensington
        return False
    else :
        return True

# Create a Window

cvNamedWindow("ohoh", 1)

# Connect to the camera
capture = cvCreateCameraCapture(0)
top=0
valfen=100
fen=valfen
capt=5
centrx=300
centry=255
centrabsx=300
centrabsy=255
xcoul=300
ycoul=255
posxmoy=centrabsx
posymoy=centrabsy
pixmin=[200,200,200]
pixmax=[0,0,0]
pix=[0,0,0]
piximoy=[0,0,0]
listobjcoul={}
compt=0
sobder=2
#ycoormem=0

b = threading.Thread(None, keyb, None,(), {})#Thread clavier
b.start()



print "début prog"
print "W pour déclencher l'attribution de couleur"
print "E pour enregistrer la couleur en lui donnant un nom"
print "M pour arrêter le programme"
print "T pour déclencher la traque"



while 1:
    pythoncom.PumpWaitingMessages()
    # Grab the current frame from the camera
    frame = cvQueryFrame(capture)
    cvFlip (frame, frame, 1)
    # Wait a bit and check any keys has been pressed
    key = cvWaitKey(10)
    cvSetMouseCallback( "ohoh", callback_function )

    #To do some simple color-tracking, create a mask with all the pixels withing a given range of colors:

    # Create a 8-bit 1-channel image with same size as the frame
    #cvThreshold( frame, frame, 130, 255, CV_THRESH_BINARY )
    #cvThreshold( frame, frame, 100, 255, CV_THRESH_TOZERO )
    #sob = cvCreateImage( cvGetSize(frame), 8, 3 )
    #cvSobel( frame, sob, sobder, sobder, 5 )

    taille=cvGetSize(frame)
    twidth=taille.width
    theight=taille.height

    xsum=0
    ysum=0
    compt=0 #Remise du compteur à zéro
    pix=[0,0,0]#Remise des couleurs à zéro


    # Conditions aux limites
    if centrx-fen>0 :
        debx=centrx-fen
    else :
        debx=0

    if centry-fen>0 :
        deby=centry-fen
    else :
        deby=0

    if centrx+fen< twidth:
        finx=centrx+fen
    else :
        finx=twidth

    if centry+fen<theight :
        finy=centry+fen
    else :
        finy=theight


    if keystr=='P' :

        if corner<4 :
            corner+=1
        asscorn.get(str(corner))()
        if corner==4 :
            if xd==xa : xa+=1
            if ya==yb : yb+=1
            if xb==xc : xc+=1
            if yc==yd : yd+=1
            ptsfuite()
            keystr='H'
        keystr='O'
    if corner==4 :
        (yX,xX,yY,xY)=redefcoord(xcoul,ycoul)
        cvRectangle (frame, cvPoint (xY,yY), # projection en Y
                 cvPoint (xY+capt,yY+capt),
                            (200,100,200), -1, 8, 0)
        cvRectangle (frame, cvPoint (xX,yX), # projection en X
                 cvPoint (xX+capt,yX+capt),
                            (200,100,200), -1, 8, 0)
        (ycentre,xcentre)=croisementdroites(ya,xa,yc,xc,yb,xb,yd,xd)
        xcentre=int(xcentre);ycentre=int(ycentre)
        #print xcentre, ycentre
        cvRectangle (frame, cvPoint (xcentre,ycentre), #
                 cvPoint (xcentre+capt,ycentre+capt),
                            (200,100,200), -1, 8, 0)

    if keystr=='M' :
        print "souris découplée"
        break

    """
    cvRectangle (frame, cvPoint (centrabsx-capt,centrabsy-capt), # zône de capture..
                 cvPoint (centrabsx+capt,centrabsy+capt),
                            (200,200,200), 1, 8, 0)
    """
    cvRectangle (frame, cvPoint (xcoul-capt,ycoul-capt), # zône de capture..
                 cvPoint (xcoul+capt,ycoul+capt),
                            (200,200,200), 1, 8, 0)
    cvShowImage("ohoh", frame)
    #cvShowImage("ohoh", sob)

    if keystr=='H' :
        print "suivi laser"
        break

posxold=0
posyold=0
posx=0
posy=0
pics=1
# Create a Window

cvNamedWindow("laser", 1)
cvNamedWindow("sobel", 1)
sobder=1
while 1:
    # Grab the current frame from the camera
    frame = cvQueryFrame(capture)
    cvFlip (frame, frame, 1)
    # Wait a bit and check any keys has been pressed
    key = cvWaitKey(10)
    cvSetMouseCallback( "ohoh", callback_function )

    #To do some simple color-tracking, create a mask with all the pixels withing a given range of colors:

    # Create a 8-bit 1-channel image with same size as the frame
    #cvThreshold( frame, frame, 130, 255, CV_THRESH_BINARY )
    #cvThreshold( frame, frame, 100, 255, CV_THRESH_TOZERO )
    sob = cvCreateImage( cvGetSize(frame), 8, 3 )
    cvSobel( frame, sob, sobder, sobder, 5 )
    #cvFlip (sob, sob, 1)



    xsum=0
    ysum=0

    compt=0 #Remise du compteur à zéro

    if keystr=='M' :
        print "souris découplée"
        break
    if keystr=='S' : #diminuer le nb de pixels rouges à détecter pr valider
        if pics!=1 :
            pics+=-1
        keystr='O'
        print pics
    if keystr=='D' : # augmenter nb de pixels rouges à détecter pr valider
        pics+=1
        keystr='O'
        print pics
    if keystr=='Prior' : # augmenter nb de pixels rouges à détecter pr valider
        l_click()
        keystr='O'
        print "clic"

    xmin=xa
    xmax=xb
    ymin=yc
    ymax=ya


    limbleuvert=30
    limrouge=200
    detpix=0
    for i in range (xmin,xmax,2):
        for j in range (ymin,ymax,2):
            for k in range (0,pics):
                if cvGet2D(frame,j,i+k).val[2]>limrouge : #and cvGet2D(frame,j,i+k).val[1]<limbleuvert and cvGet2D(frame,j,i+k).val[0]<limbleuvert:
                    if cvGet2D(sob,j-1,i+k+1).val[2]>limrouge :
                    #if cvGet2D(sob,j,i+1).val[2]>limrouge and cvGet2D(sob,j,i+1).val[1]<limbleuvert and cvGet2D(sob,j,i+1).val[0]<limbleuvert:
                    # if cvGet2D(sob,j,i+2).val[2]>limrouge and cvGet2D(sob,j,i+2).val[1]<limbleuvert and cvGet2D(sob,j,i+2).val[0]<limbleuvert:
                    #print "red"
                        detpix+=1

            if detpix==pics :

                compt+=1
                xsum+=i
                ysum+=j
                detpix=0
            else :
                detpix=0


    if compt>0 :
        posx=xsum/compt # position x moyenne
        posy=ysum/compt #position y moyenne
        posxold=posx
        posyold=posy
    else :
        posx=posxold
        posy=posyold


    (yX,xX,yY,xY)=redefcoord(posx,posy)
    m_move(xX,yY)
    cvRectangle (frame, cvPoint (xY,yY), # projection en Y
             cvPoint (xY+capt,yY+capt),
                        (200,100,200), -1, 8, 0)
    cvRectangle (frame, cvPoint (xX,yX), # projection en X
             cvPoint (xX+capt,yX+capt),
                        (200,100,200), -1, 8, 0)
    (ycentre,xcentre)=croisementdroites(ya,xa,yc,xc,yb,xb,yd,xd)
    xcentre=int(xcentre);ycentre=int(ycentre)


    cvRectangle (frame, cvPoint (posx,posy), # centre de la zône
         cvPoint (posx+5,posy+5),
                    (100,100,200), -1, 8, 0)

    cvShowImage("laser", frame)
    cvShowImage("sobel", sob)
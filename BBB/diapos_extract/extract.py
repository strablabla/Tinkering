''' 
extract
'''

import cv2
import numpy as np
from time import sleep

def nothing(arg):
    pass

def thresh_callback(thresh):
    p = cv2.getTrackbarPos('perim','input')
    print thresh, p
    edges = cv2.Canny(blur,thresh,thresh*2)
    drawing = np.zeros(img.shape,np.uint8)     # Image to draw the contours
    contours,hierarchy = cv2.findContours(edges,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    block = False
    for i,cnt in enumerate(contours):
        color = np.random.randint(0,255,(3)).tolist()  # Select a random color   
        perim = cv2.arcLength(cnt, True)
        if perim > p and not block:
            x,y,w,h = cv2.boundingRect(cnt)
            print x,y, w, h
            cv2.drawContours(drawing,[cnt],0,color,2)
            cv2.imshow('output',drawing)
            block = True
            subpic = img[y:y+h,x:x+w]
            img[img==subpic[10,10]]=255
            cv2.imwrite('rect_bottom.png', subpic)
   
    cv2.imshow('input',img)

img = cv2.imread('eg_pdf.png')
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray,(5,5),0)

cv2.namedWindow('input',cv2.WINDOW_AUTOSIZE)

thresh = 100
max_thresh = 255
p = 100
max_p = 600

cv2.createTrackbar('canny','input',thresh,max_thresh,thresh_callback)
cv2.createTrackbar('perim','input',p,max_p,nothing)

thresh_callback(thresh)

'''
while 1:
    thresh_callback()
    sleep(10000)
'''

if cv2.waitKey(0) == 27:
    cv2.destroyAllWindows()


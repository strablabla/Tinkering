''' 
extract qcm
'''

import cv2
import numpy as np
arr = np.array

def nothing(arg):
    pass

def thresh_callback(thresh):
    p = cv2.getTrackbarPos('perim','input')
    print thresh, p
    edges = cv2.Canny(blur,thresh,thresh*2)
    drawing = np.zeros(img.shape, np.uint8)     # Image to draw the contours
    contours,hierarchy = cv2.findContours(edges,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    block = False
    listy = []
    for i, cnt in enumerate(contours):
        color = np.random.randint(0,255,(3)).tolist()  # Select a random color   
        perim = cv2.arcLength(cnt, True)
        
        if p+100> perim > p and not block:
            x,y,w,h = cv2.boundingRect(cnt)
            
            cv2.drawContours(drawing,[cnt], 0, color, 2)
            cv2.imshow('output',drawing)
            
            if y not in listy: 
                    print y 
                    print listy
                    wb = 4 #width edege
		    subpic = img[y:y+h,x:x+w]
                    try:
                        minsub = subpic[wb:-wb, wb:-wb].min()
                        print "minimum is ", minsub
                    except:
                        minsub = 100
		    if minsub > 230:
                        cv2.imwrite('qcm_nocross_'+ str(y) + '_' + str(i) + '.png', subpic)
                    else:
                        cv2.imwrite('qcm'+ str(y) + '_' + str(i) + '.png', subpic)
                    listy.append(y)
    cv2.imshow('input',img)
                    

img = cv2.imread('qcm.jpg')[:,540:570]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5,5), 0)

cv2.namedWindow('input', cv2.WINDOW_AUTOSIZE)

thresh = 50
max_thresh = 255
p = 25
max_p = 600

cv2.createTrackbar('canny','input',thresh, max_thresh, thresh_callback)
cv2.createTrackbar('perim','input', p, max_p, nothing)
thresh_callback(thresh)

if cv2.waitKey(0) == 27:
    cv2.destroyAllWindows()


import numpy as np
import cv2
arr = np.array

cap = cv2.VideoCapture(0)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH,320)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT,240)
thresh = 5
max_thresh = 255

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5,5), 0)
    edges = cv2.Canny(blur,thresh,max_thresh)
    # edges = cv2.adaptiveThreshold(blur,255,1,1,5,2)
    contours,hierarchy = cv2.findContours(edges,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    ctrs_bckgrd = np.zeros(frame.shape, np.uint8) 
    image_area = gray.size
    for i, cnt in enumerate(contours):
        perim = cv2.arcLength(cnt, True)
        # area = cv2.contourArea(cnt)

        #print dist
        if  perim > 50:  #  and area > image_area/4 :
            cd = tuple(cnt[0][0])
            cf = tuple(cnt[-1][0])
            col = (150, 255, 230)
            #cv2.circle(ctrs_bckgrd, cd, 10, (255,0,0))
            #cv2.circle(ctrs_bckgrd, cf, 10, (0, 255, 0))
            diffcnt =  arr(cf)-arr(cd)
            dist = np.sqrt(diffcnt[0]**2+diffcnt[1]**2)
            if dist > 5 :
                color = np.random.randint(0,255,(3)).tolist()  #
                cv2.drawContours(frame,[cnt], 0, color, 2)
                cv2.drawContours(ctrs_bckgrd, [cnt], 0, color, 2)
                cv2.imshow('output', ctrs_bckgrd)

            #cv2.circle(ctrs_bckgrd, (100,100),10,(0,0,255),-1)
            #cv2.circle(img,(200,200), 40, (0,0,255), -1)

            #print np.sqrt((cnt[0]-cnt[-1])**2)

    # Our operations on the frame come here
    # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Display the resulting frame
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()

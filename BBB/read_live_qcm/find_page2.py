import numpy as np
import cv2
arr = np.array

cap = cv2.VideoCapture(0)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH,320)
cap.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT,240)
thresh = 5
max_thresh = 255

def order_pts_frame(screenCnt):
    print("finding contours of paper")
    #cv2.drawContours(resize,[screenCnt],-1,(0,0,255),2)
    #cv2.imshow("Selected Border",res)

    pts = screenCnt.reshape(4, 2) * ratio
    rect = np.zeros((4, 2), dtype = "float32")

    s = pts.sum(axis = 1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]

    diff = np.diff(pts, axis = 1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]

    (tl,tr,br,bl) = rect
    print ((tl,tr,br,bl))
    return [tl,tr,br,bl]

def new_dim(corners, ii):
    #new dimensions of image
    tl,tr,br,bl = corners
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))

    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))

    ii.maxWidth, ii.maxHeight = maxWidth, maxHeigh

    dst = np.array([
            [0, 0],
            [maxWidth - 1, 0],
            [maxWidth - 1, maxHeight - 1],
            [0, maxHeight - 1]], dtype = "float32")
    return dst

def perspective(ii, dst):
    X = cv2.getPerspectiveTransform(rect, dst)
    #cv2.imshow("original1",orig)
    crop = cv2.warpPerspective(ii.orig, X, (ii.maxWidth, II.maxHeight))
    crop = crop.astype("uint8") * 255

    crop = cv2.cvtColor(crop,cv2.COLOR_BGR2GRAY)

    ret, im_th1 = cv2.threshold(crop,115,255,cv2.THRESH_BINARY_INV)
    ret, im_th2 = cv2.threshold(crop,115,255,cv2.THRESH_BINARY)
    im_th3 = cv2.adaptiveThreshold(crop,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,3)

    ii.im_th2 = cv2.resize(im_th2,(700,800),interpolation = cv2.INTER_AREA)
    ii.im_th1 = cv2.resize(im_th1,(700,800),interpolation = cv2.INTER_AREA)
    im_th3 = cv2.resize(im_th3,(700,800),interpolation = cv2.INTER_AREA)

def save_im(ii):
    im_th1, im_th2 = ii.im_th1, ii.im_th2
    cv2.imshow("Final Image 1",im_th1)
    cv2.imshow("Final Image 2",im_th2)
    #cv2.imshow("adaptive",im_th3)
    cv2.imwrite("1.jpg",im_th1)
    cv2.imwrite("2.jpg",im_th2)

# def find_frame(cnt, perim, ctrs_bckgrd):
#     approx = cv2.approxPolyDP(cnt, 0.02*perim,True)
#     if len(approx) == 4:
#         print 'ooooo'
#         screenCnt = approx
#         color_app = [100,100,100]
#         cv2.drawContours(ctrs_bckgrd, [screenCnt], 0, color_app, 2)
#         x,y,w,h = cv2.boundingRect(screenCnt)
#         xmin, xmax, ymin, ymax = x, x+w, y, y+h
#         pts_frame = [xmin, xmax, ymin, ymax]
#         return pts_frame

def find_frame(ii):
    cnt, perim, bckgrd = ii.cnt, ii.perim, ii.bckgrd
    approx = cv2.approxPolyDP(cnt, 0.02*perim, True)
    if len(approx) == 4:
        print 'ooooo'
        screenCnt = approx
        color_app = [100,100,100]
        cv2.drawContours(bckgrd, [screenCnt], 0, color_app, 2)
        # x,y,w,h = cv2.boundingRect(screenCnt)
        # xmin, xmax, ymin, ymax = x, x+w, y, y+h
        # pts_frame = [xmin, xmax, ymin, ymax]
        tl,tr,br,bl = order_pts_frame(screenCnt)
        dst = new_dim(tl,tr,br,bl)
        perspective(ii, dst)
        save_im(ii)
        return dst

def find_inside_frame(ii):
    cnt, perim, bckgrd = ii.cnt, ii.perim, ii.bckgrd
    color_inside = [0,0,150]
    m = cv2.moments(cnt) 
    # cv2.drawContours(ctrs_bckgrd, [cnt], 0, color_inside, 2)
    
    try:
        mx = int(m['m10']/m['m00'])
        my = int(m['m01']/m['m00'])
        approx = cv2.approxPolyDP(cnt, 0.02*perim,True)
        cndl = len(approx) == 4
        if mx in range(x,x+w) and my in range(y,y+h) and cndl:
            print('inside')
            cv2.drawContours(ctrs_bckgrd, [cnt], 0, color_inside, 2)
                cv2.drawContours(frame,[cnt], 0, color_inside, 2)
    except:
        pass

class IMAGE_INFOS():
    def __init__(self, image):
        self.ratio = image.shape[0] / 800.0
        #read the imagea and resize it.
        (h, w) = image.shape[:2]
        self.r = 800 / float(h) 
        self.width = int(w * r)
        self.dim = None
        #self.resize = cv2.resize(image,(width,800), interpolation = cv2.INTER_AREA)

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    ii = IMAGE_INFOS(frame)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #blur = cv2.GaussianBlur(gray, (5,5), 0)
    edges = cv2.Canny(gray,thresh,max_thresh)
    # edges = cv2.adaptiveThreshold(blur,255,1,1,5,2)
    contours,hierarchy = cv2.findContours(edges,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    bckgrd = np.zeros(frame.shape, np.uint8) 
    image_area = gray.size
    for i, cnt in enumerate(contours):
        perim = cv2.arcLength(cnt, True)
        ii.cnt, ii.perim, ii.bckgrd = cnt, perim, bckgrd
        if  perim > 800:  
            pts_frame = find_frame(ii)
    	# if perim < 200: 
     #        find_inside_frame(ii)
            #cv2.imshow('newdeges', newedges)
	    color = np.random.randint(0,255,(3)).tolist()  #
	    #cv2.drawContours(frame,[cnt], 0, color, 2)  
	    #cv2.drawContours(ctrs_bckgrd, [cnt], 0, color, 2)
	    cv2.imshow('output', bckgrd)

    # Our operations on the frame come here
    # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Display the resulting frame
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()

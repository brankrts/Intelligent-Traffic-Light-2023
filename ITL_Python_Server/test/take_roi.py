import cv2
import numpy as np
from constants import MAIN_ROI3

cap  = cv2.VideoCapture("assets/video4.mp4")

MAIN_ROI3 =MAIN_ROI3
pt = np.array([
[MAIN_ROI3["x1"],MAIN_ROI3["y1"]],
[MAIN_ROI3["x2"],MAIN_ROI3["y2"]],
[MAIN_ROI3["x3"],MAIN_ROI3["y3"]],
[MAIN_ROI3["x4"],MAIN_ROI3["y4"]],
[MAIN_ROI3["x5"],MAIN_ROI3["y5"]],
[MAIN_ROI3["x6"],MAIN_ROI3["y6"]],
    ])
pt = pt.reshape((-1,1,2))

isClosed = True
color =  (255,0,0)
thickness =2 
while True:

    ret , frame = cap.read()

    if ret:
        #frame = cv2.polylines(frame , [pt] , isClosed , color , thickness)
        #cv2.imshow("frame",frame)
        roi = cv2.selectROI(frame)
        print(roi)

        if cv2.waitKey(12) & 0xFF == ord('q'):
            break
            



   

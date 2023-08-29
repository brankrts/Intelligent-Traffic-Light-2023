import cv2
import numpy as np

from itl_models import RoiModel
from processing import LaneContourFinder, LaneCountFinder
from constants import MAIN_ROI2, MAIN_ROI1, MAIN_ROI3, MAIN_ROI4
from processing.roi_filter import ROIFilter
from util import ImageMerger


path = "assets/video3.mp4"

const_model = RoiModel(MAIN_ROI3)

cap = cv2.VideoCapture(path)
prev_frame_time = 0
new_frame_time = 0
finder = LaneContourFinder(contour_threshold=const_model.contour_threshold,
                           contour_distance=const_model.contour_distance, contour_area_threshold=const_model.contour_area_threshold)
lane_count = None

ret, frame = cap.read()


frame, window_size = ROIFilter().getFilteredImage(frame, MAIN_ROI3)
contour_model = finder.get_all_values(window_size)
count_finder = LaneCountFinder(
    contour_model=contour_model, min_y_threshold=const_model.min_y_threshold, max_y_threshold=const_model.max_y_threshold)

lane_count, model = count_finder.visualize()
frame = cv2.resize(frame, (400, 400))
cv2.imshow("Binary", model.binary_image)
cv2.waitKey(0)

stacked_image = ImageMerger().merger([model.original_image, model.binary_image, model.max_area_mask,
                                      model.contour_img, model.line_image, model.contour_in_max_contour_area_image], 1)
stacked_image = cv2.resize(stacked_image, (1500, 500))

cv2.imshow("frame", stacked_image)
cv2.waitKey(0)

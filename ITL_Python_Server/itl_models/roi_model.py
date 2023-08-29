import numpy as np


class RoiModel:

    def __init__(self, roi):

        self.name = roi["name"]
        self.x1 = roi["x1"]
        self.y1 = roi["y1"]
        self.x2 = roi["x2"]
        self.y2 = roi["y2"]
        self.x3 = roi["x3"]
        self.y3 = roi["y3"]
        self.x4 = roi["x4"]
        self.y4 = roi["y4"]
        self.x5 = roi["x5"]
        self.y5 = roi["y5"]
        self.x6 = roi["x6"]
        self.y6 = roi["y6"]

        self.window_x = roi["window_sizes"]["x"]
        self.window_y = roi["window_sizes"]["y"]
        self.window_width = roi["window_sizes"]["width"]
        self.window_height = roi["window_sizes"]["height"]

        self.contour_area_threshold = roi["config"]["contour_area_threshold"]
        self.contour_threshold = roi["config"]["contour_threshold"]
        self.contour_distance = roi["config"]["contour_distance"]
        self.min_y_threshold = roi["config"]["min_y_threshold"]
        self.max_y_threshold = roi["config"]["max_y_threshold"]

    def getRoiCorners(self):
        return np.array([[(self.x1, self.y1), (self.x2, self.y2), (self.x3, self.y3), (self.x4, self.y4), (self.x5, self.y5), (self.x6, self.y6)]], dtype=np.int32)

    def getWindowSize(self, image):
        return image[self.window_y:self.window_y+self.window_height, self.window_x:self.window_x+self.window_width]

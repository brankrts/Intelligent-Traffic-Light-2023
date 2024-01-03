from torch.hub import load
import cv2
import numpy as np
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon

from itl_models import RoiModel
from constants import TRUCK_WAITING_TIME, CAR_WAITING_TIME, MOTORCYCLE_WAITING_TIME, BUS_WAITING_TIME, TRUCK, CAR, MOTORCYCLE, BUS, RED, BLUE


class Detector:

    model = load('yolov5', 'yolov5m', source='local')
    model.cuda()
    labels = ["car", "truck", "bus", "motorcycle"]
    radius = 8
    lineType = 8
    circleThickness = -1
    lineThickness = 2

    def __init__(self):
        self.density = 0

    def detect(self, img, roi):
        self.main_roi = roi
        current_values = None
        current_values = dict(

            light_1={
                'truck': 0,
                'car': 0,
                'bus': 0,
                'motorcycle': 0,
                'total_waiting_time': 0
            },
            light_2={
                'truck': 0,
                'car': 0,
                'bus': 0,
                'motorcycle': 0,
                'total_waiting_time': 0
            },
            light_3={
                'truck': 0,
                'car': 0,
                'bus': 0,
                'motorcycle': 0,
                'total_waiting_time': 0
            },
            light_4={
                'truck': 0,
                'car': 0,
                'bus': 0,
                'motorcycle': 0,
                'total_waiting_time': 0
            },
        )

        if img is not None:

            result = self.model(img)

            self.drawRoiCircles(img, self.main_roi)

            df = result.pandas().xyxy[0]

            for ind in df.index:
                x1, y1 = int(df['xmin'][ind]), int(df['ymin'][ind])
                x2, y2 = int(df['xmax'][ind]), int(df['ymax'][ind])
                label = df['name'][ind]

                # conf = df['confidence'][ind]
                if label in self.labels:
                    center_x = x1 + int((x2-x1)/2)
                    center_y = y1 + int((y2-y1)/2)

                    self.calculateDensityForArea(
                        img, [x1, y1, x2, y2], label, center_x, center_y, self.main_roi, current_values)

            return img, current_values[self.main_roi.name]["total_waiting_time"], self.density
        return np.zeros((500, 500)), 0

    def findVehicleType(self, label):
        if label == TRUCK:
            return TRUCK_WAITING_TIME
        if label == CAR:
            return CAR_WAITING_TIME
        if label == BUS:
            return BUS_WAITING_TIME
        if label == MOTORCYCLE:
            return MOTORCYCLE_WAITING_TIME

    def drawVehicleCenterCoords(self, image, centerx, centery):

        image = cv2.circle(image, (centerx, centery), self.radius,
                           color=RED, thickness=self.circleThickness)

        return image

    def drawVehicleRectangle(self, img, coords, label: str):
        x1, y1, x2, y2 = coords
        offset = 10
        opacity = 0.4
        overlay = img.copy()
        cv2.rectangle(overlay, (x1, y1), (x2, y2), (147, 20, 255), -1)
        cv2.addWeighted(overlay, opacity, img, 1 - opacity, 0, img)

        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 0.5
        thickness = 2
        text_size, _ = cv2.getTextSize(label, font, font_scale, thickness)
        text_width, text_height = text_size

        recx1 = int(x1 + (x2-x1)/2) - int(text_width/2)
        recy1 = y1 - offset - text_height
        recx2 = recx1 + text_width
        recy2 = y1 - offset

        linex1 = int(x1 + (x2-x1)/2)
        liney1 = y1
        linex2 = int(recx1 + (recx2 - recx1)/2)
        liney2 = recy2

        cv2.line(img, (linex1, liney1), (linex2, liney2), (0, 255, 0), 2)

        cv2.rectangle(img, (recx1, recy2), (recx2, recy2), (0, 255, 0), 2)

        cv2.putText(img, label.upper(), (recx1, recy1),
                    font, font_scale, (0, 255, 0), thickness)

    def drawRoiCircles(self, image, roi):
        corner_points = np.array([[roi.x1, roi.y1], [roi.x2, roi.y2], [roi.x3, roi.y3], [
                                 roi.x4, roi.y4], [roi.x5, roi.y5], [roi.x6, roi.y6]])

        for corner in corner_points:
            image = cv2.circle(image, corner, self.radius,
                               color=BLUE, thickness=self.circleThickness)


        cv2.polylines(image, [corner_points], True, (0, 255, 255), 3)

        return image

    def isInArea(self, centerx, centery, roi):
        polygon = Polygon([(roi.x1, roi.y1), (roi.x2, roi.y2), (roi.x3, roi.y3),
                          (roi.x4, roi.y4), (roi.x5, roi.y5), (roi.x6, roi.y6)])
        point = Point(centerx, centery)

        return polygon.contains(point)

    def calculateDensityForArea(self, img, coords, label, center_x, center_y, roi, current_values):

        if self.isInArea(center_x, center_y, roi):
            x1, y1, x2, y2 = coords
            self.drawVehicleRectangle(img, [x1, y1, x2, y2], label)
            img = self.drawVehicleCenterCoords(img, center_x, center_y)
            current_values[roi.name][label] += 1
            current_values[roi.name]['total_waiting_time'], self.density = self.calculate_total_waiting_time(
                current_values=current_values)

    def calculate_total_waiting_time(self, current_values):
        total = 0
        density = 0
        key_list = list(current_values.keys())
        for key in key_list:
            for label in current_values[key]:
                if label != "total_waiting_time":
                    total += current_values[key][label] * \
                        self.findVehicleType(label)
                    density += current_values[key][label]

        return total, density

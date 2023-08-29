import cv2
import random
import numpy as np

from itl_models import ContourModel


class LaneContourFinder:

    def __init__(self, contour_threshold=240, contour_distance=10, contour_area_threshold=50):

        self.contour_threshold = contour_threshold
        self.contour_distance = contour_distance
        self.contour_area_threshold = contour_area_threshold

        self.original_image = None
        self.binary_img = None
        self.contours = None
        self.centers = None
        self.distances = None
        self.groups = None
        self.mask = None
        self.groups_in_max_contour = None

    def __find_contours(self, img):

        self.original_image = img

        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        _, binary_img = cv2.threshold(

            gray_img, self.contour_threshold, 255, cv2.THRESH_BINARY_INV)

        contours, _ = cv2.findContours(
            binary_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        self.binary_img = binary_img
        self.contours = contours

    def __find_contours_center_coords(self):

        centers = []

        for contour in self.contours:
            moments = cv2.moments(contour)
            center_x = int(moments["m10"] / (moments["m00"]+1))
            center_y = int(moments["m01"] / (moments["m00"]+1))
            centers.append((center_x, center_y))

        self.centers = centers

    def __find_distance_of_centers(self):

        distances = np.zeros((len(self.centers), len(self.centers)))

        for i, center1 in enumerate(self.centers):
            for j, center2 in enumerate(self.centers):
                if i != j:
                    distances[i][j] = np.sqrt(
                        (center1[0] - center2[0])**2 + (center1[1] - center2[1])**2)

        self.distances = distances

    def __group_contours_by_distances(self):

        groups = []

        for i, center1 in enumerate(self.centers):

            group = [i]
            for j, center2 in enumerate(self.centers):
                if i != j and self.distances[i][j] < self.contour_distance:
                    group.append(j)
            groups.append(group)

        self.groups = groups

    def __draw_contours(self):

        img = cv2.cvtColor(self.binary_img, cv2.COLOR_GRAY2BGR)

        colors = self.__drawing_colors(self.groups)

        for i, group in enumerate(self.groups):
            for j in group:
                contour = self.contours[j]

                cv2.drawContours(img, [contour], 0, colors[i], 2)

        return img

    def __find_max_contour(self):

        max_contour = None
        max_area = 0

        for contour in self.contours:
            area = cv2.contourArea(contour)
            if area > max_area:
                max_contour = contour
                max_area = area

        mask = np.zeros_like(self.binary_img)
        cv2.drawContours(mask, [max_contour], 0, 200, -1)

        self.mask = mask

    def __find_contours_in_max_contour_area(self):

        groups_in_max_contour = []
        for group in self.groups:

            group_mask = np.zeros_like(self.binary_img)
            for i in group:
                area = cv2.contourArea(self.contours[i])
                if area > self.contour_area_threshold:
                    cv2.drawContours(
                        group_mask, [self.contours[i]], 0, 255, -1)

            intersection = cv2.bitwise_and(self.mask, group_mask)
            if np.count_nonzero(intersection) > 0:
                groups_in_max_contour.append(group)

        self.groups_in_max_contour = groups_in_max_contour

    def __drawing_colors(self, array):

        colors = [(random.randint(0, 255), random.randint(0, 255),
                   random.randint(0, 255)) for i in range(len(array))]

        return colors

    def __draw_contours_in_max_contour_area(self):

        img = cv2.cvtColor(self.binary_img, cv2.COLOR_GRAY2BGR)
        colors = self.__drawing_colors(self.groups_in_max_contour)

        for i, group in enumerate(self.groups_in_max_contour):

            for j in group:
                contour = self.contours[j]
                cv2.drawContours(img, [contour], 0, colors[i], 2)

        return img

    def get_all_values(self, img):

        self.__find_contours(img=img)
        self.__find_contours_center_coords()
        self.__find_distance_of_centers()
        self.__group_contours_by_distances()

        contour_image = self.__draw_contours()
        self.__find_max_contour()
        self.__find_contours_in_max_contour_area()

        contours_in_max_contour_area_image = self.__draw_contours_in_max_contour_area()

        return ContourModel(contour_image, contours_in_max_contour_area_image, self.contours, self.groups_in_max_contour, self.original_image, self.binary_img, self.mask)

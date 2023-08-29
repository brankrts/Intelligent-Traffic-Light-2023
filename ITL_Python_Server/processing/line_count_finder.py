import matplotlib.pyplot as plt
import cv2
import numpy as np


from itl_models import ContourModel

class LaneCountFinder:

    def __init__(self, contour_model: ContourModel, min_y_threshold=30, max_y_threshold=60):

        self.contour_model = contour_model
        self.min_y_threshold = min_y_threshold
        self.max_y_threshold = max_y_threshold
        self.points = []
        self.groups_max_y = []
        self.groups_min_y = []
        self.line_max_count = []
        self.line_min_count = []
        self.line_count = 0

    def __categorize_group_coords(self):

        for i, group in enumerate(self.contour_model.group_in_max_contour):

            pos_group = []
            if i == 0:
                continue

            for j in group:
                contour = self.contour_model.contours[j]
                for k in range(len(contour)):

                    pos_group.append([contour[k][0][0], contour[k][0][1]])

            self.points.append(pos_group)

    def __plot_coordinates(self):

        x = []
        y = []
        for point in self.points:
            for pt in point:
                x_val, y_val = pt
                x.append(x_val)
                y.append(y_val)

        plt.rcParams["figure.figsize"] = [7.50, 3.50]
        plt.rcParams["figure.autolayout"] = True

        plt.plot(x, y, 'r*')
        plt.axis([0, 1000, 0, 1000])
        plt.show()

    def __sort_with_y_values(self):

        for point in self.points:
            sorted_point = sorted(point, key=lambda x: x[1])

            self.groups_max_y.append(sorted_point[-1])
            self.groups_min_y.append(sorted_point[0])

        self.groups_max_y = sorted(
            self.groups_max_y, key=lambda x: x[1], reverse=True)
        self.groups_min_y = sorted(
            self.groups_min_y, key=lambda x: x[1], reverse=True)

    def __sort_by_threshold(self):

        max_y = self.groups_max_y[0][1]

        min_y = self.groups_min_y[-1][1]

        self.line_min_count.append(self.groups_min_y[-1])
        self.line_max_count.append(self.groups_max_y[0])

        for coord in self.groups_min_y[:-1]:

            if coord[1] - self.min_y_threshold < min_y:
                if coord not in self.line_min_count:
                    self.line_min_count.append(coord)

        for coord in self.groups_max_y[1:]:

            if coord[1] + self.max_y_threshold > max_y:
                if coord not in self.line_max_count:
                    self.line_max_count.append(coord)

        self.line_max_count = sorted(self.line_max_count, key=lambda x: x[0])
        self.line_min_count = sorted(self.line_min_count, key=lambda x: x[0])

    def __draw_lines(self):

        lines = []

        for i in range(len(self.line_max_count)):

            if len(self.line_min_count) == len(self.line_max_count):

                x1, y1 = self.line_min_count[i]
                x2, y2 = self.line_max_count[i]

                lines.append([(x1, y1), (x2, y2)])

            else:
                print(
                    f"Min = {self.line_min_count} - Max = {self.line_max_count}")
                raise f"Threshold degerlerini guncellemeniz gerekebilir. Min : {len(self.line_min_count)} !=  Max : {len(self.line_max_count)} "

        polygon_coords = self.__draw_polygon(lines)

        self.contour_model.line_image = self.contour_model.contour_in_max_contour_area_image.copy()
        for point in lines:
            cv2.line(self.contour_model.contour_in_max_contour_area_image,
                     point[0], point[1], (0, 0, 255), 4)
            cv2.line(self.contour_model.line_image,
                     point[0], point[1], (0, 0, 255), 4)

        for coord in polygon_coords:

            cv2.fillPoly(self.contour_model.contour_in_max_contour_area_image, [
                         coord], color=(0, 237, 0))

        self.line_count = len(lines) + 1

    def __draw_polygon(self, lines):

        image_width = self.contour_model.original_image.shape[1]

        polygon_coords = []
        sorted_lines = sorted(lines, key=lambda x: x[0][0])

        offset = 10
        widths = []

        for i in range(len(sorted_lines) - 1):
            current = sorted_lines[i]
            next = sorted_lines[i+1]

            x1, y1 = current[0][0] + offset, current[0][1]
            x2, y2 = next[0][0] - offset, next[0][1]
            x3, y3 = next[1][0] - offset, next[1][1]
            x4, y4 = current[1][0] + offset, current[1][1]

            point = np.array(
                [(x1, y1), (x2, y2), (x3, y3), (x4, y4)], dtype=np.int32)

            polygon_coords.append(point)

            width = int(((x2 - x1) + (x3 - x4))/2)
            widths.append(width)

        avg_width = int(sum(widths) / (len(widths)+0.001))

        first = sorted_lines[0]
        last = sorted_lines[-1]

        x1, y1 = first[0][0] - avg_width if first[0][0] - \
            avg_width > 0 else 5, first[0][1]
        x2, y2 = first[0][0] - offset, first[0][1]
        x3, y3 = first[1][0] - offset, first[1][1]
        x4, y4 = first[1][0] - avg_width if first[1][0] - \
            avg_width > 0 else 5, first[1][1]

        first_point = np.array(
            [(x1, y1), (x2, y2), (x3, y3), (x4, y4)], dtype=np.int32)

        x1, y1 = last[0][0] + offset, last[0][1]
        x2, y2 = last[0][0] + avg_width if last[0][0] + \
            avg_width < image_width else image_width - 10, last[0][1]

        x3, y3 = last[1][0] + avg_width if last[1][0] + \
            avg_width < image_width else image_width - 10, last[1][1]
        x4, y4 = last[1][0] + offset, last[1][1]

        last_point = np.array(
            [(x1, y1), (x2, y2), (x3, y3), (x4, y4)], dtype=np.int32)

        polygon_coords.append(last_point)
        polygon_coords.append(first_point)

        return polygon_coords

    def visualize(self):

        self.__categorize_group_coords()
        self.__plot_coordinates()
        self.__sort_with_y_values()
        self.__sort_by_threshold()
        self.__draw_lines()

        return self.line_count, self.contour_model


class ContourModel:

    def __init__(self,  contour_image, contours_in_max_contour_area_image, contours, groups_in_max_contour, original_image, binary_image, max_area_mask):

        self.contour_img = contour_image
        self.contour_in_max_contour_area_image = contours_in_max_contour_area_image
        self.contours = contours
        self.group_in_max_contour = groups_in_max_contour
        self.original_image = original_image
        self.binary_image = binary_image
        self.max_area_mask = max_area_mask
        self.line_image = None

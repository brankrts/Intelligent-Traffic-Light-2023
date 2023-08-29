import cv2
import numpy as np
from itl_models import RoiModel


class ROIFilter:

    def __init__(self):
        pass

    def getFilteredImage(self, image, roi):

        mask = np.zeros(image.shape, dtype=np.uint8)
        channel_count = image.shape[2]
        ignore_mask_color = (255,)*channel_count
        cv2.fillConvexPoly(mask, RoiModel(
            roi).getRoiCorners(), ignore_mask_color)
        masked_image = cv2.bitwise_and(image, mask)

        masked_image_with_window_size = RoiModel(
            roi).getWindowSize(masked_image)

        return masked_image, masked_image_with_window_size

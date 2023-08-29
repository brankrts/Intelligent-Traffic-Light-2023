import cv2

from processing import LaneContourFinder, LaneCountFinder
from utils import ImageMerger


images = dict(
    resim3={
        "image_path": "assets/resim3.png",
        "contour_threshold": 100,
        "contour_distance": 0,
        "contour_area_threshold": 50,
        "min_y_threshold": 30,
        "max_y_threshold": 50
    },
    resim1={
        "image_path": "assets/resim1.png",
        "contour_threshold": 100,
        "contour_distance": 0,
        "contour_area_threshold": 50,
        "min_y_threshold": 30,
        "max_y_threshold": 50
    },
    resim2={
        "image_path": "assets/resim2.png",
        "contour_threshold": 100,
        "contour_distance": 0,
        "contour_area_threshold": 50,
        "min_y_threshold": 30,
        "max_y_threshold": 50
    },
    anaresim={
        "image_path": "assets/anaresim.png",
        "contour_threshold": 200,
        "contour_distance": 0,
        "contour_area_threshold": 50,
        "min_y_threshold": 30,
        "max_y_threshold": 50
    },
    main={
        "image_path": "assets/main.png",
        "contour_threshold": 100,
        "contour_distance": 0,
        "contour_area_threshold": 50,
        "min_y_threshold": 30,
        "max_y_threshold": 50
    },
    resim4={
        "image_path": "assets/resim4.jpg",
        "contour_threshold": 150,
        "contour_distance": 5,
        "contour_area_threshold": 10,
        "min_y_threshold": 7,
        "max_y_threshold": 55
    },
    resim5={
        "image_path": "assets/resim5.png",
        "contour_threshold": 180,
        "contour_distance": 5,
        "contour_area_threshold": 10,
        "min_y_threshold": 7,
        "max_y_threshold": 55
    },
    resim6={
        "image_path": "assets/resim6.png",
        "contour_threshold": 180,
        "contour_distance": 5,
        "contour_area_threshold": 10,
        "min_y_threshold": 7,
        "max_y_threshold": 55
    },

)
image_list = []
for key in list(images.keys()):
    print(key)
    img = cv2.imread(images[key]["image_path"])

    finder = LaneContourFinder(contour_threshold=images[key]["contour_threshold"],
                               contour_distance=images[key]["contour_distance"], contour_area_threshold=images[key]["contour_area_threshold"])

    contour_model = finder.get_all_values(img)
    count_finder = LaneCountFinder(
        contour_model=contour_model, min_y_threshold=images[key]["min_y_threshold"], max_y_threshold=images[key]["max_y_threshold"])

    lane_count, model = count_finder.visualize()

    processed_image = model.contour_in_max_contour_area_image

    stacked_image = ImageMerger().merger([img, processed_image], 1)

    stacked_image = cv2.resize(stacked_image, (400, 400))
    image_list.append(stacked_image)

part1 = image_list[:4]
part2 = image_list[4:]
all_images = ImageMerger().merger([part1, part2], 1)

cv2.namedWindow('All_images', cv2.WINDOW_NORMAL)
cv2.moveWindow('All_images', 50, 50)

cv2.imshow("All_images", all_images)
cv2.waitKey(0)

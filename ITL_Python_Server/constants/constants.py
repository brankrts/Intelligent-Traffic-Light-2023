BLUE = (255, 0, 0)
GREEN = (0, 255, 0)
RED = (0, 0, 255)
YELLOW = (0, 255, 255)

MAIN_ROI1 = {
    "x1": 991,
    "y1": 660,
    "x2": 1166,
    "y2": 656,
    "x3": 1678,
    "y3": 1016,
    "x4": 1601,
    "y4": 1044,
    "x5": 1067,
    "y5": 1043,
    "x6": 1007,
    "y6": 725,
    "window_sizes": {
        "x": 969,
        "y": 598,
        "width": 700,
        "height": 430
    },
    "name": "main_roi_1",
    "config": {

            "contour_threshold": 100,
            "contour_distance": 0,
            "contour_area_threshold": 50,
            "min_y_threshold": 10,
            "max_y_threshold": 50

    }



}


MAIN_ROI2 = {
    "x1": 175,
    "y1": 132,
    "x2": 413,
    "y2": 137,
    "x3": 792,
    "y3": 704,
    "x4": 6,
    "y4": 712,
    "x5": 16,
    "y5": 552,
    "x6": 105,
    "y6": 337,
    "window_sizes": {
        "x": 11,
        "y": 93,
        "width": 773,
        "height": 627
    },
    "name": "main_roi_2",
    "config": {

            "contour_threshold": 200,
            "contour_distance": 0,
            "contour_area_threshold": 50,
            "min_y_threshold": 5,
            "max_y_threshold": 50

    }

}
MAIN_ROI3 = {
    "x1": 985,
    "y1": 494,
    "x2": 1240,
    "y2": 481,
    "x3": 1917,
    "y3": 838,
    "x4": 1915,
    "y4": 1044,
    "x5": 1136,
    "y5": 1041,
    "x6": 1005,
    "y6": 565,
    "window_sizes": {
        "x": 944,
        "y": 522,
        "width": 1000,
        "height": 500
    },
    "name": "main_roi_3",
    "config": {
            "contour_threshold": 100,
            "contour_distance": 0,
            "contour_area_threshold": 50,
            "min_y_threshold": 30,
            "max_y_threshold": 50



    }
}


MAIN_ROI4 = {
    "x1": 763,
    "y1": 622,
    "x2": 999,
    "y2": 634,
    "x3": 896,
    "y3": 1040,
    "x4": 839,
    "y4": 1044,
    "x5": 43,
    "y5": 1036,
    "x6": 461,
    "y6": 796,
    "window_sizes": {
        "x": 40,
        "y": 487,
        "width": 1000,
        "height": 527
    },
    "name": "main_roi_4",
    "config": {
            "contour_threshold": 200,
            "contour_distance": 0,
            "contour_area_threshold": 50,
            "min_y_threshold": 30,
            "max_y_threshold": 150



    }
}


TRUCK_WAITING_TIME = 20
CAR_WAITING_TIME = 10
BUS_WAITING_TIME = 15
MOTORCYCLE_WAITING_TIME = 10

TRUCK = 'truck'
CAR = 'car'
BUS = 'bus'
MOTORCYCLE = 'motorcycle'

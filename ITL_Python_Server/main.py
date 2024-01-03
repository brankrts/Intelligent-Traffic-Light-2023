
import argparse
from processing import CaptureVideos , LaneCountFinder , LaneContourFinder
from util import ImageMerger
from test import TestOnImages
from database import MongoDBHelper
from constants import INTERSECTION_NAME , COLLECTION_NAME , MAIN_ROI1
from itl_models import RequestModel
from util import process_request



if __name__ == "__main__":
    mongo_client = MongoDBHelper() 
    # result = mongo_client.delete_one(COLLECTION_NAME , {"intersectionSelection":INTERSECTION_NAME})
    result = mongo_client.find_one(COLLECTION_NAME , {"intersectionSelection":INTERSECTION_NAME})
    application_config = process_request(result)
    for key in application_config.keys():
        application_config[key].lane_count = 3
    # # tester = TestOnImages()
    # # tester.test(ImageMerger , LaneContourFinder , LaneCountFinder)
    parser = argparse.ArgumentParser(description='Setting executation type.')
    parser.add_argument("-m" , "--mode" , type = str , default="local")
    args = parser.parse_args()
    mode = args.mode 
    application = CaptureVideos(mode, application_config)
    application.start()




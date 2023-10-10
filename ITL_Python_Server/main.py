
import argparse
from processing import CaptureVideos


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument("-m" , "--mode" , type = str )
    args = parser.parse_args()

    mode = True if args.mode =="web" else False 

    application = CaptureVideos(mode)
    application.start()




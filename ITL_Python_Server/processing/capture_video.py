import cv2
import time
import numpy as np
import websockets
import asyncio
from threading import Thread


from processing import LaneContourFinder, LaneCountFinder, ROIFilter
from detector import Detector
from constants import RED, GREEN, MAIN_ROI1, MAIN_ROI2, MAIN_ROI3, MAIN_ROI4
from itl_models import ThreadPool, TrafficLight, Queue, RoiModel
from util import ImageMerger


class CaptureVideos:

    def __init__(self):
        self.thread_pool = ThreadPool()
        self.light1 = TrafficLight(name="light1")
        self.light2 = TrafficLight(name="light2")
        self.light3 = TrafficLight(name="light3")
        self.light4 = TrafficLight(name="light4")
        self.queue = Queue(
            [self.light1, self.light2, self.light3, self.light4])
        self.total_density = sum([self.light1.get_current_density(), self.light2.get_current_density(
        ), self.light3.get_current_density(), self.light4.get_current_density()])
        self.cams = {
            "light1": np.zeros((400, 400), dtype=np.uint8),
            "light2": np.zeros((400, 400), dtype=np.uint8),
            "light3": np.zeros((400, 400), dtype=np.uint8),
            "light4": np.zeros((400, 400), dtype=np.uint8),
        }
        self.total_image = cv2.imread('./assets/anaresim.png')

    def local_video(self, path, light: TrafficLight, index, roi):

        #TODO video bitiminde iligili videoya tekabul eden trafik isigi kuruktan silinmelidir.
        roi_model = RoiModel(roi)

        cap = cv2.VideoCapture(path)
        prev_frame_time = 0
        new_frame_time = 0
        finder = LaneContourFinder(contour_threshold=roi_model.contour_threshold,
                                   contour_distance=roi_model.contour_distance, contour_area_threshold=roi_model.contour_area_threshold)
        lane_count = None

        ret, frame = cap.read()

        frame, window_size = ROIFilter().getFilteredImage(frame, roi)
        contour_model = finder.get_all_values(window_size)
        count_finder = LaneCountFinder(
            contour_model=contour_model, min_y_threshold=roi_model.min_y_threshold, max_y_threshold=roi_model.max_y_threshold)

        lane_count, model = count_finder.visualize()

        stacked_image = ImageMerger().merger([model.original_image, model.binary_image, model.max_area_mask,
                                              model.contour_img, model.line_image, model.contour_in_max_contour_area_image], 1)

        stacked_image = cv2.resize(stacked_image, (300, 300))

        while (True):

            current_density = 0
            ret, frame = cap.read()
            new_frame_time = time.time()

            if ret:
                fps = 1/(new_frame_time-prev_frame_time)
                prev_frame_time = new_frame_time
                frame, total_waiting_time, current_density = Detector().detect(frame, roi)

                light.set_current_density(current_density)
                light.set_green_time(total_waiting_time)
                light.set_overall_vehicle_density(self.total_density)
                light.set_priority()

                frame = cv2.circle(frame, (120, 500), 50,
                                   light.light_color, -1)

                frame = cv2.resize(frame, (400, 400))
                fps = "FPS : " + str(int(fps))
                time_to_wait = 'Green Time: ' + \
                    str(int(total_waiting_time/lane_count))
                lines = "Lane Count : " + str(lane_count)
                cv2.putText(frame, fps, (10, 40),
                            cv2.FONT_HERSHEY_PLAIN, 2, RED, 3)
                cv2.putText(frame, time_to_wait, (10, 80),
                            cv2.FONT_HERSHEY_PLAIN, 2, GREEN, 3)
                cv2.putText(frame, lines, (10, 120),
                            cv2.FONT_HERSHEY_PLAIN, 2, GREEN, 3)
                self.cams[light.name] = frame

    def join_cams(self):
        while True:
            stacked_image = ImageMerger().merger(
                [[self.cams["light1"], self.cams["light2"], self.cams["light3"], self.cams["light4"]]], 1)

            stacked_image = cv2.resize(stacked_image, (1700, 500))
            self.total_image = stacked_image
            #cv2.imshow("Kavsaklar", stacked_image)
            if cv2.waitKey(12) & 0xFF == ord('q'):
                break

    def send_websocket(self):
        async def send_websocket_server():

            websocket = await websockets.connect('ws://localhost:3000')
            while True:
                _, buffer = cv2.imencode('.jpg', self.total_image)
                await websocket.send(buffer.tobytes())

        loop = asyncio.new_event_loop()  # Yeni bir event loop oluşturun
        asyncio.set_event_loop(loop)
        loop.run_until_complete(send_websocket_server())

    def start(self):

        self.thread_pool.add_thread(Thread(target=self.local_video, args=(
            "assets/video1.mp4", self.light1, 0, MAIN_ROI1), daemon=True))

        self.thread_pool.add_thread(Thread(target=self.local_video, args=(
            "assets/video2.mp4", self.light2, 1, MAIN_ROI2), daemon=True))

        self.thread_pool.add_thread(Thread(target=self.local_video, args=(
            "assets/video3.mp4", self.light3, 2, MAIN_ROI3), daemon=True))

        self.thread_pool.add_thread(Thread(target=self.local_video, args=(

            "assets/video4.mp4", self.light4, 3, MAIN_ROI4), daemon=True))
        self.thread_pool.add_thread(Thread(target=self.send_websocket))

        self.thread_pool.add_thread(
            Thread(target=self.light_changes, args=(self.queue,)))
        self.thread_pool.add_thread(Thread(target=self.join_cams))
        self.thread_pool.start_threading()

    def light_changes(self, queue: Queue):

        while True:

            light: TrafficLight = queue.pop()

            print(
                f"{light.name} trafik isigi yesil kalma suresi : {light.get_green_time()}\n")

            light.to_green()
            queue.push(light)
            queue.update_priority()

            max_priority = max(queue.queue, key=lambda light: light.priority)
            for light in self.queue.queue:
                print(
                    f'{light.getName()} --> Oncelik degeri : {light.get_priority()/(max_priority.priority+0.1):.6f}')
            print("\n")

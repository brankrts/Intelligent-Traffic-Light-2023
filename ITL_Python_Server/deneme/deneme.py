import cv2
import mediapipe as mp

# MediaPipe'ı yükle
mp_drawing = mp.solutions.drawing_utils

mp_objectron = mp.solutions.objectron

video = cv2.VideoCapture("../assets/video1.mp4")

with mp_objectron.Objectron(static_image_mode=False, max_num_objects=5, min_detection_confidence=0.8, min_tracking_confidence=0.99, model_name="Chair") as objectron:
    while video.isOpened():
        _, frame = video.read()
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame.flags.writeable = False
        result = objectron.process(frame)
        frame.flags.writeable = True
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        if result.detected_objects:
            for detected_object in result.detected_objects:
                mp_drawing.draw_landmarks(
                    frame, detected_object.landmarks_2d, mp_objectron.BOX_CONNECTIONS)
                mp_drawing.draw_axis(
                    frame, detected_object.rotation, detected_object.translation)
        cv2.imshow("Frame ", frame)
        if cv2.waitKey(1) == ord('q'):
            break

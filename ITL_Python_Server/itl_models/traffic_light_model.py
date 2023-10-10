import time
from constants import RED, GREEN, YELLOW
import math


class TrafficLight:

    def __init__(self, name):
        self.name = name
        self.colorState = False
        self.light_color = RED
        self.yellow_time = 2
        self.green_time = 0

        self.last_red_time = time.time()


        self.current_density = 0
        self.overall_vehicle_density = 0.1
        self.priority = 0

    def set_overall_vehicle_density(self, overall_vehicle_density):
        self.overall_vehicle_density = overall_vehicle_density if overall_vehicle_density != 0 else 0.1

    def set_current_density(self, density):
        self.current_density = density

    def get_current_density(self):
        return self.current_density

    def set_green_time(self, green_time):
        self.green_time = green_time

    def to_red(self):
        self.last_red_time = time.time()
        self.light_color = RED
        self.colorState = False

    def to_green(self):
        self.last_red_time = None
        self.to_yellow()
        time.sleep(self.yellow_time)
        self.colorState = True
        self.light_color = GREEN
        time.sleep(self.green_time)

        self.to_yellow()
        time.sleep(self.yellow_time)
        self.to_red()

    def get_green_time(self):
        return self.green_time

    def to_yellow(self):
        self.light_color = YELLOW

    def getName(self):
        return self.name

    def getColorState(self):
        return self.colorState

    # Priority formula   : 0.2 x genel_arac_yogunlugu + 0.2 * anlik_arac_yogunlugu + 0.3 * arac_sayisi + 0.3 x bekleme_suresi

    def set_priority(self):

        if self.last_red_time != None:

            instant_vehicle_density = self.current_density / self.overall_vehicle_density
            priority = \
                (self.overall_vehicle_density * 0.2) + \
                (instant_vehicle_density * 0.2) + \
                (self.current_density * 0.3) + \
                ((round(time.time() - self.last_red_time)/(math.pow(10, 3))) * 0.3)

            self.priority = priority

        else:
            self.priority = 0

    def get_priority(self):

        return self.priority

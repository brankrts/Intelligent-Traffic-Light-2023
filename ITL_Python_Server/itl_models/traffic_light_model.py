import time
from constants import RED, GREEN, YELLOW
import math
import json


class TrafficLight:

    def __init__(self, name , gpio_pins):
        self.name = name
        self.colorState = False
        self.light_color = RED
        self.yellow_time = 2
        self.green_time = 0
        self.state = None
        self.pins = gpio_pins
        self.last_red_time = time.time()
        self.current_density = 0
        self.overall_vehicle_density = 0.1
        self.priority = 0

    def set_overall_vehicle_density(self, overall_vehicle_density):
        self.overall_vehicle_density = overall_vehicle_density if overall_vehicle_density != 0 else 0.1

    def set_red_time(self):
        if self.last_red_time is None and self.light_color is RED:
            self.last_red_time = time.time()
    def set_state(self,state):
        self.state = state

    def get_state(self):
        return self.state

    def get_red_time (self):
        return self.last_red_time

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

    def to_green(self , client_socket , mode):

        if mode == "pi" or mode == 'full':

            if self.current_density > 0:
                name = self.name 
                green_time = self.get_green_time() 
                data = {'name': name, 'green_time': green_time}
                self.light_color = GREEN
                json_data = json.dumps(data)
                client_socket.send(json_data.encode('utf-8'))

                signal  = client_socket.recv(1024).decode("utf-8")

            self.light_color = RED

        else :
            print(
                    f"\n{self.name} trafik isigi yesil kalma suresi : {self.get_green_time()}\n")
            self.last_red_time = None
            temp_green = self.green_time
            self.to_yellow()
            time.sleep(self.yellow_time)
            self.colorState = True
            self.light_color = GREEN
            time.sleep(temp_green)
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
                ((self.overall_vehicle_density * 0.2) + \
                (instant_vehicle_density * 0.2) + \
                (self.current_density * 0.3)) * \
                    self.current_density + \
                ((math.ceil(time.time() - self.last_red_time)) * 0.05) if self.current_density > 0 else 0
            self.priority = priority 

        else:
            self.priority = 0

    def get_priority(self):
        return self.priority

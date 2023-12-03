from __future__ import annotations
from abc import ABC, abstractmethod
import json
from typing import List


class Light:

    def __init__(self, light):
        self.coords = light['coords']
        self.is_setted = light['isSetted']
        self.lane_count = light["laneCount"]
        self.name = light["name"]


class StaticModeProps:
    def __init__(self, static_mode_props):
        self.red_light = static_mode_props["redLight"]
        self.yellow_light = static_mode_props["yellowLight"]
        self.green_light = static_mode_props["greenLight"]


class RequestModel:

    def __init__(self, request):

        self.intersectionSelection = request["intersectionSelection"]
        self.lights = [Light(x) for x in request["lights"]]
        # TODO: is setted prop must be defined for intersection not for lights
        # self.is_setted = request["isSetted"]
        self.mode_selection = request["modeSelection"]
        self.static_mode_props = request["staticModeProbs"] if "staticModeProbs" in request else None

    def getConfigForLights(self, light_name):

        for light in self.lights:
            if light.name == light_name:
                return light


class Observer(ABC):

    @abstractmethod
    def update(self) -> None:
        pass


class Subject (ABC):
    @abstractmethod
    def attach(self, observer: Observer) -> None:
        pass

    @abstractmethod
    def detach(self, observer: Observer) -> None:
        pass

    @abstractmethod
    def notify(self) -> None:
        pass


class ConcreteSubject(Subject):

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(ConcreteSubject, cls).__new__(cls)
        return cls.instance

    def __init__(self) -> None:
        self._state = None
        self._observers: List[Observer] = []

    def attach(self, observers: List[Observer]) -> None:
        for ob in observers:
            if ob not in self._observers:
                self._observers.append(ob)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify(self) -> None:
        for observer in self._observers:
            observer.update()

    def update_data(self, state) -> None:
        self._state = RequestModel(json.loads(state))
        self.notify()

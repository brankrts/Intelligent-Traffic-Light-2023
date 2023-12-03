class RequestModel:
    def __init__(self, roi):
        self.name = roi["name"]
        self.is_setted = roi['is_setted']
        self.lane_count = roi['lane_count']

        self.x1 = roi["x1"]
        self.y1 = roi["y1"]
        self.x2 = roi["x2"]
        self.y2 = roi["y2"]
        self.x3 = roi["x3"]
        self.y3 = roi["y3"]
        self.x4 = roi["x4"]
        self.y4 = roi["y4"]
        self.x5 = roi["x5"]
        self.y5 = roi["y5"]
        self.x6 = roi["x6"]
        self.y6 = roi["y6"]
    
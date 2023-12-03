
from itl_models import RequestModel
def process_request(request):
    application_config = None
    if request != None:
        application_config = dict()
        for light in request["lights"]:
            temp_roi = dict()
            temp_roi['name'] = light["name"] 
            temp_roi['is_setted'] = light["isSetted"] 
            temp_roi['lane_count'] = light["laneCount"] 
            for idx , coord in enumerate(light["coords"]):
                temp_roi[f"x{idx +1}"] = coord[f"x{idx+1}"]
                temp_roi[f"y{idx +1}"] = coord[f"y{idx+1}"]
            application_config[light["name"]] = RequestModel(temp_roi)
    return application_config


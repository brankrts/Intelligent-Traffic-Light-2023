import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CanvasStream from "../main/CanvasStream";
import PointList from "./component/PointList";
import { SelectionBox } from "./component/SelectionBox";
import Label from "./component/Label";
import Input from "./component/Input";
import { setLaneCount } from "../../redux/reducers/canvasReducer";
import { sendCurrentState } from "../../services/network_manager";

const SettingsModal = ({ setIsSettingOpen }) => {
  const { lights, isComplete, webSocket } = useSelector(
    (state) => state.canvasReducer
  );
  const [currentCoords, setCurrentCoords] = useState([]);
  const [canvasSelection, setCanvasSelection] = useState("light_1");
  const [modeSelection, setModeSelection] = useState("AI Mod");
  const [laneCountForCombo, setLaneCountForCombo] = useState(0);
  const [lightsLaneCounts, setLightLaneCounts] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isStaticModeHidden, setIsStaticModeHiden] = useState(true);
  const [staticModeProps, setStaticModeProps] = useState({});
  const [isAllDone, setIsAllDone] = useState(false);
  const [intersection, setIntersection] = useState("Catmaca");
  const dispatch = useDispatch();

  useEffect(() => {
    lights.forEach((light) => {
      if (light.id === canvasSelection) {
        setCurrentCoords(light.coords);
        setIsEditable(true);
      }
    });
  }, [lights, canvasSelection]);
  useEffect(() => {
    dispatch(setLaneCount(lightsLaneCounts));
  }, [lightsLaneCounts]);

  useEffect(() => {
    const currentLaneCount = lightsLaneCounts.find(
      (element) => element.id === canvasSelection
    );
    if (currentLaneCount) {
      setLaneCountForCombo(currentLaneCount.laneCount);
    }
  }, [canvasSelection]);
  useEffect(() => {
    if (modeSelection === "Statik Mod") {
      setIsStaticModeHiden(false);
    } else {
      setIsStaticModeHiden(true);
    }
  }, [modeSelection]);
  useEffect(() => {
    setIsAllDone(checkIsDoneForPosting());
  });

  const handleLaneCountChange = (e) => {
    const { value } = e.target;
    const laneCount = value;
    const id = canvasSelection;
    const updatedItems = lightsLaneCounts.map((item) => {
      if (item.id === id) {
        return { ...item, laneCount: laneCount };
      }
      return item;
    });
    if (!updatedItems.some((item) => item.id === id)) {
      updatedItems.push({ id, laneCount: laneCount });
    }
    setLightLaneCounts(updatedItems);
    setLaneCountForCombo(value);
  };
  const saveSettings = () => {
    console.log("Ayarlar Kaydedildi");
  };
  const handleCanvasSelection = (e) => {
    setCanvasSelection(e.target.value);
  };

  const handleModeSelection = (e) => {
    setModeSelection(e.target.value);
  };
  const handleIntersectionSelection = (e) => {
    setIntersection(e.target.value);
  };

  const handleStatikModeValueChange = (e) => {
    const { name, value } = e.target;
    setStaticModeProps((oldState) => {
      return { ...oldState, [name]: value };
    });
  };

  const checkIsDoneForPosting = () => {
    const isLaneCountCorrect = () => {
      let status = true;
      if (lightsLaneCounts.length !== 4) {
        status = false;
      }
      lightsLaneCounts.forEach((lane) => {
        if (
          lane.laneCount === "" ||
          lane.laneCount === undefined ||
          parseInt(lane.laneCount) <= 0
        ) {
          status = false;
        }
      });
      return status;
    };
    if (modeSelection !== "Statik Mod" && isComplete && isLaneCountCorrect()) {
      return true;
    }
    if (
      modeSelection === "Statik Mod" &&
      Object.keys(staticModeProps).length === 3 &&
      isLaneCountCorrect() &&
      isComplete
    ) {
      for (const [key, value] of Object.entries(staticModeProps)) {
        if (value === "" || parseInt(value) <= 2) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  return (
    <div className="overflow-hidden fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-51000 bg-opacity-50 ">
      <div className="overflow-auto h-full bg-white p-6 rounded w-3/4">
        <div className="flex flex-col justify-between items-center mb-4 ">
          <div className="flex flex-col text-xl justify-between items-center">
            <div className="flex items-center justify-around gap-9">
              <div className="flex items-center justify-center">
                <strong className="mx-3 text-black ">Secili Kamera : </strong>
                <SelectionBox
                  options={["light_1", "light_2", "light_3", "light_4"]}
                  handleChange={handleCanvasSelection}
                  value={canvasSelection}
                />
              </div>
              <div className="flex items-center justify-center">
                <strong className="mx-3 text-black ">Secili Kavsak : </strong>
                <SelectionBox
                  options={["Catmaca", "Golbucagi", "Ozel Idare"]}
                  handleChange={handleIntersectionSelection}
                  value={intersection}
                />
              </div>

              <div className="flex items-center justify-center">
                <strong className="mx-3 text-black">Sistem Modu : </strong>
                <SelectionBox
                  options={["AI Mod", "Statik Mod", "Dinamik Mod"]}
                  handleChange={handleModeSelection}
                  value={modeSelection}
                />
              </div>
            </div>
            <div className="flex text-xl mt-5">
              <strong className="mx-3 text-black ">Gonderim durumu : </strong>
              <b className={isAllDone ? "text-green-900" : "text-red-900"}>
                {isAllDone ? "Done" : "Eksik ayarlar bulunmaktadir."}
              </b>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <strong>ROI koordinatlari</strong>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <PointList coords={currentCoords} />
            <div className="flex p-2 items-center justify-between">
              <Label name={"Serit sayisi:"} />
              <Input
                value={laneCountForCombo}
                onChange={handleLaneCountChange}
                isDisabled={!isEditable}
              />
            </div>

            <div className={isStaticModeHidden ? "hidden" : ""}>
              <strong>Statik isik sureleri </strong>

              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="flex flex-col p-2 gap-2">
                <div className="flex items-center justify-between">
                  <Label name={"Kirmizi isik suresi"} />
                  <Input
                    name="redLight"
                    onChange={handleStatikModeValueChange}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label name={"Yesil isik suresi"} />
                  <Input
                    name="greenLight"
                    onChange={handleStatikModeValueChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label name={"Sari isik suresi"} />
                  <Input
                    name="yellowLight"
                    onChange={handleStatikModeValueChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <CanvasStream isSetting={true} />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => {
              setIsSettingOpen(false);
            }}
          >
            Kapat
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={async () => {
              if (checkIsDoneForPosting) {
                if (modeSelection !== "Statik Mod") {
                  await sendCurrentState(
                    lights,
                    webSocket,
                    modeSelection,
                    intersection
                  );
                } else {
                  await sendCurrentState(
                    lights,
                    webSocket,
                    modeSelection,
                    intersection,
                    staticModeProps
                  );
                }
              } else {
                console.log("Tum ayarlamalarin yapilmasi gerekmektedir.");
              }
            }}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;

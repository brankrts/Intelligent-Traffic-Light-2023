import axios from "axios";

export const getIntersections = async () => {
  const result = await axios.get();
};
export const sendCurrentState = async (
  lights,
  webSocket,
  modeSelection,
  intersectionSelection,
  staticModeProbs = null,
) => {
  let result = {};
  result.modeSelection = modeSelection;
  result.intersectionSelection = intersectionSelection;
  if (staticModeProbs !== null) result.staticModeProbs = staticModeProbs;

  const lightProbs = [];
  lights.forEach((light) => {
    const { coords, laneCount } = light;
    const canvasId = light.canvasRef.current.id;
    lightProbs.push({ coords, name: canvasId, isSetted: true, laneCount });
  });
  result.lights = lightProbs;
  const requestResult = await axios.post(
    "http://localhost:3000/intersection/create-config",
    result,
  );
  console.log(requestResult.data);
  webSocket.current.send(
    JSON.stringify({ event: "image_config", data: result }),
  );
};

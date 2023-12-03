import { createSlice } from "@reduxjs/toolkit";
import { removePoint } from "../../utils/util";

const canvasSlice = createSlice({
  name: "canvasReducer",
  initialState: {
    lights: [],
    isComplete: false,
    webSocket: null,
  },
  reducers: {
    setWebSocket: (state, payload) => {
      state.webSocket = payload.payload;
    },
    addCoord: (state, payload) => {
      const { canvasRef, id, x, y, imageData } = payload.payload;
      let existingLight = state.lights.find((light) => light.id === id);

      if (existingLight) {
        let existingLightIndex = state.lights.indexOf(existingLight);

        if (existingLight.coords.length < 6) {
          const index = existingLight.coords.length + 1;
          state.lights[existingLightIndex].coords.push({
            [`x${index}`]: parseInt(x),
            [`y${index}`]: parseInt(y),
          });
        }
      } else {
        state.lights.push({
          canvasRef,
          id,
          coords: [
            {
              x1: parseInt(x),
              y1: parseInt(y),
            },
          ],
          imageData,
          laneCount: 0,
        });
      }
      state.isComplete = false;
      if (
        state.lights.length === 4 &&
        state.lights.every((light) => light.coords.length === 6)
      ) {
        state.isComplete = true;
      }
    },

    deleteCoord: (state, payload) => {
      const canvasId = payload.payload;
      const currentLight = state.lights.find((light) => light.id === canvasId);
      if (currentLight) {
        const currentLightIndex = state.lights.indexOf(currentLight);
        if (currentLight.coords.length > 0) {
          let index = currentLight.coords.length;
          let removedCoords = state.lights[currentLightIndex].coords.pop();
          const canvas = currentLight.canvasRef.current;
          removePoint(
            canvas,
            removedCoords[`x${index}`],
            removedCoords[`y${index}`],
            currentLight.imageData,
          );
        }
      }
      state.isComplete = false;
    },
    clearCoords: (state, payload) => {
      const light = state.lights.find((light) => light.id === payload.payload);
      const index = state.lights.indexOf(light);
      if (light) {
        const canvas = light.canvasRef.current;
        light.coords.map((coord, idx) => {
          removePoint(
            canvas,
            coord[`x${idx + 1}`],
            coord[`y${idx + 1}`],
            light.imageData,
          );
        });
        state.lights[index].coords = [];
      }
      state.isComplete = false;
    },
    setLaneCount: (state, payload) => {
      payload.payload.forEach((element) => {
        state.lights.forEach((light) => {
          if (light.id === element.id) {
            light.laneCount = parseInt(element.laneCount);
          }
        });
      });
    },
  },
});

export const {
  addCoord,
  deleteCoord,
  clearCoords,
  setLaneCount,
  setWebSocket,
} = canvasSlice.actions;
export default canvasSlice.reducer;

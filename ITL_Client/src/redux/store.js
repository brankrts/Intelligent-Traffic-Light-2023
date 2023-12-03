import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./reducers/canvasReducer";

const store = configureStore({
  reducer: { canvasReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

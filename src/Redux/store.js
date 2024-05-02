import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./reducer";

const appStore = configureStore({
  reducer: {
    store: storeReducer,
  },
});

export default appStore;

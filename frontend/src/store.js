import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./Redux/itemSlice";

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});

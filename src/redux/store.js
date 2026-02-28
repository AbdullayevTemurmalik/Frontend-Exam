import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./infoSlice";
import productSlice from "./productSlice";
import likeSlice from "./likeSlice";
import basketSlice from "./basketSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    info: infoSlice,
    product: productSlice,
    like: likeSlice,
    basket: basketSlice,
    filter: filterSlice,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;

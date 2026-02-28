import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const infoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addInfo } = infoSlice.actions;

export default infoSlice.reducer;

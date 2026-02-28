import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    name: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { name } = filterSlice.actions;
export default filterSlice.reducer;

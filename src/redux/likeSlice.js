import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};
export const likeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.value.push(action.payload);
    },
    deleteLike: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addLike, deleteLike } = likeSlice.actions;
export default likeSlice.reducer;

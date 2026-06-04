import { createSlice } from "@reduxjs/toolkit";

const savedLike = localStorage.getItem("like");
const initialState = {
  value: savedLike ? JSON.parse(savedLike) : [],
};
export const likeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("like", JSON.stringify(state.value));
    },
    deleteLike: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
      localStorage.setItem("like", JSON.stringify(state.value));
    },
  },
});

export const { addLike, deleteLike } = likeSlice.actions;
export default likeSlice.reducer;

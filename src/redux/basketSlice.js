import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.value.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.value.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToBasket, deleteItem } = basketSlice.actions;
export default basketSlice.reducer;

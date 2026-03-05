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
    incrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToBasket, deleteItem, incrementQuantity, decrementQuantity } =
  basketSlice.actions;

export default basketSlice.reducer;

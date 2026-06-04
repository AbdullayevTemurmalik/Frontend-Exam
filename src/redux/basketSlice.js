import { createSlice } from "@reduxjs/toolkit";

const savedBasket = localStorage.getItem("basket");
const initialState = {
  value: savedBasket ? JSON.parse(savedBasket) : [],
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
      localStorage.setItem("basket", JSON.stringify(state.value));
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
      localStorage.setItem("basket", JSON.stringify(state.value));
    },
    incrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("basket", JSON.stringify(state.value));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("basket", JSON.stringify(state.value));
      }
    },
  },
});

export const { addToBasket, deleteItem, incrementQuantity, decrementQuantity } =
  basketSlice.actions;

export default basketSlice.reducer;

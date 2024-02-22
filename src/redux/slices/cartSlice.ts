import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ShoppingCartState } from "../../types/ShoppingCart";
import { Product } from "../../types/Product";

const initialState: ShoppingCartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;
export default cartReducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ShoppingCartItem, ShoppingCartState } from "../../types/ShoppingCart";

const initialState: ShoppingCartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const saveToLocalStorage = (state: ShoppingCartState) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{
        item: ShoppingCartItem;
      }>
    ) => {
      const { item } = action.payload;
      const { id } = item;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += action.payload.item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }
      saveToLocalStorage(state);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      saveToLocalStorage(state);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
      saveToLocalStorage(state);
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    emptyCart: (state) => {
      state.items = [];
      saveToLocalStorage(state);
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

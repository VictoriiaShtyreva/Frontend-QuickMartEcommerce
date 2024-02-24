import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ShoppingCartItem, ShoppingCartState } from "../../types/ShoppingCart";
import { User } from "../../types/User";

const initialState: ShoppingCartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{
        item: ShoppingCartItem;
        user: User | null;
      }>
    ) => {
      const { item, user } = action.payload;
      const { id } = item;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += action.payload.item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }
      //Save cart items along with user object to local storage
      const cartData = { user, cartItems: state.items };
      localStorage.setItem("cartData", JSON.stringify(cartData));
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

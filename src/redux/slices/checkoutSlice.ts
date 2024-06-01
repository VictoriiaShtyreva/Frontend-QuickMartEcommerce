import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  CheckoutState,
  ReviewCheckout,
  ShippingAddress,
} from "../../types/Checkout";

const initialState: CheckoutState = {
  step: 0,
  shippingAddress: {
    addressLine: "",
    city: "",
    postalCode: "",
    country: "",
  },
  review: [],
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    updateReview: (state, action: PayloadAction<ReviewCheckout>) => {
      state.review = action.payload;
    },
  },
});

const checkoutReducer = checkoutSlice.reducer;

export const { setStep, updateShippingAddress, updateReview } =
  checkoutSlice.actions;

export default checkoutReducer;

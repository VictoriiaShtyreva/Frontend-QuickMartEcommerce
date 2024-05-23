import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  CheckoutState,
  PaymentDetails,
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
  paymentDetails: {
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
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
    updatePaymentDetails: (state, action: PayloadAction<PaymentDetails>) => {
      state.paymentDetails = action.payload;
    },
    updateReview: (state, action: PayloadAction<ReviewCheckout>) => {
      state.review = action.payload;
    },
  },
});

const checkoutReducer = checkoutSlice.reducer;

export const {
  setStep,
  updateShippingAddress,
  updatePaymentDetails,
  updateReview,
} = checkoutSlice.actions;

export default checkoutReducer;

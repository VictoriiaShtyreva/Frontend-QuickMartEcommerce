import { ShoppingCartItem } from "./ShoppingCart";

export type ShippingAddress = {
  addressLine: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentDetails = {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type ReviewCheckout = ShoppingCartItem[];

export type CheckoutState = {
  step: number;
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  review: ReviewCheckout;
};

import { ShoppingCartItem } from "./ShoppingCart";

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  address: string;
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

export type Review = ShoppingCartItem[];

export type CheckoutState = {
  step: number;
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  review: Review;
};

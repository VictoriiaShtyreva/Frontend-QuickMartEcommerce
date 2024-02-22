import { Product } from "./Product";

export type ShoppingCartItem = Product & {
  quantity: number;
};

export type ShoppingCartState = {
  items: ShoppingCartItem[];
};

import {
  addProduct,
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
  removeProduct,
} from "../../redux/slices/cartSlice";
import { createNewStore } from "../../redux/store";
import { shoppingItem } from "../mockdata/shoppingCart";

let store = createNewStore();

beforeEach(() => {
  store.dispatch(emptyCart());
});

describe("cart reducer", () => {
  //test for add item to cart
  test("should add shopping item to cart", () => {
    store.dispatch(addProduct({ item: shoppingItem }));
    expect(store.getState().cart.items).toEqual([shoppingItem]);
  });
  //test for remove item from cart
  //test for increaseQuantity
  test("should increase quantity of shopping item", () => {
    store.dispatch(addProduct({ item: shoppingItem }));
    store.dispatch(increaseQuantity("1"));
    expect(store.getState().cart.items).toEqual([
      { ...shoppingItem, quantity: 2 },
    ]);
  });
  //test for decreaseQuantity
  test("should decrease quantity of shopping item", () => {
    store.dispatch(addProduct({ item: shoppingItem }));
    store.dispatch(increaseQuantity("1"));
    store.dispatch(decreaseQuantity("1"));
    expect(store.getState().cart.items).toEqual([
      { ...shoppingItem, quantity: 1 },
    ]);
  });
});

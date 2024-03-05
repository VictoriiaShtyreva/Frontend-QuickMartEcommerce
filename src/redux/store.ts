import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import userReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categorySlice,
    users: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

//for testing purposes
export const createNewStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      categories: categorySlice,
      users: userReducer,
      cart: cartReducer,
      checkout: checkoutReducer,
    },
  });
};

export default store;

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import userReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import productImageReducer from "./slices/productImageSlice";
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categorySlice,
    users: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    productImages: productImageReducer,
    orders: orderReducer,
    review: reviewReducer,
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
      productImages: productImageReducer,
      orders: orderReducer,
      review: reviewReducer,
    },
  });
};

export default store;

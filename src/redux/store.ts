import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import userReducer from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categorySlice,
    users: userReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categorySlice,
    // users: usersReducer,
  },
});

//save user state in local storage
// localStorage.setItem("user", JSON.stringify(store.getState().users));

export default store;

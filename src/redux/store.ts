import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    // users: usersReducer,
  },
});

//save user state in local storage
// localStorage.setItem("user", JSON.stringify(store.getState().users));

export default store;

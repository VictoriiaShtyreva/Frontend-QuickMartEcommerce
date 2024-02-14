import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;

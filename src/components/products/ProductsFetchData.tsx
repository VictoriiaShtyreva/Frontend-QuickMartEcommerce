import { useEffect } from "react";
import { useSelector } from "react-redux";

import { fetchAllProducts } from "../../redux/slices/productSlice";
import { AppState } from "../../misc/types/type";
import { useAppDispatch } from "../../redux/store";

const ProductsFetchData = () => {
  const dispatch = useAppDispatch();

  //use fetchAllProducts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  //data
  const productList = useSelector((state: AppState) => state.products.products);
  console.log(productList, "list");

  return <div>ProductsFetchData</div>;
};

export default ProductsFetchData;

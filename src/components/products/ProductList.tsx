import { useEffect } from "react";
import { useSelector } from "react-redux";

import { fetchAllProducts } from "../../redux/slices/productSlice";
import { AppState } from "../../misc/types/type";
import { useAppDispatch } from "../../hooks/useAppDispach";

const ProductList = () => {
  const dispatch = useAppDispatch();

  //use fetchAllProducts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  //data
  const productList = useSelector((state: AppState) => state.products.products);
  console.log(productList, "list");

  return (
    <div>
      <h3>ProductList</h3>
    </div>
  );
};

export default ProductList;

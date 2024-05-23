import { useParams } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";
import { useAppDispatch } from "../hooks/useAppDispach";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect } from "react";
import { fetchProductById } from "../redux/slices/productSlice";

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.products.productDetails[id as string]
  );
  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(id as string));
    }
  }, [dispatch, id, product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return product ? (
    <ProductDetails id={id as string} />
  ) : (
    <div>Product not found</div>
  );
};

export default SingleProductPage;

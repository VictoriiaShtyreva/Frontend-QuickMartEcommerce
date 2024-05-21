import { useParams } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>();
  return <ProductDetails id={String(id)} />;
};

export default SingleProductPage;

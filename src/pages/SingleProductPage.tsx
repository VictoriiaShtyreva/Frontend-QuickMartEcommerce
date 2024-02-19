import { useParams } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <ProductDetails id={Number(id)} />
    </div>
  );
};

export default SingleProductPage;

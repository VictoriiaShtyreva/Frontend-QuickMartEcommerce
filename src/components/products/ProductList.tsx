import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";

import { AppState } from "../../types/type";
import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  fetchAllProducts,
  sortProductsByPrice,
} from "../../redux/slices/productSlice";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../hooks/useAppSelector";

const ProductList = ({
  selectedCategory,
  pagination,
}: {
  selectedCategory: number | string;
  pagination: { page: number; limit: number };
}) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: AppState) => state.products.products);

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category.id === selectedCategory);

  //fetchAllProducts
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(sortProductsByPrice("asc"));
  }, [dispatch]);

  //Calculate start and end indexes based on pagination
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = pagination.page * pagination.limit;

  return (
    <Box sx={{ p: 1 }}>
      <Grid container justifyContent={"center"} spacing={2}>
        {/* Slice the filteredProducts array based on pagination */}
        {filteredProducts
          .slice(startIndex, endIndex)
          .map((product: Product) => (
            <Grid item key={product.id} xs={11} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductList;

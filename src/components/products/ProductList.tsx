import { useEffect } from "react";
import { Box, Grid } from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  fetchAllProducts,
  sortProductsByPrice,
} from "../../redux/slices/productSlice";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../hooks/useAppSelector";
import { QueryOptions } from "../../types/QueryOptions";

const ProductList = ({
  selectedCategory,
  pagination,
  products,
  sortBy,
}: {
  selectedCategory: number | string;
  pagination: { page: number; limit: number };
  products: Product[];
  sortBy: string;
}) => {
  const dispatch = useAppDispatch();
  //Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category.id === selectedCategory);
  // //Calculate start and end indexes based on pagination
  // const startIndex = (pagination.page - 1) * pagination.limit;
  // const endIndex = pagination.page * pagination.limit;
  // //Query options for the fetchAllProducts action
  // const sortByField = sortBy.includes("price") ? "byPrice" : "byTitle";
  // const sortOrder = sortBy.includes("Asc") ? "Ascending" : "Descending";

  // useEffect(() => {
  //   const queryOptions: QueryOptions = {
  //     page: pagination.page,
  //     pageSize: pagination.limit,
  //     sortBy: sortByField,
  //     sortOrder,
  //   };
  //   dispatch(fetchAllProducts(queryOptions));
  // }, [dispatch, pagination.page, pagination.limit, sortByField, sortOrder]);

  return (
    <Box sx={{ p: 1 }}>
      <Grid container justifyContent={"center"} spacing={2}>
        {/* Slice the filteredProducts array based on pagination */}
        {filteredProducts
          // .slice(startIndex, endIndex)
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

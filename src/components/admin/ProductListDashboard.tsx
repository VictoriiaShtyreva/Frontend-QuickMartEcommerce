import React, { useCallback, useEffect, useState } from "react";
import { Box, Pagination, Grid } from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import ProductAdminItem from "./ProductAdminItem";
import { Product } from "../../types/Product";

const ProductListDashboard = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  // Pagination state
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 20 }
  );
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPagination({ ...pagination, page });
    },
    [pagination, setPagination]
  );
  //Calculate start and end indexes based on pagination
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = pagination.page * pagination.limit;

  //fetchAllProducts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Box
      p={4}
      sx={{
        minHeight: "100vh",
      }}
    >
      <div>Create product</div>
      <Grid container justifyContent={"center"} spacing={2}>
        {products.slice(startIndex, endIndex).map((product: Product) => (
          <Grid item key={product.id} xs={11} sm={6} md={4} lg={3}>
            <ProductAdminItem product={product} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2, p: 2 }}
      >
        <Pagination
          variant="outlined"
          count={20}
          page={pagination.page}
          onChange={handlePaginationChange}
        />
      </Box>
    </Box>
  );
};

export default ProductListDashboard;

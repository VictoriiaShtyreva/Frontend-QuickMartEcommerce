import React, { useCallback, useEffect, useState } from "react";
import { Box, Pagination, Grid } from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchAllProducts,
  searchProductByName,
} from "../../redux/slices/productSlice";
import ProductAdminItem from "./ProductAdminItem";
import { Product } from "../../types/Product";
import SearchForm from "../products/SearchForm";

const ProductListDashboard = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  //Search by name state
  const [userInput, setUserInput] = useState("");
  // Pagination state
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 20 }
  );

  //Handle pagination
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPagination({ ...pagination, page });
    },
    [pagination, setPagination]
  );
  //Calculate start and end indexes based on pagination
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = pagination.page * pagination.limit;

  ////Handle search product by name
  const handleSearch = (value: string) => {
    dispatch(searchProductByName(value.toLowerCase()));
  };

  const handleClear = () => {
    setUserInput("");
    //Fetch all products again to display them
    dispatch(fetchAllProducts());
  };

  //fetchAllProducts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Box
      p={4}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        p: 2,
      }}
    >
      <div>Create product</div>
      <Box sx={{ m: 2, maxWidth: 250 }}>
        <SearchForm
          userInput={userInput}
          setUserInput={setUserInput}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </Box>
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

import React, { useCallback, useEffect, useState } from "react";
import { Box, Pagination, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchAllProducts,
  searchProductByName,
} from "../../redux/slices/productSlice";
import ProductAdminItem from "./ProductAdminItem";
import { Product } from "../../types/Product";
import SearchForm from "../products/SearchForm";
import ProductCreateForm from "./ProductCreateForm";

const ProductListDashboard = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  //Search by name state
  const [userInput, setUserInput] = useState("");
  // Pagination state
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 20 }
  );
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

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

  const handleCreateDialogOpen = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCreateDialogOpen}
          startIcon={<AddIcon />}
        >
          Create Product
        </Button>
        <Box>
          <SearchForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </Box>
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
      <ProductCreateForm
        open={openCreateDialog}
        onClose={handleCreateDialogClose}
      />
    </Box>
  );
};

export default ProductListDashboard;

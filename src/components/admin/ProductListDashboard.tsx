import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Pagination,
  Grid,
  Button,
  Typography,
  SelectChangeEvent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  clearSearch,
  fetchAllProducts,
  searchProductByName,
  sortProductsByPrice,
  sortProductsByTitle,
} from "../../redux/slices/productSlice";
import ProductAdminItem from "./ProductAdminItem";
import SearchForm from "../products/SearchForm";
import ProductCreateForm from "./ProductCreateForm";
import EmptyProducts from "../products/EmptyProducts";
import { QueryOptions } from "../../types/QueryOptions";
import SortingFilter from "../products/SortingFilter";

const ProductListDashboard = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.filteredProducts);
  const totalProducts = useAppSelector((state) => state.products.total);
  const [sortBy, setSortBy] = useState<string>("priceAsc");
  //Search by name state
  const [userInput, setUserInput] = useState("");
  // Pagination state
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 12 }
  );
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [fetchProductsTrigger, setFetchProductsTrigger] = useState(false);

  //Query options
  const queryOptions: QueryOptions = useMemo(() => {
    const sortByField = sortBy.includes("price") ? "byPrice" : "byTitle";
    const sortOrder = sortBy.includes("Asc") ? "Ascending" : "Descending";
    return {
      page: pagination.page,
      pageSize: pagination.limit,
      sortBy: sortByField,
      sortOrder,
    };
  }, [pagination.page, pagination.limit, sortBy]);

  //Handle pagination
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPagination({ ...pagination, page });
    },
    [pagination, setPagination]
  );

  //Handle search product by name
  const handleSearch = (value: string) => {
    setUserInput(value);
    if (value.trim() === "") {
      dispatch(clearSearch());
    } else {
      dispatch(searchProductByName(value));
    }
  };

  const handleClear = () => {
    setUserInput("");
    dispatch(clearSearch());
    //Fetch all products again to display them
    dispatch(fetchAllProducts(queryOptions));
  };

  const handleSortChange = useCallback(
    (event: SelectChangeEvent) => {
      const newSortBy = event.target.value as string;
      setSortBy(newSortBy);
      if (newSortBy.includes("price")) {
        dispatch(
          sortProductsByPrice(newSortBy.includes("Asc") ? "asc" : "desc")
        );
      } else {
        dispatch(
          sortProductsByTitle(newSortBy.includes("Asc") ? "asc" : "desc")
        );
        setPagination((prev) => ({ ...prev, page: 1 }));
      }
    },
    [dispatch]
  );

  const handleCreateDialogOpen = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / pagination.limit);

  //fetchAllProducts
  useEffect(() => {
    dispatch(fetchAllProducts(queryOptions));
  }, [dispatch, queryOptions]);

  return (
    <Box p={4} sx={{ minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          mb: 2,
        }}
      >
        <Button
          sx={{ mb: 2 }}
          variant="contained"
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
        <Grid item xs={12} md={4}>
          <SortingFilter sortBy={sortBy} onChange={handleSortChange} />
        </Grid>
      </Box>
      {products.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Inventory</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <ProductAdminItem
                    key={product.id}
                    product={product}
                    queryOptions={queryOptions}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              variant="outlined"
              count={totalPages}
              page={pagination.page}
              onChange={handlePaginationChange}
            />
          </Box>
        </>
      ) : (
        <EmptyProducts />
      )}
      <ProductCreateForm
        open={openCreateDialog}
        onClose={handleCreateDialogClose}
      />
    </Box>
  );
};

export default ProductListDashboard;

import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import ProductList from "./ProductList";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { RootState } from "../../types/type";
import { fetchAllCategories } from "../../redux/slices/categorySlice";
import { sortProductsByPrice } from "../../redux/slices/productSlice";
import { Category } from "../../types/Category";
import CategorySelection from "./CategorySelection";
import SortingFilter from "./SortingFilter";

const Products = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector<RootState, Category[]>(
    (state) => state.categories.categories
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortPrice, setSortPrice] = useState<"asc" | "desc">("asc");
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 12 }
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleSortPriceChange = useCallback(
    (event: SelectChangeEvent) => {
      const newSortPrice = event.target.value as "asc" | "desc";
      setSortPrice(newSortPrice);
      dispatch(sortProductsByPrice(newSortPrice));
    },
    [dispatch, setSortPrice]
  );

  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent) => {
      setSelectedCategory(event.target.value);
    },
    [setSelectedCategory]
  );

  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPagination({ ...pagination, page });
    },
    [pagination, setPagination]
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Products Page
      </Typography>
      <Grid container spacing={2} flexDirection={"column"}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CategorySelection
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SortingFilter
            sortPrice={sortPrice}
            onChange={handleSortPriceChange}
          />
        </Grid>
        <ProductList
          selectedCategory={selectedCategory}
          pagination={pagination}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            variant="outlined"
            count={10}
            page={pagination.page}
            onChange={handlePaginationChange}
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default Products;

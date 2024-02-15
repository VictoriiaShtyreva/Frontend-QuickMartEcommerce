import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import ProductList from "../components/products/ProductList";
import { useAppDispatch } from "../hooks/useAppDispach";
import { useSelector } from "react-redux";
import { RootState } from "../types/type";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../redux/slices/categorySlice";
import { SelectChangeEvent } from "@mui/material";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch all categories on component mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Products Page
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ marginBottom: 2 }}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <ProductList />
      </Grid>
    </Container>
  );
};

export default ProductsPage;

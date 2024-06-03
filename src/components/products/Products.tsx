import {
  Box,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Pagination,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import ProductList from "./ProductList";
import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  clearSearch,
  fetchAllProducts,
  searchProductByName,
  sortProductsByPrice,
  sortProductsByTitle,
} from "../../redux/slices/productSlice";
import SortingFilter from "./SortingFilter";
import { useAppSelector } from "../../hooks/useAppSelector";
import SearchForm from "./SearchForm";
import EmptyProducts from "./EmptyProducts";
import { QueryOptions } from "../../types/QueryOptions";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";
import { fetchProductsByCategory } from "../../redux/slices/categorySlice";

// Utility function to get unique categories from products
const getUniqueCategories = (products: Product[]): Category[] => {
  const categoryMap = new Map<string, Category>();
  products.forEach((product) => {
    if (!categoryMap.has(product.category.id)) {
      categoryMap.set(product.category.id, product.category);
    }
  });
  return Array.from(categoryMap.values());
};

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.filteredProducts);
  const productsByCategory = useAppSelector(
    (state) => state.categories.productsByCategory
  );
  const allProducts = useAppSelector((state) => state.products.products);
  const categories = getUniqueCategories(allProducts);
  const totalProducts = useAppSelector((state) => state.products.total);
  const [sortBy, setSortBy] = useState<string>("priceAsc");
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 12 }
  );
  const [categoryPagination, setCategoryPagination] = useState<{
    page: number;
    limit: number;
  }>({ page: 1, limit: 12 });
  const [userInput, setUserInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Define query options
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

  //Handle search product by name
  const handleSearch = (value: string) => {
    setUserInput(value);
    if (value.trim() === "") {
      dispatch(clearSearch());
    } else {
      dispatch(searchProductByName(value));
    }
  };

  //Handle clear
  const handleClear = () => {
    setUserInput("");
    dispatch(clearSearch());
    //Fetch all products again to display them
    dispatch(fetchAllProducts(queryOptions));
  };

  //Handle sort products by price and title
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

  //Handle category filter
  //Handle category filter
  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent) => {
      const newCategory = event.target.value as string;
      setSelectedCategory(newCategory);
      if (newCategory === "All") {
        dispatch(fetchAllProducts(queryOptions));
      } else {
        const selectedCategoryId = categories.find(
          (category) => category.name === newCategory
        )?.id;
        if (selectedCategoryId) {
          dispatch(fetchProductsByCategory(selectedCategoryId));
        }
      }
      setPagination((prev) => ({ ...prev, page: 1 }));
      setCategoryPagination((prev) => ({ ...prev, page: 1 }));
    },
    [dispatch, categories, queryOptions]
  );

  //Handle pagination
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPagination((prev) => ({ ...prev, page }));
    },
    []
  );

  //Handle category pagination
  const handleCategoryPaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCategoryPagination((prev) => ({ ...prev, page }));
    },
    []
  );

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / pagination.limit);
  const totalCategoryPages = Math.ceil(
    productsByCategory.length / categoryPagination.limit
  );

  // Paginate products by category
  const paginatedProductsByCategory = useMemo(() => {
    const startIndex = (categoryPagination.page - 1) * categoryPagination.limit;
    const endIndex = startIndex + categoryPagination.limit;
    return productsByCategory.slice(startIndex, endIndex);
  }, [productsByCategory, categoryPagination.page, categoryPagination.limit]);

  //Fetch products based on query options
  useEffect(() => {
    if (selectedCategory === "All") {
      dispatch(fetchAllProducts(queryOptions));
    }
  }, [dispatch, queryOptions, selectedCategory]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Grid item xs={8} md={4}>
        <Typography variant="h5" gutterBottom mt={2}>
          We Help You Make Modern Future
        </Typography>
        <Typography variant="body2" mb={2}>
          All of our products are carefully selected to provide the best choices
          for our customers. Explore future with us!
        </Typography>
        <SearchForm
          userInput={userInput}
          setUserInput={setUserInput}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </Grid>
      <Grid container spacing={2} flexDirection={"column"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            p: 2,
            mt: 2,
          }}
        >
          <Grid item xs={12} md={4}>
            <SortingFilter sortBy={sortBy} onChange={handleSortChange} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth color="secondary">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="All">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Box>
        {selectedCategory === "All" ? (
          <>
            {products.length > 0 ? (
              <>
                <ProductList products={products} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    mb: 2,
                    p: 2,
                  }}
                >
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
          </>
        ) : (
          <>
            {productsByCategory.length > 0 ? (
              <>
                <ProductList products={paginatedProductsByCategory} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    mb: 2,
                    p: 2,
                  }}
                >
                  <Pagination
                    variant="outlined"
                    count={totalCategoryPages}
                    page={categoryPagination.page}
                    onChange={handleCategoryPaginationChange}
                  />
                </Box>
              </>
            ) : (
              <EmptyProducts />
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Products;

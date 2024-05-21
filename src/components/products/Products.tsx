import {
  Box,
  CardContent,
  Container,
  Grid,
  Pagination,
  Typography,
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

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.filteredProducts);
  const totalProducts = useAppSelector((state) => state.products.total);
  const [sortBy, setSortBy] = useState<string>("priceAsc");
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 12 }
  );
  const [userInput, setUserInput] = useState("");

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

  //Handle pagination
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPagination((prev) => ({ ...prev, page }));
    },
    []
  );

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / pagination.limit);

  //Fetch products based on query options
  useEffect(() => {
    dispatch(fetchAllProducts(queryOptions));
  }, [dispatch, queryOptions]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Grid
        container
        spacing={0}
        mt={1}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        style={{ backgroundColor: "#b195cf" }}
      >
        <Grid item xs={6} md={8}>
          <img
            src={require("../../images/homepicture.png")}
            width={500}
            height={400}
            alt="Good shopping cart"
          ></img>
        </Grid>
        <Grid item xs={6} md={4}>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
              We Help You Make Modern Future
            </Typography>
            <Typography variant="body1" mb={2}>
              All of our products are carefully selected to provide the best
              choices for our customers. Explore future with us!
            </Typography>
            <Grid item xs={12} md={12}>
              <SearchForm
                userInput={userInput}
                setUserInput={setUserInput}
                onSearch={handleSearch}
                onClear={handleClear}
              />
            </Grid>
          </CardContent>
        </Grid>
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
        </Box>
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
      </Grid>
    </Container>
  );
};

export default Products;

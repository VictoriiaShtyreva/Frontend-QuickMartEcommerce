import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Pagination } from "@mui/material";

import { AppState, RootState } from "../../types/type";
import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  fetchAllProducts,
  selectPagination,
  setPagination,
} from "../../redux/slices/productSlice";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: AppState) => state.products.products);
  //Logic for pagination
  const pagination = useSelector((state: RootState) => selectPagination(state));

  //use fetchAllProducts
  useEffect(() => {
    dispatch(fetchAllProducts(pagination));
  }, [dispatch, pagination]);

  //Wrap to useCallback for memoizes function
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      dispatch(
        setPagination({ ...pagination, offset: (page - 1) * pagination.limit })
      );
    },
    [dispatch, pagination]
  );

  return (
    <>
      <h3>Product List</h3>
      <Box sx={{ p: 1 }}>
        <Grid container justifyContent="center" spacing={2}>
          {products.map((product: Product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            variant="outlined"
            count={8}
            page={pagination.offset / pagination.limit + 1}
            onChange={handlePaginationChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductList;

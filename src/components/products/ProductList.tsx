import { Box, Grid } from "@mui/material";

import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Grid container justifyContent={"center"} spacing={2}>
        {products.map((product: Product) => (
          <Grid item key={product.id} xs={11} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;

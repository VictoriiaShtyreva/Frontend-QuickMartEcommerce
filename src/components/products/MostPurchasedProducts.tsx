// src/components/MostPurchasedProducts.tsx
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchMostPurchasedProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";

const MostPurchasedProducts = () => {
  const dispatch = useAppDispatch();
  const mostPurchasedProducts = useAppSelector(
    (state) => state.products.mostPurchasedProducts
  );

  useEffect(() => {
    dispatch(fetchMostPurchasedProducts(5)); // Fetch the top 5 most purchased products
  }, [dispatch]);

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Most Purchased Products
      </Typography>
      <Grid container spacing={2}>
        {mostPurchasedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]?.url}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" sx={{ mt: 2, zIndex: 1 }}>
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography sx={{ color: "primary.contrastText" }}>
                      View Product
                    </Typography>
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MostPurchasedProducts;

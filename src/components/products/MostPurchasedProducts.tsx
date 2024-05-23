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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MostPurchasedProducts = () => {
  const dispatch = useAppDispatch();
  const mostPurchasedProducts = useAppSelector(
    (state) => state.products.mostPurchasedProducts
  );

  useEffect(() => {
    dispatch(fetchMostPurchasedProducts(10)); // Fetch the top 5 most purchased products
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Most Purchased Products
      </Typography>
      <Slider {...settings}>
        {mostPurchasedProducts.map((product) => (
          <Box key={product.id} sx={{ px: 2 }}>
            <Card
              sx={{
                m: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]?.url}
                alt={product.title}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "center",
                    minHeight: 160,
                  }}
                >
                  <Typography gutterBottom variant="h6" component="p">
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.description}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button color="primary" sx={{ mt: 1 }}>
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
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MostPurchasedProducts;

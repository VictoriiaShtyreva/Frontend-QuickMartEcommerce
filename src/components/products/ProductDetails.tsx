import { useEffect } from "react";
import { Grid, Box, Typography, Fab } from "@mui/material";
import Carousel from "react-slick";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { AppState } from "../../types/type";
import { fetchProductById } from "../../redux/slices/productSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const ProductDetails = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: AppState) =>
    state.products.products.find((product) => product.id === id)
  );
  const { user } = useAppSelector((state: AppState) => state.users);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product]);

  //Settings for carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} md={6}>
        <Box p={2}>
          {product?.images && product?.images.length > 0 ? (
            <Carousel {...settings}>
              {product?.images.slice(0, 3).map((image) => (
                <Box key={image}>
                  <img src={image} alt={product?.title} width="100%" />
                </Box>
              ))}
            </Carousel>
          ) : (
            <Typography variant="body1">No images available</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box p={2}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {product?.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {product?.category.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {product?.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="body1">Price: ${product?.price}</Typography>
          </Box>
          {/* logic for user */}
          {user && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: "0 auto",
                  width: "150px",
                }}
              >
                <Fab color="secondary" aria-label="add to favorites">
                  <FavoriteIcon />
                </Fab>
                <Fab color="primary" aria-label="add to cart">
                  <AddShoppingCartIcon />
                </Fab>
              </Box>
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;

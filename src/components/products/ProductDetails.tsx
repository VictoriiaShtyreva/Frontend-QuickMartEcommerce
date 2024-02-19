import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Typography, Popover, Button, Fab } from "@mui/material";
import Carousel from "react-slick";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { AppState } from "../../types/type";
import { fetchProductById } from "../../redux/slices/productSlice";

const ProductDetails = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const product = useSelector((state: AppState) =>
    state.products.products.find((product) => product.id === id)
  );
  const [anchorEl, setAnchorEl] = useState(null);

  //   const handleAddToFavoritesClick = (event) => {
  //     if (!isLoggedIn) {
  //       setAnchorEl(event.currentTarget);
  //     } else {
  //       onAddToFavorites(product);
  //     }
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

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
    <Grid container spacing={2}>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">Price: ${product?.price}</Typography>
          </Box>
        </Box>
      </Grid>

      {/* logic for user */}
      {/* {isLoggedIn && (
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Fab
              color="secondary"
              aria-label="add to favorites"
              onClick={handleAddToFavoritesClick}
            >
              <FavoriteIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="add to cart"
              onClick={() => onAddToCart(product)}
            >
              <AddShoppingCartIcon />
            </Fab>
          </Box>
        </Grid>
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="body2">
            You must be logged in to add products to favorites.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Login
          </Button>
        </Box>
      </Popover> */}
    </Grid>
  );
};

export default ProductDetails;

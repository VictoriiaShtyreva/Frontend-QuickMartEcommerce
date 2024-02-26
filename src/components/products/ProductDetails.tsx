import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Fab,
  Dialog,
  DialogContent,
} from "@mui/material";
import Carousel from "react-slick";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Bounce, toast } from "react-toastify";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { fetchProductById } from "../../redux/slices/productSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import CartModal from "../cart/CartModal";
import { ShoppingCartItem } from "../../types/ShoppingCart";

const ProductDetails = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    state.products.products.find((product) => product.id === id)
  );
  const { user } = useAppSelector((state) => state.users);
  //Cart state
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    if (!user) {
      toast.info("You need to login to add this product to cart.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleAddToFavorites = () => {
    if (!user) {
      toast.info("You need to login to add this product to favorites.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    //Dispatch action to add to favorites
  };

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
        <Box p={3}>
          {product?.images && product?.images.length > 0 ? (
            <Carousel {...settings}>
              {product?.images.slice(0, 3).map((image) => (
                <Box key={image}>
                  <img src={image} alt={product?.title} width="100%" />
                </Box>
              ))}
            </Carousel>
          ) : (
            <img src="../../images/default.png" alt="Default" width="100%" />
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
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: "0 auto",
                width: "150px",
              }}
            >
              <Fab
                color="secondary"
                aria-label="add to favorites"
                onClick={handleAddToFavorites}
              >
                <FavoriteIcon />
              </Fab>
              <Fab
                color="primary"
                aria-label="add to cart"
                onClick={handleOpenDialog}
              >
                <AddShoppingCartIcon />
              </Fab>
            </Box>
          </Grid>
        </Box>
      </Grid>
      {/* Render CartModal*/}
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {product && (
            <CartModal
              onClose={handleCloseDialog}
              item={product as ShoppingCartItem}
              open={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default ProductDetails;

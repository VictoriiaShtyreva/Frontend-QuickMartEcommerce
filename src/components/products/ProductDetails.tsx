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
import {
  addFavoriteProduct,
  fetchProductById,
} from "../../redux/slices/productSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import CartModal from "../cart/CartModal";
import { ShoppingCartItem } from "../../types/ShoppingCart";
import { checkImageUrl } from "../../utils/checkImageUrl";
import ProductCard from "./ProductCard";
import scrollToTop from "../../utils/scrollToTop";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { RootState } from "../../types/type";
import { svgUrl } from "../../utils/svgUrl";

const ProductDetails = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    state.products.products.find((product) => product.id === id)
  );
  const images = product?.images.map((image) => {
    const imageUrl = checkImageUrl(image);
    return typeof imageUrl === "string" ? imageUrl : svgUrl;
  });
  const { user } = useAppSelector((state) => state.users);
  const isAdmin = user?.role === "admin";
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
    } else {
      dispatch(addFavoriteProduct(product as Product));
    }
  };

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product]);

  //For scroll to top, when product detail is cliced in product card of related products
  useEffect(() => {
    scrollToTop();
  }, [id]);

  //Settings for carousel of images
  const settingsImages = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //Get the category of the current product
  const currentProductCategory: number | undefined = product?.category.id;
  const categoryId: number = currentProductCategory ?? 0;

  //Define selectors to extract specific data from the Redux store
  const selectProducts = (state: RootState) => state.products.products;
  const selectCurrentProductCategory = (_: RootState, categoryId: number) =>
    categoryId;
  const selectProductId = (_: RootState, __: number, productId: number) =>
    productId;

  //Create a memoized selector function using createDraftSafeSelector to filter related products based on category and excluding the current product
  const selectRelatedProducts = createDraftSafeSelector(
    [selectProducts, selectCurrentProductCategory, selectProductId],
    (products: Product[], categoryId: number, productId: number) =>
      products.filter(
        (product: Product) =>
          product.category.id === categoryId && product.id !== productId
      )
  );

  //Retrieve related products from the Redux store using the created selector
  const relatedProducts: Product[] = useAppSelector((state) =>
    selectRelatedProducts(state, categoryId, id)
  );

  return (
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} md={6}>
        <Box p={3}>
          <Carousel {...settingsImages}>
            {images?.map((imageUrl, index) => (
              <Box key={index}>
                <img src={imageUrl} alt={product?.title} width="100%" />
              </Box>
            ))}
          </Carousel>
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
          {!isAdmin && (
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
          )}
        </Box>
      </Grid>
      {/* Display related products */}
      {relatedProducts.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ p: 2 }}>
            You can also like:
          </Typography>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {relatedProducts.slice(0, 6).map((product) => (
              <Grid item xs={12} sm={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
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

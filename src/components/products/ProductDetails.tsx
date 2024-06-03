import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Fab,
  Dialog,
  DialogContent,
  List,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Rating,
  Divider,
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
import { Review } from "../../types/Review";

const ProductDetails = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.productDetails[id]);
  const images = product?.images.map((image) => {
    const imageUrl = checkImageUrl(image.url, svgUrl);
    return imageUrl;
  });
  const { user } = useAppSelector((state) => state.users);
  const isAdmin = user?.role === "Admin";

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
  }, [dispatch, product, id]);

  useEffect(() => {
    scrollToTop();
  }, [id]);

  const settingsImages = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const currentProductCategory: string | undefined = product?.category.id;
  const categoryId: string = currentProductCategory ?? "";

  const selectProducts = (state: RootState) => state.products.products;
  const selectCurrentProductCategory = (_: RootState, categoryId: string) =>
    categoryId;
  const selectProductId = (_: RootState, __: string, productId: string) =>
    productId;

  const selectRelatedProducts = createDraftSafeSelector(
    [selectProducts, selectCurrentProductCategory, selectProductId],
    (products: Product[], categoryId: string, productId: string) =>
      products.filter(
        (product: Product) =>
          product.category.id === categoryId && product.id !== productId
      )
  );

  const relatedProducts: Product[] = useAppSelector((state) =>
    selectRelatedProducts(state, categoryId, id)
  );

  const averageRating = (reviews: Review[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} md={6}>
        <Box p={3}>
          <Carousel {...settingsImages}>
            {images?.map((imageUrl, index) => (
              <Box key={index}>
                <img
                  src={imageUrl as string}
                  alt={product?.title}
                  width="100%"
                />
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
          <Rating
            value={averageRating(product?.reviews)}
            readOnly
            precision={0.5}
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {product?.reviews.length} reviews
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            ${product?.price}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {product?.description}
          </Typography>
          {!isAdmin && (
            <Grid item xs={12} mt={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: "0 auto",
                  width: "150px",
                }}
              >
                <Fab
                  color="error"
                  aria-label="add to favorites"
                  onClick={handleAddToFavorites}
                >
                  <FavoriteIcon />
                </Fab>
                <Fab
                  color="secondary"
                  aria-label="add to cart"
                  onClick={handleOpenDialog}
                >
                  <AddShoppingCartIcon />
                </Fab>
              </Box>
            </Grid>
          )}
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Customer Reviews</Typography>
          <Divider sx={{ mb: 2 }} />
          {product?.reviews && product.reviews.length > 0 ? (
            <List>
              {product.reviews.map((review) => (
                <Card key={review.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          src={review.user?.avatar || ""}
                          alt={review.user?.name || "User"}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold", mr: 1 }}
                            >
                              {review.user?.name || "User"}
                            </Typography>
                            <Rating
                              value={review.rating}
                              readOnly
                              precision={0.5}
                              sx={{ ml: 1 }}
                            />
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ ml: 1 }}
                            >
                              {new Date(review.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2">
                            {review.content}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
          ) : (
            <Typography variant="body2">No reviews yet.</Typography>
          )}
        </Box>
      </Grid>
      {relatedProducts.length > 0 && (
        <Grid item xs={12}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Products you may like</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {relatedProducts.slice(0, 3).map((product) => (
                <Grid item xs={12} sm={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      )}
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

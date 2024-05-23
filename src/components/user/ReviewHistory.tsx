// src/components/user/Reviews.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Rating,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { Review } from "../../types/Review";
import { Product } from "../../types/Product";
import { fetchProductById } from "../../redux/slices/productSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispach";

interface ReviewsProps {
  reviews: Review[];
}

const ReviewHistory: React.FC<ReviewsProps> = ({ reviews }) => {
  const dispatch = useAppDispatch();
  const productDetails = useAppSelector(
    (state) => state.products.productDetails
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const promises = reviews.map((review) =>
          dispatch(fetchProductById(review.productId)).unwrap()
        );
        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [dispatch, reviews]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : reviews.length > 0 ? (
        reviews.map((review) => {
          const product: Product | undefined = productDetails[review.productId];
          return (
            <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
              <Box display="flex" alignItems="center">
                {product?.images?.[0]?.url && (
                  <Avatar
                    variant="rounded"
                    src={product.images[0].url}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                )}
                <Box>
                  <Typography variant="h6">{product?.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product?.description}
                  </Typography>
                </Box>
              </Box>
              <Rating value={review.rating} readOnly />
              <Typography variant="body1">{review.content}</Typography>
              <Typography variant="body2">
                Review Date: {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </Paper>
          );
        })
      ) : (
        <Typography>No reviews found.</Typography>
      )}
    </Box>
  );
};

export default ReviewHistory;

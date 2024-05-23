// src/components/user/Reviews.tsx
import React from "react";
import { Box, Typography, Paper, Rating } from "@mui/material";
import { Review } from "../../types/Review";

interface ReviewsProps {
  reviews: Review[];
}

const ReviewHistory: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Product ID: {review.productId}</Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body1">{review.content}</Typography>
            <Typography variant="body2">
              Review Date: {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography>No reviews found.</Typography>
      )}
    </Box>
  );
};

export default ReviewHistory;

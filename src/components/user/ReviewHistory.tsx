// src/components/user/ReviewHistory.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Rating,
  CircularProgress,
  Avatar,
  Pagination,
  Button,
} from "@mui/material";
import { Review } from "../../types/Review";
import { Product } from "../../types/Product";
import { fetchProductById } from "../../redux/slices/productSlice";
import {
  deleteReview,
  fetchReviewsByUserId,
} from "../../redux/slices/reviewSlice"; // Import fetchReviewsByUserId
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispach";
import ReviewEditModal from "./ReviewEditModal";
import { Link } from "react-router-dom";

interface ReviewsProps {
  reviews: Review[];
  userId: string; // Add userId as a prop
}

const ReviewHistory: React.FC<ReviewsProps> = ({ reviews, userId }) => {
  const dispatch = useAppDispatch();
  const productDetails = useAppSelector(
    (state) => state.products.productDetails
  );
  const [loading, setLoading] = useState(true);
  // Pagination
  const [page, setPage] = useState(1);
  const reviewsPerPage = 10;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  // Modal state
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Local state to store reviews
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedReviews = localReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const promises = localReviews.map((review) =>
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
  }, [dispatch, localReviews]);

  const handleEditClick = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
  };

  //Handle Update Review
  const handleReviewUpdate = () => {
    // Refetch reviews after update
    dispatch(fetchReviewsByUserId(userId))
      .unwrap()
      .then((updatedReviews) => {
        setLocalReviews(updatedReviews);
      });
  };

  //Handle Delete review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      // Update local reviews state after deletion
      setLocalReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : localReviews.length > 0 ? (
        <>
          {paginatedReviews.map((review) => {
            const product: Product | undefined =
              productDetails[review.productId];
            return (
              <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
                <Box display="flex" alignItems="center">
                  {product?.images?.[0]?.url && (
                    <Link to={`/products/${product.id}`}>
                      <Avatar
                        variant="rounded"
                        src={product.images[0].url}
                        sx={{ width: 80, height: 80, mr: 2 }}
                      />
                    </Link>
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditClick(review)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </Button>
              </Paper>
            );
          })}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="secondary"
            />
          </Box>
        </>
      ) : (
        <Typography>No reviews found.</Typography>
      )}
      {selectedReview && (
        <ReviewEditModal
          review={selectedReview}
          open={isModalOpen}
          handleClose={handleCloseModal}
          onReviewUpdate={handleReviewUpdate}
        />
      )}
    </Box>
  );
};

export default ReviewHistory;

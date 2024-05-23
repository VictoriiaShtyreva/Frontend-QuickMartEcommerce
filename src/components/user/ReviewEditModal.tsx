// src/components/user/ReviewEditModal.tsx
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { Review } from "../../types/Review";
import { updateReview } from "../../redux/slices/reviewSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";

interface ReviewEditModalProps {
  review: Review;
  open: boolean;
  handleClose: () => void;
  onReviewUpdate: () => void; // Changed to a function without parameters
}

const ReviewEditModal: React.FC<ReviewEditModalProps> = ({
  review,
  open,
  handleClose,
  onReviewUpdate,
}) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(review.rating);
  const [content, setContent] = useState<string>(review.content);

  useEffect(() => {
    setRating(review.rating);
    setContent(review.content);
  }, [review]);

  const handleUpdate = async () => {
    await dispatch(
      updateReview({ id: review.id, userId: review.userId, rating, content })
    );
    onReviewUpdate(); // Call the refetch function
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Review</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue || 0);
            }}
          />
          <TextField
            margin="normal"
            label="Review"
            color="secondary"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="secondary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewEditModal;

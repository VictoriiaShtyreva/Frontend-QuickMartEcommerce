import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { createReview } from "../../redux/slices/reviewSlice";
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

interface ReviewCreateModalProps {
  open: boolean;
  handleClose: () => void;
  productId: string;
  userId: string;
}

const ReviewCreateModal: React.FC<ReviewCreateModalProps> = ({
  open,
  handleClose,
  productId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const handleCreate = async () => {
    await dispatch(
      createReview({
        userId: userId,
        productId,
        rating,
        content,
      })
    );
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Review</DialogTitle>
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
        <Button onClick={handleCreate} color="secondary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewCreateModal;

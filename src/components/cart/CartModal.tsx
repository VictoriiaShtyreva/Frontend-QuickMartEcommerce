import { Button, Box, Typography, IconButton } from "@mui/material";
import { memo, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { ShoppingCartItem } from "../../types/ShoppingCart";
import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  removeProduct,
  addProduct,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

import { useAppSelector } from "../../hooks/useAppSelector";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  item: ShoppingCartItem;
}

const CartModal = ({ onClose, item }: CartModalProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantityHandler = () => {
    dispatch(increaseQuantity(item.quantity));
    setQuantity(quantity + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(item.quantity));
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    dispatch(addProduct({ item: { ...item, quantity }, user }));
    onClose();
    toast.success(`${item.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const removeFromCart = () => {
    dispatch(removeProduct(item.id));
  };

  //Total Price
  const totalPrice = quantity * item.price;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Button
        onClick={onClose}
        color="secondary"
        sx={{ alignSelf: "flex-end" }}
      >
        <CloseIcon />
      </Button>
      <Typography variant="body1">{item.title}</Typography>
      <Typography variant="body2">Price: ${item.price}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="body2" sx={{ mr: 1 }}>
          Quantity:
        </Typography>
        <Button
          disabled={quantity <= 1}
          onClick={decreaseQuantityHandler}
          variant="contained"
          color="secondary"
          size="small"
        >
          -
        </Button>
        <Typography variant="body2" sx={{ m: 1 }}>
          {quantity}
        </Typography>
        <Button
          onClick={increaseQuantityHandler}
          variant="contained"
          color="secondary"
          size="small"
        >
          +
        </Button>
        <IconButton aria-label="remove" onClick={removeFromCart} sx={{ ml: 1 }}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Typography variant="body2">Total: ${totalPrice.toFixed(2)}</Typography>
      <Button variant="contained" color="secondary" onClick={addToCart}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default memo(CartModal);

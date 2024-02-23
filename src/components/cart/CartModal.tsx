import { Button, Box, Typography, IconButton } from "@mui/material";
import { memo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { ShoppingCartItem } from "../../types/ShoppingCart";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { removeProduct, addProduct } from "../../redux/slices/cartSlice";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  item: ShoppingCartItem;
}

const CartModal: React.FC<CartModalProps> = ({ onClose, item }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    dispatch(addProduct({ ...item, quantity: quantity }));
    onClose();
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
          onClick={decreaseQuantity}
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
          onClick={increaseQuantity}
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

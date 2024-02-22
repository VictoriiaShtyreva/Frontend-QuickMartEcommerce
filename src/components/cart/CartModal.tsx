import { Button, Box, Typography } from "@mui/material";
import { memo, useState } from "react";

import { ShoppingCartItem } from "../../types/ShoppingCart";
import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  item: ShoppingCartItem;
}

const CartModal: React.FC<CartModalProps> = ({ onClose, item }) => {
  const [qty, setQty] = useState<number>(1);
  const dispatch = useAppDispatch();

  //   const increaseQuantity = () => {
  //     dispatch(increaseQuantity(item.id));
  //   };

  //   const decreaseQuantity = () => {
  //     dispatch(decreaseQuantity(item.id));
  //   };

  const removeFromCart = () => {
    dispatch(removeProduct(item.id));
  };

  return (
    <Box>
      <Typography variant="body1">{item.title}</Typography>
      <Typography variant="body2">Price: ${item.price}</Typography>
      <Typography variant="body2">Quantity: {item.quantity}</Typography>
      {/* <Button onClick={increaseQuantity}>+</Button>
      <Button onClick={decreaseQuantity}>-</Button> */}
      <Button color="secondary" onClick={removeFromCart}>
        Remove
      </Button>
      <Button color="secondary" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default memo(CartModal);

import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { ShoppingCartItem } from "../../types/ShoppingCart";

interface CartItemProps {
  item: ShoppingCartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const increaseItemQuantity = () => {
    dispatch(increaseQuantity(item.id));
  };

  const decreaseItemQuantity = () => {
    dispatch(decreaseQuantity(item.id));
  };

  const removeFromCart = (itemId: number) => {
    dispatch(removeProduct(itemId));
  };

  return (
    <TableRow key={item.id}>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!item.images && (
            <img
              src={item.images[0]}
              alt={item.title}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
          )}
          <Typography>{item.title}</Typography>
        </Box>
      </TableCell>
      <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="decrease quantity"
            onClick={decreaseItemQuantity}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton
            aria-label="increase quantity"
            onClick={increaseItemQuantity}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            aria-label="remove from cart"
            onClick={() => removeFromCart(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;

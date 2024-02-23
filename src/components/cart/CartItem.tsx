import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeProduct } from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { ShoppingCartItem } from "../../types/ShoppingCart";
import { useAppSelector } from "../../hooks/useAppSelector";

interface CartItemProps {
  item: ShoppingCartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const removeFromCart = (itemId: number) => {
    dispatch(removeProduct(itemId));
  };

  return (
    <TableRow key={item.id}>
      <TableCell>{item.title}</TableCell>
      <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{item.quantity}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="remove from cart"
          onClick={() => removeFromCart(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;

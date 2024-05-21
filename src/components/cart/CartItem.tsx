import {
  Box,
  CardMedia,
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
import { checkImageUrl } from "../../utils/checkImageUrl";
import { svgUrl } from "../../utils/svgUrl";

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

  const removeFromCart = (itemId: string) => {
    dispatch(removeProduct(itemId));
  };

  const renderItemImage = () => {
    if (item.images && item.images.length > 0) {
      const imageUrl = checkImageUrl(item.images[0].url, svgUrl);
      return imageUrl;
    }
    return null;
  };

  return (
    <TableRow key={item.id}>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderItemImage() && (
            <CardMedia
              image={renderItemImage() as string}
              sx={{ width: 100, height: 100, mb: 2 }}
              title={item.title}
            ></CardMedia>
          )}
        </Box>
        <Typography>{item.title}</Typography>
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
            color="error"
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

import {
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { useAppDispatch } from "../hooks/useAppDispach";
import { useAppSelector } from "../hooks/useAppSelector";
import { emptyCart } from "../redux/slices/cartSlice";
import CartItem from "../components/cart/CartItem";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const clearCart = () => {
    dispatch(emptyCart());
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        p: 2,
      }}
    >
      <Typography variant="h4">Shopping Cart</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" onClick={clearCart}>
        Clear Cart
      </Button>
    </Box>
  );
};

export default CartPage;

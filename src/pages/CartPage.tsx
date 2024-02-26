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
import { useEffect } from "react";

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
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography variant="h4">Shopping Cart</Typography>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={clearCart}
          sx={{ mb: 2 }}
        >
          Clear Cart
        </Button>
        <Button variant="contained" color="secondary" sx={{ mb: 2 }}>
          Proceed to checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;

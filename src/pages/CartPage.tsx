import { useState } from "react";
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
import EmptyCart from "../components/cart/EmptyCart";
import CheckoutForm from "../components/cart/checkout/CheckoutForm";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const clearCart = () => {
    dispatch(emptyCart());
  };

  const shippingAddress = useAppSelector(
    (state) => state.checkout.shippingAddress
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        justifyContent: "space-between",
        flexDirection: "column",
        p: 2,
      }}
    >
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Shopping Cart</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={clearCart}
              sx={{ mb: 2 }}
            >
              Clear Cart
            </Button>
          </Box>
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
              sx={{ mb: 2 }}
              onClick={handleOpenModal}
            >
              Proceed to checkout
            </Button>
          </Box>
        </>
      )}
      <CheckoutForm
        isOpen={openModal}
        onClose={handleCloseModal}
        shippingAddress={shippingAddress}
      />
    </Box>
  );
};

export default CartPage;

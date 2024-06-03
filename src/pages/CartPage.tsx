import { useEffect, useState } from "react";
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
  Grid,
  Card,
  CardContent,
  TextField,
  Divider,
} from "@mui/material";

import { useAppDispatch } from "../hooks/useAppDispach";
import { useAppSelector } from "../hooks/useAppSelector";
import { emptyCart } from "../redux/slices/cartSlice";
import CartItem from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";
import CheckoutForm from "../components/cart/checkout/CheckoutForm";
import { authenticateUser } from "../redux/slices/usersSlice";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [openModal, setOpenModal] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState("");

  const totalSum = cartItems
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  const calculateDeliveryEstimate = () => {
    const today = new Date();
    const startDelivery = new Date(today);
    startDelivery.setDate(today.getDate() + 5);
    const endDelivery = new Date(today);
    endDelivery.setDate(today.getDate() + 7);

    const start = startDelivery.toLocaleDateString("en-GB");
    const end = endDelivery.toLocaleDateString("en-GB");

    setDeliveryEstimate(`${start} - ${end}`);
  };

  useEffect(() => {
    dispatch(authenticateUser());
    calculateDeliveryEstimate();
  }, [dispatch]);

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
    <Box sx={{ minHeight: "100vh", p: 2 }}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Products</TableCell>
                    <TableCell>Price</TableCell>
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
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography variant="body1">
                After 3 orders you will be able to get a coupon for a discount!
              </Typography>
              <Button variant="outlined" color="error" onClick={clearCart}>
                Clear cart
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <TextField
                  label="Add a promo code"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  color="info"
                />
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {totalSum}
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleOpenModal}
                >
                  Continue to payment
                </Button>
              </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="body2">
                  Order now and get your products (estimation):
                </Typography>
                <Typography variant="body1">{deliveryEstimate}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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

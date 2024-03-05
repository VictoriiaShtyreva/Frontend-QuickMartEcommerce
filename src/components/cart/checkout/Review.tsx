import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ShoppingCartItem } from "../../../types/ShoppingCart";
import { PaymentDetails, ShippingAddress } from "../../../types/Checkout";

interface ReviewProps {
  items: ShoppingCartItem[];
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
}

const Review = ({ items, shippingAddress, paymentDetails }: ReviewProps) => {
  const totalSum = items
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.title}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">
              ${(item.quantity * item.price).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem
          sx={{ py: 1, px: 0, display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h6" gutterBottom>
            Total
          </Typography>
          <Typography variant="body1">${totalSum}</Typography>
        </ListItem>
      </List>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </Typography>
          <Typography gutterBottom>
            {shippingAddress.address}, {shippingAddress.city},
            {shippingAddress.postalCode}, {shippingAddress.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          <Typography gutterBottom>
            Card Name: {paymentDetails.cardName}
          </Typography>
          <Typography gutterBottom>
            Card Number: {paymentDetails.cardNumber}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;

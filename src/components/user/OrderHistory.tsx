// src/components/user/OrderHistory.tsx
import React from "react";
import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";
import { Order } from "../../types/Order";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>
      {orders.length > 0 ? (
        orders.map((order) => (
          <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Order ID: {order.id}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>Total Price: ${order.totalPrice.toFixed(2)}</Typography>
            <Typography>
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.orderItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={item.productSnapshot?.imageUrls?.[0]}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body1">
                        {item.productSnapshot?.title}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Price: ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography>No orders found.</Typography>
      )}
    </Box>
  );
};

export default OrderHistory;

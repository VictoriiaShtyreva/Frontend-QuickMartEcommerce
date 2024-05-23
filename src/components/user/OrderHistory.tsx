// src/components/user/OrderHistory.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Pagination,
} from "@mui/material";
import { Order } from "../../types/Order";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { cancelOrder } from "../../redux/slices/orderSlice";
import { fetchUserById } from "../../redux/slices/usersSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ReviewCreateModal from "./ReviewCreateModal";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.users.user?.id);
  //Pagination
  const [page, setPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedOrders = orders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  const handleCancelOrder = async (orderId: string) => {
    try {
      await dispatch(cancelOrder(orderId)).unwrap();
      await dispatch(fetchUserById(userId!)).unwrap();
      toast.success("Order cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel order.");
    }
  };

  const handleCreateReview = (productId: string) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>
      {orders.length > 0 ? (
        <>
          {paginatedOrders.map((order) => (
            <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Typography>Status: {order.status}</Typography>
              <Typography>
                Total Price: ${order.totalPrice.toFixed(2)}
              </Typography>
              <Typography>
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {order.orderItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Box display="flex" alignItems="center">
                      <Link to={`/products/${item.productSnapshot?.productId}`}>
                        <Avatar
                          variant="rounded"
                          src={item.productSnapshot?.imageUrls?.[0]}
                          sx={{ width: 80, height: 80, mr: 2 }}
                        />
                      </Link>
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
                        {order.status === "Completed" && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              handleCreateReview(
                                item.productSnapshot?.productId
                              )
                            }
                            sx={{ mt: 2 }}
                          >
                            Create Review
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {order.status !== "Cancelled" &&
                order.status !== "Shipped" &&
                order.status !== "Completed" && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancelOrder(order.id)}
                    sx={{ mt: 2 }}
                  >
                    Cancel Order
                  </Button>
                )}
            </Paper>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="secondary"
            />
          </Box>
        </>
      ) : (
        <Typography>No orders found.</Typography>
      )}
      {/* Modal for create review */}
      {selectedProduct && (
        <ReviewCreateModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          productId={selectedProduct}
          userId={userId as string}
        />
      )}
    </Box>
  );
};

export default OrderHistory;

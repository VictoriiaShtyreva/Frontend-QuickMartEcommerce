// src/components/admin/OrdersListDashboard.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder,
  sortOrdersByDate,
  sortOrdersByTotalPrice,
} from "../../redux/slices/orderSlice";
import SearchForm from "../products/SearchForm";
import AdminSortingFilter from "./AdminSortingFilter";
import { toast } from "react-toastify";
import { QueryOptions } from "../../types/QueryOptions";
import { Order } from "../../types/Order";
import OrdersSorting from "../orders/OrdersSorting";

const OrdersListDashboard = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.filteredOrders);
  const totalOrders = useAppSelector((state) => state.orders.total);
  const [sortBy, setSortBy] = useState<string>("createdAtAsc");
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 20,
    }
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState("");

  // Query options
  const queryOptions: QueryOptions = useMemo(() => {
    const sortByField = sortBy.includes("createdAt") ? "byDate" : "byPrice";
    const sortOrder = sortBy.includes("Asc") ? "Ascending" : "Descending";
    return {
      page: pagination.page,
      pageSize: pagination.limit,
      sortBy: sortByField,
      sortOrder,
    };
  }, [pagination.page, pagination.limit, sortBy]);

  // Handle pagination
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      if (page <= Math.ceil(totalOrders / pagination.limit)) {
        setPagination({ ...pagination, page });
      }
    },
    [pagination, totalOrders]
  );

  const handleSortChange = useCallback(
    (event: SelectChangeEvent) => {
      const newSortBy = event.target.value as string;
      setSortBy(newSortBy);
      setPagination((prev) => ({ ...prev, page: 1 }));
      if (newSortBy.includes("createdAt")) {
        dispatch(sortOrdersByDate(newSortBy.includes("Asc") ? "asc" : "desc"));
      } else {
        dispatch(
          sortOrdersByTotalPrice(newSortBy.includes("Asc") ? "asc" : "desc")
        );
      }
    },
    [dispatch]
  );

  const handleDelete = (id: string) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this order?</p>
        <Button
          sx={{ mr: 1 }}
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(deleteOrder(id));
            toast.dismiss();
            dispatch(fetchAllOrders(queryOptions));
          }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => toast.dismiss()}
        >
          No
        </Button>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleOpenDialog = (order: Order | null) => {
    setSelectedOrder(order);
    setNewStatus(order ? order.status : "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setNewStatus("");
    setOpenDialog(false);
  };

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      dispatch(
        updateOrderStatus({
          orderId: selectedOrder.id,
          status: newStatus,
        })
      );
      handleCloseDialog();
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalOrders / pagination.limit);

  useEffect(() => {
    dispatch(fetchAllOrders(queryOptions));
  }, [dispatch, queryOptions]);

  return (
    <Box p={4} sx={{ minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          mb: 2,
        }}
      >
        <Grid item xs={12} md={4}>
          <OrdersSorting sortBy={sortBy} onChange={handleSortChange} />
        </Grid>
      </Box>
      {orders.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(order)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(order.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              variant="outlined"
              count={totalPages}
              page={pagination.page}
              onChange={handlePaginationChange}
              disabled={pagination.page >= totalPages}
            />
          </Box>
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No orders found.
        </Typography>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle>Update Order Status</DialogTitle>
          <IconButton
            onClick={handleCloseDialog}
            sx={{ mr: 2 }}
            color="secondary"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Select
            label="Status"
            variant="outlined"
            color="secondary"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as string)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {["Pending", "Completed", "Shipped", "Cancelled", "Processing"].map(
              (status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              )
            )}
          </Select>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            onClick={handleUpdateStatus}
            color="secondary"
            variant="contained"
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersListDashboard;

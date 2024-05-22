import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
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

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { QueryOptions } from "../../types/QueryOptions";
import {
  clearUsersSearch,
  deleteUser,
  getAllUsers,
  resetUserPassword,
  searchUsersByName,
  sortUsersByName,
  updateUserRole,
} from "../../redux/slices/usersSlice";
import { User } from "../../types/User";
import SearchForm from "../products/SearchForm";
import UserSortingFilter from "./UserSortingFilter";
import { toast } from "react-toastify";

const UserListDashboard = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.filteredUsers);
  const totalUsers = useAppSelector((state) => state.products.total);
  const [sortBy, setSortBy] = useState<string>("nameAsc");
  //Search by name state
  const [userInput, setUserInput] = useState("");
  // Pagination state
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 20 }
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const availableRoles = ["Admin", "Customer"];
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState({
    open: false,
    userId: "",
  });

  //Query options
  const queryOptions: QueryOptions = useMemo(() => {
    const sortByField = "byName";
    const sortOrder = sortBy.includes("Asc") ? "Ascending" : "Descending";
    return {
      page: pagination.page,
      pageSize: pagination.limit,
      sortBy: sortByField,
      sortOrder,
    };
  }, [pagination.page, pagination.limit, sortBy]);

  //Handle pagination
  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      if (page <= Math.ceil(totalUsers / pagination.limit)) {
        setPagination({ ...pagination, page });
      }
    },
    [pagination, totalUsers]
  );

  //Handle search product by name
  const handleSearch = (value: string) => {
    setUserInput(value);
    if (value.trim() === "") {
      dispatch(clearUsersSearch());
    } else {
      dispatch(searchUsersByName(value));
    }
  };

  const handleClear = () => {
    setUserInput("");
    dispatch(clearUsersSearch());
    //Fetch all products again to display them
    dispatch(getAllUsers(queryOptions));
  };

  const handleSortChange = useCallback(
    (event: SelectChangeEvent) => {
      const newSortBy = event.target.value as string;
      setSortBy(newSortBy);
      if (newSortBy.includes("name")) {
        dispatch(sortUsersByName(newSortBy.includes("Asc") ? "asc" : "desc"));
      }
      setPagination((prev) => ({ ...prev, page: 1 }));
    },
    [dispatch]
  );

  const handleDelete = (id: string) => {
    setDeleteConfirmationDialog({ open: true, userId: id });
  };

  const confirmDelete = () => {
    dispatch(deleteUser(deleteConfirmationDialog.userId)).then(() => {
      dispatch(getAllUsers(queryOptions));
      setDeleteConfirmationDialog({ open: false, userId: "" });
    });
  };

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setOpenDialog(false);
  };

  const handleUpdateRole = () => {
    if (selectedUser) {
      dispatch(updateUserRole({ id: selectedUser.id, role: newRole }));
      handleCloseDialog();
    }
  };

  const handleResetPassword = () => {
    if (selectedUser) {
      dispatch(resetUserPassword({ id: selectedUser.id, newPassword }));
      handleCloseDialog();
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / pagination.limit);

  //fetchAllProducts
  useEffect(() => {
    dispatch(getAllUsers(queryOptions));
  }, [dispatch, queryOptions]);

  return (
    <Box p={4} sx={{ minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        User Management
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
        <Box>
          <SearchForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </Box>
        <Grid item xs={12} md={4}>
          <UserSortingFilter sortBy={sortBy} onChange={handleSortChange} />
        </Grid>
      </Box>
      {users.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>User Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar variant="rounded" src={user.avatar as string} />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id)}>
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
          No users found.
        </Typography>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle>Update User</DialogTitle>
          <IconButton
            onClick={handleCloseDialog}
            sx={{ mr: 2 }}
            color="secondary"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography variant="h6">User Details</Typography>
              <Typography variant="body1">Name: {selectedUser.name}</Typography>
              <Typography variant="body1">
                Email: {selectedUser.email}
              </Typography>
              <Typography variant="body1">Role: {selectedUser.role}</Typography>
              <Select
                label="Role"
                variant="outlined"
                color="secondary"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as string)}
                fullWidth
                sx={{ mb: 2 }}
              >
                {availableRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="New Password"
                type="password"
                variant="outlined"
                color="secondary"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            onClick={handleUpdateRole}
            color="secondary"
            variant="contained"
          >
            Update Role
          </Button>
          <Button
            onClick={handleResetPassword}
            color="warning"
            variant="contained"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmationDialog.open}
        onClose={() => setDeleteConfirmationDialog({ open: false, userId: "" })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDeleteConfirmationDialog({ open: false, userId: "" })
            }
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserListDashboard;

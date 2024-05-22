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
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useAppSelector } from "../../hooks/useAppSelector";
import { QueryOptions } from "../../types/QueryOptions";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategoryByName,
  clearCategorySearch,
} from "../../redux/slices/categorySlice";
import { Category } from "../../types/Category";
import SearchForm from "../products/SearchForm";
import AdminSortingFilter from "./AdminSortingFilter";
import { toast } from "react-toastify";

const CategoriesListDashboard = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categories.filteredCategories
  );
  const totalCategories = useAppSelector((state) => state.categories.total);
  const [sortBy, setSortBy] = useState<string>("nameAsc");
  //Search by name state
  const [userInput, setUserInput] = useState("");
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 20,
    }
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);

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
      if (page <= Math.ceil(totalCategories / pagination.limit)) {
        setPagination({ ...pagination, page });
      }
    },
    [pagination, totalCategories]
  );

  //Handle search category by name
  const handleSearch = (value: string) => {
    setUserInput(value);
    if (value.trim() === "") {
      dispatch(clearCategorySearch());
    } else {
      dispatch(searchCategoryByName(value));
    }
  };

  const handleClear = () => {
    setUserInput("");
    dispatch(clearCategorySearch());
    dispatch(fetchAllCategories(queryOptions));
  };

  const handleSortChange = useCallback((event: SelectChangeEvent) => {
    const newSortBy = event.target.value as string;
    setSortBy(newSortBy);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleDelete = (id: string) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this category?</p>
        <Button
          sx={{ mr: 1 }}
          variant="contained"
          color="primary"
          onClick={async () => {
            await dispatch(deleteCategory(id));
            toast.dismiss();
            dispatch(fetchAllCategories(queryOptions));
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

  const handleOpenDialog = (category: Category | null) => {
    setSelectedCategory(category);
    setNewCategoryName(category ? category.name : "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCategory(null);
    setNewCategoryName("");
    setNewCategoryImage(null);
    setOpenDialog(false);
  };

  const handleCreateOrUpdateCategory = async () => {
    if (selectedCategory) {
      await dispatch(
        updateCategory({
          id: selectedCategory.id,
          updateData: {
            name: newCategoryName,
            image: newCategoryImage || undefined,
          },
        })
      );
    } else {
      await dispatch(
        createCategory({
          name: newCategoryName,
          image: newCategoryImage || undefined,
        })
      );
    }
    handleCloseDialog();
    dispatch(fetchAllCategories(queryOptions));
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCategories / pagination.limit);

  useEffect(() => {
    dispatch(fetchAllCategories(queryOptions));
  }, [dispatch, queryOptions]);

  return (
    <Box p={4} sx={{ minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Category Management
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
        <Button
          sx={{ mb: 2 }}
          variant="contained"
          color="secondary"
          onClick={() => handleOpenDialog(null)}
          startIcon={<AddIcon />}
        >
          Create Category
        </Button>
        <Box>
          <SearchForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </Box>
        <Grid item xs={12} md={4}>
          <AdminSortingFilter sortBy={sortBy} onChange={handleSortChange} />
        </Grid>
      </Box>
      {categories.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Category Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={category.image as string}
                      />
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(category)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(category.id)}>
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
          No categories found.
        </Typography>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle>
            {selectedCategory ? "Update Category" : "Create Category"}
          </DialogTitle>
          <IconButton
            onClick={handleCloseDialog}
            sx={{ mr: 2 }}
            color="secondary"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            color="secondary"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            color="success"
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setNewCategoryImage(e.target.files?.[0] || null)}
            />
          </Button>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            onClick={handleCreateOrUpdateCategory}
            color="secondary"
            variant="contained"
          >
            {selectedCategory ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesListDashboard;

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Avatar,
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useForm } from "react-hook-form";

import {
  fetchProductById,
  updateProduct,
} from "../../redux/slices/productSlice";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { Product, ProductDataForUpdate } from "../../types/Product";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchAllCategories } from "../../redux/slices/categorySlice";
import { QueryOptions } from "../../types/QueryOptions";
import { checkImageUrl } from "../../utils/checkImageUrl";
import { svgUrl } from "../../utils/svgUrl";
import { deleteProductImage } from "../../redux/slices/productImageSlice";

interface UpdateProductProps {
  product: Product;
  onClose: () => void;
}

const UpdateProduct = ({ product, onClose }: UpdateProductProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const { control, handleSubmit, reset } = useForm<ProductDataForUpdate>({
    defaultValues: {
      data: {
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        categoryId: product.categoryId || "",
        inventory: product.inventory || 0,
      },
      images: [],
    },
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [existingImages, setExistingImages] = useState(product.images || []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleFileDelete = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleExistingImageDelete = async (imageIndex: number) => {
    const image = existingImages[imageIndex];
    await dispatch(deleteProductImage(image.id));
    setExistingImages((prevImages) =>
      prevImages.filter((_, i) => i !== imageIndex)
    );
  };

  const onSubmit = async (data: ProductDataForUpdate) => {
    const category = categories.find((cat) => cat.name === selectedCategory);
    const updatedData = {
      ...data.data,
      categoryId: category?.id,
    };
    try {
      await dispatch(
        updateProduct({
          id: product.id,
          data: updatedData,
          images: selectedImages,
        })
      );
      toast.success("Product updated successfully");
      onClose();
      reset();
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const queryOptions: QueryOptions = {
        page: 1,
        pageSize: 50,
        sortBy: "byName",
        sortOrder: "Ascending",
      };
      await dispatch(fetchAllCategories(queryOptions));
    };

    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    const category = categories.find((cat) => cat.id === product.categoryId);
    setSelectedCategory(category?.name || "");
  }, [categories, product.categoryId]);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>Update Product</span>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Controller
                name="data.title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="data.description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    color="secondary"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="data.price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="data.categoryId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Category"
                    color="secondary"
                    fullWidth
                    variant="outlined"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="data.inventory"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Inventory"
                    type="number"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {selectedImages.length > 0 && (
                <Box mt={2}>
                  {selectedImages.map((file, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {file.name}
                      </Typography>
                      <IconButton
                        onClick={() => handleFileDelete(index)}
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Existing Images
              </Typography>
              {existingImages.length > 0 ? (
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {existingImages.map((image, index) => (
                    <Box key={index} position="relative">
                      <Avatar
                        variant="rounded"
                        src={checkImageUrl(image.url, svgUrl)}
                        sx={{ width: 100, height: 100 }}
                      />
                      <IconButton
                        onClick={() => handleExistingImageDelete(index)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">No existing images</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Update Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;

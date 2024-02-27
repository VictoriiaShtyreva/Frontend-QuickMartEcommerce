import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  InputLabel,
  Box,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

import { updateProduct } from "../../redux/slices/productSlice";
import { useAppDispatch } from "../../hooks/useAppDispach";
import uploadFilesService from "../../utils/uploadFilesService";
import { Product } from "../../types/Product";

interface UpdateProductProps {
  product: Product;
  onClose: () => void;
}

const UpdateProduct = ({ product, onClose }: UpdateProductProps) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    images: product.images,
    price: product.price,
    category: product.category.id,
  });

  const dispatch = useAppDispatch();
  const [fileInput, setFileInput] = useState<{ file: File[] }>({ file: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileInput({ file: Array.from(e.target.files) });
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const images: { file: File }[] = [];
      if (fileInput.file.length > 0) {
        fileInput.file.forEach((file) => {
          images.push({ file });
        });
      }
      const location = await uploadFilesService(images);
      //Check if location is not undefined before spreading
      const updatedImages = location ? [...location] : [];
      const updatedData = {
        data: {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          images: updatedImages,
        },
        id: product.id,
      };
      dispatch(updateProduct(updatedData));
      onClose();
      toast.success("Product updated successfully.");
    } catch (e) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Update Product</span>
        <Button
          onClick={handleClose}
          color="secondary"
          sx={{ minWidth: "0px" }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column", p: 2 }}
        >
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InputLabel id="avatar-label">Add images</InputLabel>
              <input
                multiple
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginLeft: 8 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProduct}
            >
              Update Product
            </Button>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;

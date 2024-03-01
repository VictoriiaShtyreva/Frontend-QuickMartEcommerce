import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

import { updateProduct } from "../../redux/slices/productSlice";
import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  FormDataValues,
  Product,
  ProductDataForUpdate,
} from "../../types/Product";

interface UpdateProductProps {
  product: Product;
  onClose: () => void;
}

const UpdateProduct = ({ product, onClose }: UpdateProductProps) => {
  const [formData, setFormData] = useState<FormDataValues>({
    title: product.title,
    description: product.description,
    price: product.price,
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      //Create an object to store only the updated fields
      const updatedData: ProductDataForUpdate = {
        id: product.id,
        data: {},
      };
      // Iterate through each field in formData
      for (const field in formData) {
        // Check if the formData value differs from the original product data
        if (
          formData[field as keyof FormDataValues] !==
          product[field as keyof Product]
        ) {
          updatedData.data[field] = formData[field];
        }
      }
      //Dispatch the updateProduct action only if there are updated fields
      //Check if updated fields in the updatedData object exist
      if (Object.keys(updatedData.data).length > 0) {
        dispatch(updateProduct(updatedData));
        onClose();
        toast.success("Product updated successfully.");
      } else {
        onClose();
        toast.info("No changes detected.");
      }
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
              multiline
              maxRows={4}
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

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { FormValues, NewProduct } from "../../types/Product";
import { createProduct } from "../../redux/slices/productSlice";
import uploadFilesService from "../../utils/uploadFilesService";

interface ProductCreateFormProps {
  open: boolean;
  onClose: () => void;
}

const ProductCreateForm = ({ open, onClose }: ProductCreateFormProps) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [fileInput, setFileInput] = useState<{ file: File[] }>({ file: [] });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileInput({ file: Array.from(e.target.files) });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const images: { file: File }[] = [];
      if (fileInput.file.length > 0) {
        fileInput.file.forEach((file) => {
          images.push({ file });
        });
      }
      const location = await uploadFilesService(images);
      const newProductData: NewProduct = {
        title: data.title,
        price: data.price,
        categoryId: data.categoryId,
        description: data.description,
        images: location as string[],
      };
      await dispatch(createProduct(newProductData));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            defaultValue="Title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
                required
                color="secondary"
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            defaultValue={0}
            rules={{
              required: "Price is required",
              pattern: { value: /^\d+$/, message: "Invalid price" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                required
                color="secondary"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue="Add your description of product"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                required
                color="secondary"
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="secondary"
        >
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreateForm;

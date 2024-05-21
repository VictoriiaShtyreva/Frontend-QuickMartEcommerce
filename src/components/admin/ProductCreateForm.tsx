import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { FormValues, NewProduct } from "../../types/Product";
import { createProduct } from "../../redux/slices/productSlice";
import uploadFilesService from "../../utils/uploadFilesService";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Category } from "../../types/Category";

interface ProductCreateFormProps {
  open: boolean;
  onClose: () => void;
}

const ProductCreateForm = ({ open, onClose }: ProductCreateFormProps) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const categories = useAppSelector<Category[]>(
    (state) => state.categories.categories
  );
  const defaultCategoryId = categories.length > 0 ? categories[0].id : "";

  const [fileInputs, setFileInputs] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).slice(0, 3);
      setFileInputs([...fileInputs, ...newFiles]);
    }
  };

  const handleFileDelete = (index: number) => {
    setFileInputs((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const images: { file: File }[] = [];
      if (fileInputs.length > 0) {
        fileInputs.forEach((file) => {
          images.push({ file });
        });
      }
      const location = await uploadFilesService(images);
      const newProductData: NewProduct = {
        title: data.title,
        price: data.price,
        categoryId: data.categoryId,
        description: data.description,
        images: data.images,
      };
      await dispatch(createProduct(newProductData));
      onClose();
      reset();
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Create Product</span>
        <IconButton
          onClick={onClose}
          color="secondary"
          sx={{ minWidth: "0px" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
          >
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{
                  required: "Title is required",
                  maxLength: {
                    value: 150,
                    message: "Title should not be more than 150 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Title should not be less than 3 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    fullWidth
                    required
                    color="info"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="price"
                control={control}
                defaultValue={0}
                rules={{
                  required: "Price is required",
                  pattern: { value: /^\d+$/, message: "Invalid price" },
                  max: {
                    value: 99999,
                    message: "Price should not be more than 99999",
                  },
                  min: {
                    value: 1,
                    message: "Price should not be less than 1",
                  },
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
                    color="info"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: "Description is required",
                  maxLength: {
                    value: 500,
                    message:
                      "Description should not be more than 500 characters",
                  },
                  minLength: {
                    value: 20,
                    message:
                      "Description should not be less than 20 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    fullWidth
                    required
                    multiline
                    maxRows={4}
                    color="info"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="categoryId"
                control={control}
                defaultValue={defaultCategoryId}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <TextField
                    select
                    {...field}
                    label="Category"
                    error={!!errors.categoryId}
                    helperText={errors.categoryId?.message}
                    fullWidth
                    required
                    color="info"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="images"
                control={control}
                rules={{
                  required: "Images is required",
                }}
                render={({ field }) => (
                  <>
                    <label htmlFor="upload-button">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Image
                      </Button>
                    </label>
                    <input
                      accept="image/*"
                      id="upload-button"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleFileChange(e);
                        field.onChange(e);
                      }}
                      multiple
                    />
                    {fileInputs.map((file, index) => (
                      <Grid
                        container
                        key={index}
                        alignItems="center"
                        sx={{ mt: 1 }}
                      >
                        <Grid item xs={2}>
                          <Avatar
                            variant="rounded"
                            src={URL.createObjectURL(file)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            value={file.name}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={() => handleFileDelete(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="info"
        >
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreateForm;

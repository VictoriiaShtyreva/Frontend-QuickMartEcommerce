import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import { Product } from "../../types/Product";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { deleteProduct } from "../../redux/slices/productSlice";
import UpdateProduct from "./UploadProduct";

interface ProductCardProps {
  product: Product;
}

const ProductAdminItem = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  //State for uploadProduct
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this product?</p>
        <Button
          sx={{ mr: 1 }}
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(deleteProduct(id));
            toast.dismiss();
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

  return (
    <>
      <Card
        key={product.id}
        sx={{ width: "100%", height: "100%", margin: "auto" }}
      >
        <CardContent>
          <CardMedia
            sx={{ height: 200, width: "100%" }}
            image={product.images[0]}
          />
        </CardContent>
        <CardContent>
          <Typography variant="body1">{product.id}</Typography>
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body1">{product.price}$</Typography>
        </CardContent>
        <Box style={{ marginTop: "auto" }}>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteProduct(product.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Box>
      </Card>
      {openDialog && (
        <UpdateProduct product={product} onClose={handleCloseDialog} />
      )}
    </>
  );
};

export default ProductAdminItem;

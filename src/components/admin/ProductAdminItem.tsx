import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <CardMedia
          sx={{ height: 200, width: "100%" }}
          image={product.images[0]}
        />
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              position: "absolute",
              top: "55%",
              left: "23%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            startIcon={<EditIcon />}
          >
            Update
          </Button>
          <Button
            sx={{
              position: "absolute",
              top: "10%",
              left: "75%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
            variant="contained"
            color="error"
            onClick={() => handleDeleteProduct(product.id)}
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardActions>
        <Box sx={{ p: 1 }}>
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body1">Price: {product.price}$</Typography>
        </Box>
      </Card>
      {openDialog && (
        <UpdateProduct product={product} onClose={handleCloseDialog} />
      )}
    </>
  );
};

export default ProductAdminItem;

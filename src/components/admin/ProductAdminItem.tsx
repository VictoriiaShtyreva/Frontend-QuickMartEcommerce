import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Product } from "../../types/Product";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { deleteProduct } from "../../redux/slices/productSlice";
import UpdateProduct from "./UploadProduct";
import { checkImageUrl } from "../../utils/checkImageUrl";
import { svgUrl } from "../../utils/svgUrl";

interface ProductCardProps {
  product: Product;
}

const ProductAdminItem = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //State for uploadProduct
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle delete product
  const handleDeleteProduct = (id: string) => {
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

  const firstImageUrl =
    product.images.length > 0
      ? checkImageUrl(product.images[0].url, svgUrl)
      : svgUrl;

  return (
    <>
      <TableRow
        key={product.id}
        sx={{ display: { xs: "block", sm: "table-row" } }}
      >
        <TableCell>
          <Avatar variant="rounded" src={firstImageUrl} />
        </TableCell>
        <TableCell>
          <Typography variant="body1">{product.title}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{product.price}$</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{product.inventory}</Typography>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              justifyContent: isMobile ? "space-between" : "space-around",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="info"
              onClick={handleOpenDialog}
              startIcon={<EditIcon />}
              sx={{ mb: isMobile ? 1 : 0 }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteProduct(product.id)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      {openDialog && (
        <UpdateProduct product={product} onClose={handleCloseDialog} />
      )}
    </>
  );
};

export default ProductAdminItem;

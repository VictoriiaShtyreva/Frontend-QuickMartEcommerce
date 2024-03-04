import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { memo } from "react";

import { Product } from "../../types/Product";
import { checkImageUrl } from "../../utils/checkImageUrl";
import { svgUrl } from "../../utils/svgUrl";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const images = product.images.map((image) => {
    const imageUrl = checkImageUrl(image, svgUrl);
    return imageUrl;
  });

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        margin: "auto",
        position: "relative",
      }}
    >
      <CardMedia
        image={images[0] as string}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          backgroundPosition: "center",
        }}
      />
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              color: "info.main",
              textAlign: "center",
              minHeight: 260,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "info.contrastText",
              }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "info.contrastText",
              }}
            >
              {product.price}$
            </Typography>
          </Box>
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "block",
                textAlign: "center",
                color: "info.contrastText",
              }}
            >
              Detail
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(ProductCard);

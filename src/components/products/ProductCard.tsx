import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
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
  const firstImageUrl =
    product.images.length > 0
      ? checkImageUrl(product.images[0].url, svgUrl)
      : svgUrl;

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
        image={firstImageUrl}
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
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
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
              <Chip label={product.title} color="primary" />
              <Typography
                variant="h6"
                sx={{
                  color: "info.contrastText",
                }}
              >
                {product.price}$
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default memo(ProductCard);

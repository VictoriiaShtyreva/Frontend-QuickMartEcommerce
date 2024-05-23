import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { ReactComponent as EmptyFavoriteProductSVG } from "../../images/EmptyFavoriteProduct.svg";

const EmptyFavoriteProduct = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <EmptyFavoriteProductSVG width={200} height={200} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">No favorites saved yet.</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">
          Check out what's trending and fill your favorites with goodies!
        </Typography>
        <Grid item textAlign={"center"}>
          <Button color="info" variant="contained" sx={{ mt: 2 }}>
            <Link to="/shop">
              <Typography sx={{ color: "primary.contrastText" }}>
                Discover Products
              </Typography>
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmptyFavoriteProduct;

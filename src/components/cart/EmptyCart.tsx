import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { ReactComponent as EmptyCartSVG } from "../../images/EmptyCart.svg";

const EmptyCart = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <EmptyCartSVG width={200} height={200} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">Your cart is empty.</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">
          Check out what's trending and fill your cart with goodies!
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

export default EmptyCart;

import { Grid, Typography } from "@mui/material";

import { ReactComponent as NoProductsFoundSVG } from "../../images/NoProductsFound.svg";

const EmptyProducts = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <NoProductsFoundSVG width={200} height={200} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">No products found.</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">
          This service is not available yet. Please try later again.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyProducts;

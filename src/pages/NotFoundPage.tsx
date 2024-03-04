import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { ReactComponent as NotFoundPageSVG } from "../images/NotFoundPage.svg";

const NotFoundPage = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{ minHeight: "100vh" }}
    >
      <Grid item>
        <NotFoundPageSVG width={200} height={200} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">Something went wrong</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">
          We're having some difficulties. Please try again
        </Typography>
        <Grid item textAlign={"center"}>
          <Button color="info" variant="contained" sx={{ mt: 2 }}>
            <Link to="/">
              <Typography sx={{ color: "primary.contrastText" }}>
                Try Again
              </Typography>
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;

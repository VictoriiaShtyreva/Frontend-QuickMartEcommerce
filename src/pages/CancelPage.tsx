import { Box, Typography, Link, Grid, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispach";
import { useEffect } from "react";
import { authenticateUser } from "../redux/slices/usersSlice";

const CancelPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 2,
        textAlign: "center", // Ensure center alignment for text on all devices
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "h5.fontSize", sm: "h4.fontSize" } }}
      >
        Order Canceled
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your order has been canceled. If you have any questions, please email
        <Link href="mailto:orders@example.com">orders@example.com</Link>
      </Typography>
      <Grid
        item
        xs={12}
        md={8}
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      >
        <img
          src={require("../images/cancel.png")}
          style={{ maxWidth: "50%", height: "auto" }}
          alt="Order canceled"
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button color="info" variant="contained">
          <RouterLink
            to="/shop"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography sx={{ color: "primary.contrastText" }}>
              Back to Shopping
            </Typography>
          </RouterLink>
        </Button>
      </Grid>
    </Box>
  );
};

export default CancelPage;

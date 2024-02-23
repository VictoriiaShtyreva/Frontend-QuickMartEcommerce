import { Box, Container, Grid, Link, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import GitHubIcon from "@mui/icons-material/GitHub";

import ScrollToTopButton from "./ScrollToTopButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const boxStyle = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box style={boxStyle}>
            <DoneIcon color="success" />
            <Typography variant="body2">Duties and Taxes Guaranteed</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box style={boxStyle}>
            <DoneIcon color="success" />
            <Typography variant="body2">Free Express Shipping</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box style={boxStyle}>
            <DoneIcon color="success" />
            <Typography variant="body2">Customer Love</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box style={boxStyle}>
            <DoneIcon color="success" />
            <Typography variant="body2">Easy Returns</Typography>
          </Box>
        </Grid>
      </Grid>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2">
            © {currentYear} | All rights reserved.
          </Typography>
        </Box>
        <ScrollToTopButton />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            href="https://github.com/VictoriiaShtyreva"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHubIcon />
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default Footer;

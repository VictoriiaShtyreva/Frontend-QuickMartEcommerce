import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { ReactComponent as LogoSVG } from "../../images/logo.svg";

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  //Styles using theme
  const headerStyle = {
    backgroundColor: theme.palette.primary.main,
  };

  const boxStyle = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <footer style={headerStyle}>
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
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign={{ xs: "center", sm: "left" }}>
              <LogoSVG />
              <Typography variant="body2">Company</Typography>
              <Typography variant="body2">Address line 1</Typography>
              <Typography variant="body2">Address line 2</Typography>
              <Typography variant="body2">hello@company.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
              Follow us :
            </Typography>
            <Box
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
              Pay with :
            </Typography>
            <Box
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Box
                component="img"
                src={require("../../images/klarna.png")}
                alt="Klarna"
                sx={{ width: "50px", marginRight: "10px" }}
              />
              <Box
                component="img"
                src={require("../../images/stripe.png")}
                alt="Stripe"
                sx={{ width: "50px", marginRight: "10px" }}
              />
              <Box
                component="img"
                src={require("../../images/visa.jpg")}
                alt="Visa"
                sx={{ width: "50px", marginRight: "10px" }}
              />
              <Box
                component="img"
                src={require("../../images/mastercard.png")}
                alt="MasterCard"
                sx={{ width: "50px", marginRight: "10px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
              Subscribe to our newsletter
            </Typography>
            <Box
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <TextField
                variant="outlined"
                placeholder="Email"
                size="small"
                sx={{ bgcolor: "#fff", borderRadius: "4px 0 0 4px" }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: "0 4px 4px 0" }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} justifyContent="space-between" mt={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
              Customer service
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Delivery and returns
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              FAQ
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Contact us
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
              Account
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Purchase history
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Log in
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Sign up
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
              Links
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Privacy policy
            </Typography>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Legal mentions
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4} pt={4} borderTop="1px solid #444">
          <Typography variant="body2">
            © {currentYear} - All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;

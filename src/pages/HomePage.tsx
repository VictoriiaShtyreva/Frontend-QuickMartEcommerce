import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import MostPurchasedProducts from "../components/products/MostPurchasedProducts";

const Home = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: "100%",
        display: "block",
        minHeight: "100vh",
        "@media (min-width: 600px)": {
          paddingLeft: 0,
          paddingRight: 0,
        },
        "@media (min-width: 1200px)": {
          maxWidth: 2000,
        },
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          backgroundColor: "#f0f0f0",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={require("../images/homepage.jpg")}
          alt="Good shopping."
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            zIndex: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            animation:
              "typing 2.5s steps(30, end), blink-caret 0.75s step-end infinite",
            "@keyframes typing": {
              from: { width: 0 },
              to: { width: "60%" },
            },
            "@keyframes blink-caret": {
              "from, to": { borderColor: "transparent" },
              "50%": { borderColor: "black" },
            },
            borderRight: "0.15em solid black",
          }}
        >
          It's all about you.
        </Typography>
        <Button color="primary" variant="contained" sx={{ mt: 2, zIndex: 1 }}>
          <Link to="/shop" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ color: "primary.contrastText" }}>
              Shop Now
            </Typography>
          </Link>
        </Button>
      </Box>
      <MostPurchasedProducts />
    </Container>
  );
};

export default Home;

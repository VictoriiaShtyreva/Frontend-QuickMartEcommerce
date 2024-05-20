import { Box, Typography, Button } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "400px",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        It's all about you.
      </Typography>
      <Button variant="contained" color="primary">
        Shop Now
      </Button>
    </Box>
  );
};

export default Home;

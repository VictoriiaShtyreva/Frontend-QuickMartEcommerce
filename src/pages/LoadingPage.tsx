import { CircularProgress, Container, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        textAlign: "center",
        marginTop: "50vh",
        transform: "translateY(-50%)",
      }}
    >
      <CircularProgress color="secondary" />
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Loading...
      </Typography>
    </Container>
  );
};

export default LoadingPage;

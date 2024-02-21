import { Box, Container, Link, Typography } from "@mui/material";
import ScrollToTopButton from "./ScrollToTopButton";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
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
        <Typography variant="body2" ml={2}>
          Made with ❤️ by
        </Typography>
        <Link
          href="https://www.linkedin.com/in/viktoriiashtyreva/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="none"
        >
          <Typography variant="body2" ml={1}>
            Viktoriia Shtyreva
          </Typography>
        </Link>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ScrollToTopButton />
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
  );
};

export default Footer;

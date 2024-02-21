import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import scrollToTop from "../../utils/scrollToTop";

const ScrollToTopButton = () => {
  return (
    <Button
      onClick={scrollToTop}
      variant="contained"
      color="primary"
      sx={{ mr: 3 }}
    >
      <ArrowUpwardIcon />
    </Button>
  );
};

export default ScrollToTopButton;

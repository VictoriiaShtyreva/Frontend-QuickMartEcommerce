import Button from "@mui/material/Button";

import scrollToTop from "../../utils/scrollToTop";

const ScrollToTopButton = () => {
  return (
    <Button
      onClick={scrollToTop}
      variant="contained"
      color="primary"
      sx={{ mr: 3 }}
    >
      Scroll to top
    </Button>
  );
};

export default ScrollToTopButton;

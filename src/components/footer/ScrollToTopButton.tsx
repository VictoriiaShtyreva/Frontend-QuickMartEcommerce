import Button from "@mui/material/Button";
import scrollToTop from "../../utils/scrollToTop";

const ScrollToTopButton = () => {
  return (
    <Button onClick={scrollToTop} variant="contained" color="primary">
      Scroll to Top
    </Button>
  );
};

export default ScrollToTopButton;

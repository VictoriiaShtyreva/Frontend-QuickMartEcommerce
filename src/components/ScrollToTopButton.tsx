import { Fab } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { useState, useEffect } from "react";
import scrollToTop from "../utils/scrollToTop";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fab
      color="primary"
      aria-label="scroll-to-top"
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        display: isVisible ? "block" : "none",
      }}
      onClick={scrollToTop}
    >
      <ArrowUpward />
    </Fab>
  );
};

export default ScrollToTopButton;

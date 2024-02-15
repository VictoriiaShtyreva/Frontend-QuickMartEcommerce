import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register the ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

const scrollToTop = () => {
  gsap.to(window, { duration: 0.5, scrollTo: { y: 0 }, ease: "power2.inOut" });
};

export default scrollToTop;

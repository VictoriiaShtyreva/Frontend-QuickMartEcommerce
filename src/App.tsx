import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMemo, useState, lazy, Suspense, useEffect } from "react";
import { createTheme, PaletteMode, Paper, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import ColorThemeContext from "./components/contextAPI/ColorThemeContext";
import customTheme from "./components/contextAPI/theme/customTheme";
import store from "./redux/store";
import ProtectedAdminRoute from "./components/ProtectedRoute";
import LoadingPage from "./pages/LoadingPage";

// Lazily load components
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const SingleProductPage = lazy(() => import("./pages/SingleProductPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Header = lazy(() => import("./components/header/Header"));
const ScrollToTopButton = lazy(() => import("./components/ScrollToTopButton"));

const App = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // After the transition delay, set transitioning to false
    const transitionTimeout = setTimeout(() => {
      setTransitioning(false);
    }, 300); // 300 milliseconds = 0.3 seconds

    return () => clearTimeout(transitionTimeout);
  }, [themeMode]);

  const colorThemeMode = () =>
    setThemeMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    );

  const theme = useMemo(() => createTheme(customTheme(themeMode)), [themeMode]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ColorThemeContext.Provider value={colorThemeMode}>
          <ThemeProvider theme={theme}>
            <Paper
              sx={{
                boxShadow: "none",
                transition: "background-color 0.3s ease",
                backgroundColor: transitioning
                  ? theme.palette.background.paper
                  : undefined,
              }}
            >
              <h1 style={{ display: "none" }}>Redux Toolkit</h1>
              <Header />
              <ToastContainer />
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/products/:id" element={<SingleProductPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/users/:id" element={<UserPage />} />
                  <Route path="/shopping-cart" element={<CartPage />} />
                  <Route
                    path="/admin-dashboard"
                    element={<ProtectedAdminRoute Component={AdminPage} />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              <Footer />
              <ScrollToTopButton />
            </Paper>
          </ThemeProvider>
        </ColorThemeContext.Provider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;

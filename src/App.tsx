import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMemo, useState, lazy, Suspense } from "react";
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
            <Paper sx={{ boxShadow: "none" }}>
              <h1 style={{ display: "none" }}>Redux Toolkit</h1>
              <Header />
              <ToastContainer />
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/products/:id" element={<SingleProductPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/user-profile/:id" element={<UserPage />} />
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

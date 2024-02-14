import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SingleProductPage from "./pages/SingleProductPage";
import ProductsPage from "./pages/ProductsPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import ColorThemeContext from "./components/contextAPI/ColorThemeContext";
import { useMemo, useState } from "react";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import customTheme from "./components/contextAPI/theme/customTheme";

//Define the routes using createBrowserRouter
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:id", element: <SingleProductPage /> },
  { path: "shopping-cart", element: <CartPage /> },
  { path: "user-profile", element: <UserPage /> },
  { path: "admin-dashboard", element: <AdminPage /> },
]);

const App = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const colorThemeMode = () =>
    setThemeMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    );

  const theme = useMemo(() => createTheme(customTheme(themeMode)), [themeMode]);

  return (
    <ColorThemeContext.Provider value={colorThemeMode}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorThemeContext.Provider>
  );
};

export default App;

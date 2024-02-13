import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SingleProductPage from "./pages/SingleProductPage";
import ProductsPage from "./pages/ProductsPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";

//Define the routes using createBrowserRouter
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:id", element: <SingleProductPage /> },
  { path: "shopping-cart", element: <CartPage /> },
  { path: "users-profile", element: <UserPage /> },
  { path: "admin-dashboard", element: <AdminPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

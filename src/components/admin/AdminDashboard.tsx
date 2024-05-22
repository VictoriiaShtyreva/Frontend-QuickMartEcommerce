import React, { useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import ProductListDashboard from "./ProductListDashboard";
import OrdersListDashboard from "./OrdersListDashboard";
import CategoriesListDashboard from "./CategoriesListDashboard";
import UserListDashboard from "./UserListDashboard";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("products");

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <List>
            <ListItem button onClick={() => setActiveSection("products")}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button onClick={() => setActiveSection("users")}>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={() => setActiveSection("categories")}>
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem button onClick={() => setActiveSection("orders")}>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 4, minHeight: "100vh", boxShadow: 0 }}>
            {activeSection === "products" && <ProductListDashboard />}
            {activeSection === "users" && <UserListDashboard />}
            {activeSection === "categories" && <CategoriesListDashboard />}
            {activeSection === "orders" && <OrdersListDashboard />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;

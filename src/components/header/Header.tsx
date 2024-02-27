import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
  Box,
  Tooltip,
  Avatar,
  useTheme,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ColorThemeContext from "../contextAPI/ColorThemeContext";
import { useAppDispatch } from "../../hooks/useAppDispach";
import { logout } from "../../redux/slices/usersSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const colorContext = useContext(ColorThemeContext);
  const theme = useTheme();
  const themeClickHandler = () => {
    if (colorContext) colorContext();
  };
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  //Cart
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //Styles using theme
  const headerStyle = {
    backgroundColor: theme.palette.primary.main,
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="sticky" style={headerStyle}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "primary.contrastText",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Link>
          {/* Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            {/* Menu Items */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/about-us">About Us</Link>
              </MenuItem>
            </Menu>
          </Box>
          {/* Logo */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "primary.contrastText",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" sx={{ mr: 2 }}>
              <Link to="/">
                <Typography sx={{ color: "primary.contrastText" }}>
                  Home
                </Typography>
              </Link>
            </Button>
            <Button color="inherit" sx={{ mr: 2 }}>
              <Link to="/about-us">
                <Typography sx={{ color: "primary.contrastText" }}>
                  About Us
                </Typography>
              </Link>
            </Button>
            {user?.role === "customer" && (
              <Link to="/shopping-cart">
                <IconButton aria-label="cart">
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
            )}
            {user?.role === "admin" && (
              <Button color="inherit" sx={{ mr: 2 }}>
                <Link to="/admin-dashboard">
                  <Typography sx={{ color: "primary.contrastText" }}>
                    Admin Dashboard
                  </Typography>
                </Link>
              </Button>
            )}
          </Box>
          {/* Theme Switch Button */}
          <IconButton
            onClick={themeClickHandler}
            aria-label="color theme switch"
            sx={{ mr: 2 }}
          >
            {theme.palette.mode === "light" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          {/* User Avatar and Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt={user.name} src={user.avatar} />
                ) : (
                  <Avatar alt="User" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user?.role === "customer" && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ display: { xs: "flex", md: "none" } }}
                >
                  <Link to="/shopping-cart">
                    <Typography sx={{ color: "primary.contrastText" }}>
                      Shopping Cart
                    </Typography>
                  </Link>
                </MenuItem>
              )}{" "}
              {user?.role === "admin" && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ display: { xs: "flex", md: "none" } }}
                >
                  <Link to="/admin-dashboard">
                    <Typography sx={{ color: "primary.contrastText" }}>
                      Admin Dashboard
                    </Typography>
                  </Link>
                </MenuItem>
              )}
              {user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={`/user-profile/${user.id}`}>
                    <Typography sx={{ color: "primary.contrastText" }}>
                      User Page
                    </Typography>
                  </Link>
                </MenuItem>
              )}
              {user ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/login">
                    <Typography sx={{ color: "primary.contrastText" }}>
                      Login
                    </Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

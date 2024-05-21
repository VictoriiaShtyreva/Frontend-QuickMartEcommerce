import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "../../hooks/useAppDispach";
import {
  fetchUserById,
  updateUser,
  updateUserPassword,
} from "../../redux/slices/usersSlice";
import { User } from "../../types/User";
import { useAppSelector } from "../../hooks/useAppSelector";
import ProductCard from "../products/ProductCard";
import { removeFavoriteProduct } from "../../redux/slices/productSlice";
import EmptyFavoriteProduct from "../products/EmptyFavoritesProducts";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "-1px",
      left: "-1px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserAccount = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const isAdmin = user?.role === "Admin";
  const favoriteProducts = useAppSelector(
    (state) => state.products.favoriteProducts
  );
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({
    ...user,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Handle for change password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  //Handle for change avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleAvatarDelete = () => {
    setAvatarFile(null);
  };

  //Handle form submission to update user data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData: Partial<User> = { id };
    if (updatedUserData.name) updateData.name = updatedUserData.name;
    if (updatedUserData.email) updateData.email = updatedUserData.email;
    if (avatarFile) updateData.avatar = avatarFile;

    // Dispatch update user action and wait for it to complete
    await dispatch(updateUser(updateData));

    if (newPassword) {
      await dispatch(updateUserPassword({ id, newPassword }));
    }

    // Re-fetch user data to update the page
    dispatch(fetchUserById(id));
    // Clear form fields
    setUpdatedUserData({ ...user });
    setNewPassword("");
    setAvatarFile(null);
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch]);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Paper
          sx={{
            p: 4,
            m: 4,
            border: "1px solid #ccc",
            borderRadius: 5,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                src={user?.avatar as string}
                alt={user?.name}
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
            </StyledBadge>
            <Typography variant="h5">{user?.name}</Typography>
            {isAdmin && (
              <Typography variant="body2">Role: {user?.role}</Typography>
            )}
            <Typography variant="body2">Email: {user?.email}</Typography>
          </Grid>
        </Paper>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
                color="secondary"
              />
            }
            label="Edit Info"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={updatedUserData.email}
                    onChange={handleInputChange}
                    fullWidth
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={updatedUserData.name}
                    onChange={handleInputChange}
                    fullWidth
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    fullWidth
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    fullWidth
                  >
                    Upload Avatar
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </Button>
                  {avatarFile && (
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {avatarFile.name}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={handleAvatarDelete}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit">
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <Typography variant="body2">
              Click "Edit Info" to update your details.
            </Typography>
          )}
        </Grid>
        {!isAdmin && (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              Favorite Products
            </Typography>
            {favoriteProducts.length > 0 ? (
              <Grid container spacing={2}>
                {favoriteProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={product.id}
                    sx={{ mb: 5, width: "100%", height: "100%" }}
                  >
                    <ProductCard product={product} />
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() =>
                        dispatch(removeFavoriteProduct(product.id))
                      }
                      sx={{ mt: 1 }}
                    >
                      Remove
                    </Button>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyFavoriteProduct />
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default UserAccount;

import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useSelector } from "react-redux";
import { AppState } from "../../types/type";
import { fetchUserById, updateUser } from "../../redux/slices/usersSlice";
import { User } from "../../types/User";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
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

const UserAccount = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) =>
    state.users.users.find((user) => user.id === id)
  );
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({
    //State for updated user data
    ...user,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Handle form submission to update user data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(updatedUserData as User));
    setIsEditing(false);
  };

  useEffect(() => {
    //Fetch user data if it's not already loaded
    if (!user) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, user]);

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
                src={user?.avatar}
                alt={user?.name}
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
            </StyledBadge>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body2">Role: {user?.role}</Typography>
            <Typography variant="body2">Email: {user?.email}</Typography>
          </Grid>
        </Paper>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
              />
            }
            label="Edit Info"
          />
        </Grid>
        <Grid item xs={12}>
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
      </Grid>
    </Container>
  );
};

export default UserAccount;

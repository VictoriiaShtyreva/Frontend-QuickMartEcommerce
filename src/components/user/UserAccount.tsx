import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispach";
import { useSelector } from "react-redux";
import { AppState } from "../../types/type";
import { fetchUserById, updateUser } from "../../redux/slices/usersSlice";
import { User } from "../../types/User";

const UserAccount = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) =>
    state.users.users.find((user) => user.id === id)
  );

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
    <div>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {user?.name}
      </Typography>
      <Avatar
        src={user?.avatar}
        alt={user?.name}
        sx={{ mx: "auto", mb: 2, height: 80, width: 80 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isEditing}
              onChange={() => setIsEditing(!isEditing)}
            />
          }
          label="Edit Info"
        />
      </Box>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={updatedUserData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Name"
            name="name"
            value={updatedUserData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      ) : (
        <Typography variant="body2">
          Click "Edit Info" to update your details.
        </Typography>
      )}
      <p>Email: {user?.email}</p>
      <p>ID: {user?.id}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
};

export default UserAccount;

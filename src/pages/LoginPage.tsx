import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispach";
import { AppState } from "../types/type";
import { Authentication } from "../types/Authentication";
import { loginUser } from "../redux/slices/usersSlice";
import { useState } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Authentication>();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useSelector(
    (state: AppState) => state.users
  );
  const navigate = useNavigate();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Submit form for sign in
  const onSubmit: SubmitHandler<Authentication> = async ({
    email,
    password,
  }) => {
    try {
      await dispatch(loginUser({ email, password }));
      //Redirect to home or user profile depending on user data
      if (user) {
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-profile");
        }
      }
    } catch (err) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 2, margin: "0 auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Login your account
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
              error={!!errors.email}
              helperText={errors.email ? "Invalid email format" : null}
              fullWidth
              required
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password ? "Password is required" : null}
              fullWidth
              required
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  color="secondary"
                />
              }
              label="By using this form you agree with the storage and handling of your data by this website."
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Sign in"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;

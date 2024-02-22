import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch } from "../hooks/useAppDispach";
import { AppState } from "../types/type";
import { Authentication } from "../types/Authentication";
import { loginUser, registerUser } from "../redux/slices/usersSlice";
import { UserRegister } from "../types/User";
import RegistrationModal from "../components/user/RegisterUserModal";
import { useAppSelector } from "../hooks/useAppSelector";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Authentication>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: AppState) => state.users);
  const navigate = useNavigate();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //Submit form for sign in
  const onSubmit: SubmitHandler<Authentication> = async ({
    email,
    password,
  }) => {
    await dispatch(loginUser({ email, password }));
  };

  // Redirect to the appropriate page when user is logged in
  useEffect(() => {
    if (user) {
      if (user.role === "customer") {
        navigate(`/user-profile/${user.id}`);
      } else {
        navigate("/admin-dashboard");
      }
    }
  }, [user, navigate]);

  //Handle register for create account
  const handleRegister = async (data: UserRegister) => {
    await dispatch(registerUser(data));
    setShowModal(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 5,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Login your account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    required
                  />
                }
                label="By using this form you agree with the storage and handling of your data by this website."
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ width: "100%", maxWidth: "200px" }}
              >
                Sign in
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                style={{ maxWidth: "200px" }}
                onClick={() => setShowModal(true)}
                sx={{ width: "100%", maxWidth: "200px" }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </form>

        <RegistrationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onRegister={handleRegister}
        />
      </Paper>
    </Container>
  );
};

export default LoginPage;
function getAuthentication(token: string): any {
  throw new Error("Function not implemented.");
}

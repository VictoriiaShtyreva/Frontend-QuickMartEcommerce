import { SubmitHandler, useForm } from "react-hook-form";
import {
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch } from "../hooks/useAppDispach";
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
  const { user } = useAppSelector((state) => state.users);
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

  //Redirect to the appropriate page when user is logged in
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
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container mt={2} mb={3} direction={"column"} alignItems="center">
        <Grid item xs={6} md={8}>
          <img
            src={require("../images/loginpage.png")}
            width={400}
            height={400}
            alt="Men on bicycle"
          ></img>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Welcome to QuickMart!
          </Typography>
        </Grid>
      </Grid>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 4,
            border: "1px solid #ccc",
            borderRadius: 5,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Welcome back! Please login to your account.
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
                  color="info"
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
                <Typography variant="body1" gutterBottom>
                  Not registered yet?
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="info"
                  style={{ maxWidth: "200px" }}
                  onClick={() => setShowModal(true)}
                  sx={{ width: "100%", maxWidth: "200px" }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* Modal window for registration */}
          <RegistrationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onRegister={handleRegister}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;

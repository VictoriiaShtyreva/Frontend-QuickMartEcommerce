import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import { RegistrationFormData, UserRegister } from "../../types/User";
import { toast } from "react-toastify";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: UserRegister) => void;
}

const RegistrationModal = ({
  isOpen,
  onClose,
  onRegister,
}: RegistrationModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();
  const [fileInput, setFileInput] = useState<{ file: File[] }>({ file: [] });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileInput({ file: Array.from(e.target.files) });
    }
  };

  const handleFileDelete = () => {
    setFileInput({ file: [] });
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    const newUser: UserRegister = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: fileInput.file.length > 0 ? fileInput.file[0] : undefined,
      role: "Customer",
    };
    onRegister(newUser);
    toast.success(
      `Congratulations, ${newUser.name}! Your account has been successfully created.`
    );
    setTimeout(() => {
      onClose();
    }, 6000);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Create New Customer Account</span>
        <Button onClick={onClose} color="secondary" sx={{ minWidth: "0px" }}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
          >
            <Grid item xs={12}>
              <TextField
                label="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
                error={!!errors.email}
                helperText={
                  errors.email?.message ? "Invalid email format" : null
                }
                fullWidth
                required
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                {...register("name", { required: true })}
                error={!!errors.name}
                helperText={errors.name ? "Name is required" : null}
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="This field is required">
                  <InputLabel id="avatar-label">
                    Add Avatar <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                </Tooltip>
                <Button
                  component="label"
                  variant="contained"
                  color="secondary"
                  startIcon={<CloudUploadIcon />}
                  style={{ marginLeft: 8 }}
                >
                  Upload File
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </Button>
                {fileInput.file.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: 8,
                    }}
                  >
                    <Typography variant="h6">
                      {fileInput.file[0].name}
                    </Typography>
                    <Button
                      color="warning"
                      onClick={handleFileDelete}
                      size="small"
                      startIcon={<DeleteIcon />}
                      sx={{ alignItems: "stretch" }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="secondary">
                Create an Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;

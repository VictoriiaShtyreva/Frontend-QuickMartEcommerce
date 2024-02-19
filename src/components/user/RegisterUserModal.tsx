import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { UserRegister } from "../../types/User";
import uploadFilesService from "../../utils/uploadFilesService";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: UserRegister) => void;
}

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
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

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    const images: { file: File }[] = [];
    if (fileInput.file.length > 0) {
      fileInput.file.forEach((file) => {
        images.push({ file });
      });
    }
    const location = await uploadFilesService(images);
    const newUser: UserRegister = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: location[0] as string,
    };
    onRegister(newUser);
    //Close the modal after a delay
    setTimeout(() => {
      onClose();
    }, 6000);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          />
          <TextField
            label="Name"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name ? "Name is required" : null}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password ? "Password is required" : null}
            fullWidth
            required
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;

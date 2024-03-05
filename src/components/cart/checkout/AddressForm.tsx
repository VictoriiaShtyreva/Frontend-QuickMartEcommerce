import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface AddressFormProps {
  control: Control<FieldValues>;
  errors: any;
}

const AddressForm = ({ control, errors }: AddressFormProps) => {
  return (
    <Grid container spacing={2}>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="firstName"
                label="First Name"
                autoComplete="given-name"
                variant="standard"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                id="lastName"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: "Adress is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="address"
                name="address"
                label="Address line"
                autoComplete="shipping address-line"
                variant="standard"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="city"
                name="city"
                label="City"
                autoComplete="shipping address-level"
                variant="standard"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="postalCode"
            control={control}
            defaultValue=""
            rules={{ required: "Postal Code is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                autoComplete="shipping postal-code"
                variant="standard"
                fullWidth
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="country"
                name="country"
                label="Country"
                autoComplete="shipping country"
                variant="standard"
                fullWidth
                error={!!errors.country}
                helperText={errors.country?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddressForm;

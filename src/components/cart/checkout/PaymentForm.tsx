import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface PaymentFormProps {
  control: Control<FieldValues>;
  errors: any;
}

const PaymentForm = ({ control, errors }: PaymentFormProps) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="cardName"
            control={control}
            defaultValue=""
            rules={{ required: "Name on card is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="cardName"
                label="Name on card"
                autoComplete="cc-name"
                variant="standard"
                fullWidth
                error={!!errors.cardName}
                helperText={errors.cardName?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="cardNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Card number is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="expDate"
            control={control}
            defaultValue=""
            rules={{ required: "Expiry date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="expDate"
                label="Expiry date"
                autoComplete="cc-exp"
                variant="standard"
                fullWidth
                error={!!errors.expDate}
                helperText={errors.expDate?.message}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="cvv"
            control={control}
            defaultValue=""
            rules={{ required: "CVV is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="cvv"
                label="CVV"
                autoComplete="cc-csc"
                variant="standard"
                helperText="Last three digits on signature strip"
                fullWidth
                error={!!errors.firstName}
                color="secondary"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;

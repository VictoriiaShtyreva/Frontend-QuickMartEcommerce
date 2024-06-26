import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  PaletteMode,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../../hooks/useAppDispach";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  setStep,
  updateShippingAddress,
} from "../../../redux/slices/checkoutSlice";
import Review from "./Review";
import AddressForm from "./AddressForm";
import { ShippingAddress } from "../../../types/Checkout";
import { emptyCart } from "../../../redux/slices/cartSlice";
import customTheme from "../../contextAPI/theme/customTheme";
import { createOrder } from "../../../redux/slices/orderSlice";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  shippingAddress: ShippingAddress;
}

const CheckoutForm = ({
  isOpen,
  onClose,
  shippingAddress,
}: CheckoutModalProps) => {
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.checkout.step);
  const cartItems = useAppSelector((state) => state.cart.items);
  const userId = useAppSelector((state) => state.users.user?.id);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [themeMode] = useState<PaletteMode>("light");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleNext = () => {
    dispatch(setStep(step + 1));
  };

  const handleBack = () => {
    dispatch(setStep(step - 1));
    setOrderPlaced(false);
  };

  const handleReset = () => {
    setOrderPlaced(false);
    reset();
    dispatch(setStep(0));
  };

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  const onSubmit = async (data: any) => {
    if (step === 0) {
      dispatch(updateShippingAddress(data));
      handleNext();
    } else if (step === 1) {
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const orderCreateDto = {
        userId: userId!,
        orderItems,
        shippingAddress: data,
      };

      const response = await dispatch(createOrder(orderCreateDto));
      emptyCart();
      if (response.payload?.checkoutUrl) {
        window.location.href = response.payload.checkoutUrl;
      } else {
        toast.error("Failed to redirect to checkout. Please try again.");
      }
    }
  };

  const steps = ["Shipping address", "Review your order"];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm control={control} errors={errors} />;
      case 1:
        return <Review items={cartItems} shippingAddress={shippingAddress} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={customTheme(themeMode)}>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogContent>
          <Container maxWidth="sm">
            {orderPlaced ? (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order has been placed. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Box>
            ) : (
              <Box>
                <DialogActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h4">
                    Checkout
                  </Typography>
                  {!orderPlaced && (
                    <Button
                      onClick={onClose}
                      color="secondary"
                      sx={{ minWidth: "0px" }}
                    >
                      <CloseIcon />
                    </Button>
                  )}
                </DialogActions>
                <Stepper activeStep={step} sx={{ pt: 3, pb: 5 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {getStepContent(step)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {step !== 0 && (
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 3, ml: 1 }}
                        color="primary"
                        variant="contained"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      sx={{ mt: 3, ml: 1 }}
                      type="submit"
                      color="info"
                    >
                      {step === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </Box>
                </form>
              </Box>
            )}
          </Container>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default CheckoutForm;

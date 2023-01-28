import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";
import {addPaymentMethod} from '../../state/slices/cart/async';
import Meta from "../../components/Meta";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  Breadcrumbs,
  Link,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { ReactComponent as Banner } from "../../assets/images/payment.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm, FormProvider, Controller } from "react-hook-form";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useStyles } from "./style";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const methods = useForm();
  const navigate = useNavigate();
  const { handleSubmit, control } = methods;
  const { userInfo } = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if(!userInfo){
      navigate('/login?redirect=payment')
    }
    if (!shippingAddress.address) {
      navigate("/shipping");
    }  
    },[userInfo,shippingAddress])
 
  const submitHandler = ({ paymentMethod }) => {
    dispatch(addPaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Payment | FashionShop" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Home
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/payment">
              Payment
            </Link>
          </Breadcrumbs>
          <CheckoutSteps step={2} />
        </Grid>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={12} md={4} className={classes.payment}>
            <div>
              <Typography variant="h5" gutterBottom>
                Payment Methods
              </Typography>
              <FormProvider {...methods}>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <Controller
                    name="paymentMethod"
                    defaultValue={"PayPal"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl component="fieldset" error={error} fullWidth>
                        <FormLabel component="legend">Select method:</FormLabel>
                        <RadioGroup {...field}>
                          <FormControlLabel
                            value="PayPal"
                            control={<Radio />}
                            label="PayPal or Credit Card"
                          />
                          <FormControlLabel
                            value="Stripe"
                            control={<Radio />}
                            label="Stripe"
                          />
                        </RadioGroup>
                        {error && (
                          <FormHelperText style={{ maxWidth: 200 }}>
                            {error.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                    rules={{
                      required: "(*) Please choose payment methods",
                      validate: {
                        checkValue: (v) =>
                          v === "Stripe"
                            ? "Unfortunately, Stripe is not currently supported. We will add it soon!"
                            : true,
                      },
                    }}
                  />
                  <Button type="submit" variant="contained" color="secondary">
                    Next Step
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/shipping"
                    style={{ marginLeft: 8 }}
                  >
                    Back
                  </Button>
                </form>
              </FormProvider>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Banner className={classes.banner} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PaymentScreen;

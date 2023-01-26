import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { ReactComponent as Banner } from "../../assets/images/shipping.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {addShippingAddress} from '../../state/slices/cart/async'
import { useForm, FormProvider, Controller } from "react-hook-form";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CheckoutSteps from "../../components/CheckoutSteps";
import Meta from "../../components/Meta";
import { Input, useStyles } from "./style";

const ShippingScreen = () => {
  const classes = useStyles();
  const methods = useForm();
  const navigate = useNavigate();
  const { handleSubmit, control } = methods;
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const onSubmit = ({ address, city, postalCode, country }) => {
    dispatch(addShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=shipping`);
    }
  }, [userInfo, navigate]);

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Shipping | FashionShop" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Home
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/shipping">
              Shipping
            </Link>
          </Breadcrumbs>
          <CheckoutSteps step={1} />
        </Grid>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Shipping Address:
            </Typography>
            <FormProvider {...methods}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="address"
                  defaultValue={shippingAddress.address || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-address" color="secondary">
                        Address
                      </InputLabel>
                      <Input {...field} id="shipping-address" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Address is required" }}
                />
                <Controller
                  name="city"
                  defaultValue={shippingAddress.city || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-city" color="secondary">
                        City
                      </InputLabel>
                      <Input {...field} id="shipping-city" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) City is required" }}
                />
                <Controller
                  name="postalCode"
                  defaultValue={shippingAddress.postalCode || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-postalCode" color="secondary">
                        Postal Code
                      </InputLabel>
                      <Input {...field} id="shipping-postalCode" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Postal code is required" }}
                />
                <Controller
                  name="country"
                  defaultValue={shippingAddress.country || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-country" color="secondary">
                        Country
                      </InputLabel>
                      <Input {...field} id="shipping-country" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Country is required" }}
                />
                <Button type="submit" variant="contained" color="secondary">
                  Next Step
                </Button>
              </form>
            </FormProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Banner className={classes.banner} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShippingScreen;

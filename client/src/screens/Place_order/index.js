import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../state/slices/snackbar/index";
import {createOrder,calculateOrber} from '../../state/slices/orders/async';

import {
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  ListItemText,
  ListItem,
  List,
  ListItemIcon,
  Avatar,
  Box,
  Hidden,
  ListItemAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { GrLocation, GrCreditCard, GrProjects } from "react-icons/gr";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CheckoutSteps from "../../components/CheckoutSteps";
import Meta from "../../components/Meta";
import paypalImage from "../../assets/images/paypal.png";
import { useStyles } from "./style";
import OrderSummary from "./orderSummary";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  if (!cart.shippingAddress.address) {
    navigate("/shipping");
  } else if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const address = Object.values(cart.shippingAddress).join(", ");
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(openSnackbar("Order has been created successfully", "success"));
    }
    dispatch(calculateOrber())
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(createOrder());
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Place Order | FashionShop" />
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
              Place Order
            </Link>
          </Breadcrumbs>
          <CheckoutSteps step={3} />
        </Grid>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Grid container spacing={8}>
          <Grid item xs={12} lg={8}>
            <List>
              <ListItem divider>
                <ListItemIcon>
                  <GrLocation
                    fontSize={22}
                    color="textPrimary"
                    className={classes.icon}
                  />
                </ListItemIcon>
                <ListItemText primary="Shipping" secondary={address} />
              </ListItem>
              <ListItem divider>
                <ListItemIcon>
                  <GrCreditCard fontSize={22} className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary="Payment Method"
                  secondary={cart.paymentMethod}
                />
                <ListItemAvatar>
                  <img src={paypalImage} alt="" width="80px" height="30px" />
                </ListItemAvatar>
              </ListItem>
              <ListItem className={classes.orderItems}>
                <ListItemIcon>
                  <GrProjects fontSize={22} className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Order Items" />
                {cart.cartItems.length > 0 ? (
                  <div className={classes.items}>
                    <TableContainer component={Paper} elevation={0}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell color="textPrimary">Products</TableCell>
                            <Hidden smDown>
                              <TableCell align="right">Size</TableCell>
                              <TableCell align="right">Price</TableCell>
                            </Hidden>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cart.cartItems.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell component="th" scope="item">
                                <ListItem disableGutters>
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="square"
                                      src={item.images && item.images[0]}
                                      alt="product image"
                                      className={classes.largeImage}
                                    ></Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={item.name}
                                    className={classes.itemName}
                                    style={{ marginLeft: 16 }}
                                  />
                                </ListItem>
                                <Hidden mdUp>
                                  <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt={2}
                                  >
                                    <Box textAlign="center">
                                      Size: {item.sizeSelected.toUpperCase()}
                                    </Box>
                                    <Box textAlign="center">
                                      {`${item.qty} x ${item.priceSale} = ${
                                        item.qty * item.priceSale
                                      }`}
                                    </Box>
                                  </Box>
                                </Hidden>
                              </TableCell>
                              <Hidden smDown>
                                <TableCell align="right">
                                  {item.sizeSelected.toUpperCase()}
                                </TableCell>
                                <TableCell align="right">
                                  {`${item.qty} x $${item.priceSale} = $${
                                    item.qty * item.priceSale
                                  }`}
                                </TableCell>
                              </Hidden>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : (
                  <div className={classes.empty}>
                    <Typography variant="subtitle1" color="secondary">
                      Your cart is empty.{" "}
                      <Link to="/" component={RouterLink} color="primary">
                        Shopping now!
                      </Link>
                    </Typography>
                  </div>
                )}
              </ListItem>
            </List>
          </Grid>
        <OrderSummary error={error} placeOrderHandler={placeOrderHandler}/>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PlaceOrderScreen;

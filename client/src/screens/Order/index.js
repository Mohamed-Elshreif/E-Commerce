import React, { useState, useEffect,useMemo } from "react";
import axios from "axios";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../../state/slices/orders/async";
import { deliverOrder } from "../../state/slices/admin/allOrders/async";
import { orderDeliverRest } from "../../state/slices/admin/allOrders/index";
import { orderPayRest } from "../../state/slices/orders/index";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
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
  Button,
} from "@material-ui/core";
import { GrLocation, GrCreditCard, GrProjects, GrUser } from "react-icons/gr";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Meta from "../../components/Meta";
import paypalImage from "../../assets/images/paypal.png";
import { useStyles } from "./style";

const OrderScreen = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    const itemsPrice = useMemo(() => addDecimals(
      order?.orderItems?.reduce(
        (acc, item) => acc + item.priceSale * item.qty,
        0
      )
    )
  ,[order?.orderItems])

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${process.env.REACT_APP_API_URL}/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver || order._id !== id) {
      dispatch(getOrderDetails({ id }));
      dispatch(orderPayRest());
      dispatch(orderDeliverRest());
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, navigate, id, successPay, successDeliver, order, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder({ orderId, paymentResult }));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder({ orderId }));
  };

  return loading ? (
  <Loader my={200} /> 
  ) : error ? (
    <Message mt={100}>{error}</Message>
  ) : (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Order | FashionShop" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Home
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/order">
              Order Details
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Grid container spacing={8}>
          <Grid item xs={12} lg={8}>
            <List>
              <ListItem divider>
                <ListItemText
                  primary={`Order`}
                  secondary={`id: ${order?._id}`}
                />
              </ListItem>
              <ListItem divider>
                <ListItemIcon>
                  <GrUser fontSize={22} className={classes.icon}/>
                </ListItemIcon>
                <ListItemText
                  primary="Receiver"
                  secondary={`${order && order.user.name}, email: ${order &&  order.user.email}`}
                />
              </ListItem>
              <ListItem divider style={{ flexWrap: "wrap" }}>
                <ListItemIcon>
                  <GrLocation fontSize={22} className={classes.icon}/>
                </ListItemIcon>
                <ListItemText
                  primary="Shipping"
                  secondary={order && Object.values(order.shippingAddress).join(", ")}
                />
                {order && order.isDelivered ? (
                  <Message severity="success" mt={8}>
                    Delivered on {order && new Date(order.deliveredAt).toUTCString()}
                  </Message>
                ) : (
                  <Message mt={8}>Not Delivered</Message>
                )}
              </ListItem>
              <ListItem divider style={{ flexWrap: "wrap" }}>
                <ListItemIcon>
                  <GrCreditCard fontSize={22} className={classes.icon}/>
                </ListItemIcon>
                <ListItemText
                  primary="Payment Method"
                  secondary={order?.paymentMethod}
                />
                <ListItemAvatar>
                  <img src={paypalImage} alt="" width="80px" height="30px" />
                </ListItemAvatar>
                {order &&  order.isPaid ? (
                  <Message severity="success" mt={8}>
                    Paid on {new Date(order?.paidAt).toUTCString()}
                  </Message>
                ) : (
                  <Message mt={8}>Not Paid</Message>
                )}
              </ListItem>
              <ListItem className={classes.orderItems}>
                <ListItemIcon>
                  <GrProjects fontSize={22} className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary="Order Items" />
                {order?.orderItems.length > 0 ? (
                  <div className={classes.items}>
                    <TableContainer component={Paper} elevation={0}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.cell}>Products</TableCell>
                            <Hidden smDown>
                              <TableCell align="right" className={classes.cell}>Size</TableCell>
                              <TableCell align="right" className={classes.cell}>Price</TableCell>
                            </Hidden>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.orderItems.map((item) => (
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
          <Grid item xs={12} lg={4}>
            <Paper elevation={0} className={classes.cartTotalWrapper}>
              <Typography variant="h4" style={{ fontSize: 23 }}>
                Order Summary
              </Typography>
              <Divider className={classes.divider} />
              <List style={{ padding: "10px 20px 20px" }}>
                <ListItem divider disableGutters>
                  <ListItemText primary="Items:" />
                  <Typography>${itemsPrice}</Typography>
                </ListItem>
                <ListItem divider disableGutters>
                  <ListItemText primary="Shipping:" />
                  <Typography>${order?.shippingPrice}</Typography>
                </ListItem>
                <ListItem divider disableGutters>
                  <ListItemText primary="Tax:" />
                  <Typography>${order?.taxPrice}</Typography>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Total:" />
                  <Typography color="secondary">${order?.totalPrice}</Typography>
                </ListItem>
              </List>
              {!order?.isPaid && (
                <Box fullwidth="true">
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                      style={{ width: "100%" }}
                    />
                  )}
                </Box>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order?.isPaid &&
                !order.isDelivered && (
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullwidth="true"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </Box>
                )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderScreen;

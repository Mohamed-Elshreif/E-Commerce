import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  Breadcrumbs,
  Link,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import updateProfile from '../../state/slices/updateProfile/async';
import usersDetails from '../../state/slices/userDetails/async';
import {listUserOrders} from '../../state/slices/orders/async'
import { openSnackbar } from "../../state/slices/snackbar/index";
import {userUpdateRest} from '../../state/slices/updateProfile/index'
import { useForm, FormProvider } from "react-hook-form";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { FaTimes } from "react-icons/fa";
import { StyledBadge, useStyles } from "./style";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import InputController from "../../components/InputController";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const ProfileScreen = () => {
  const classes = useStyles();
  const methods = useForm();
  const navigate = useNavigate();
  const { handleSubmit, getValues, setValue } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const { loading: loadingOrders, error: errorOrders, orders } = useSelector((state) => state.orderListMy);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || success) {
        dispatch(userUpdateRest());
        dispatch(usersDetails({id:"profile"}));
        dispatch(listUserOrders());
      } else {
        setValue("name", user?.name);
        setValue("email", user?.email);
      }
    }
  }, [dispatch, setValue, navigate, userInfo, user, success]);

  useEffect(() => {
    if (success) {
      dispatch(
        openSnackbar({message:"Profile has been updated successfully",variant: "success"})
      );
    }
  }, [dispatch, success]);

  const submitHandler = ({ name, email, password }) => {
    dispatch(updateProfile({ id: user?._id, name, email, password }));
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Profile" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Home
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/profile">
              Profile
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={3}>
          <Paper className={classes.paper} elevation={0}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message>{error}</Message>
            ) : (
              <>
                <Box className={classes.profile}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    
                    variant="dot"
                  >
                    <Avatar
                      src={`https://ui-avatars.com/api/?background=random&color=fff&name=${user?.name}`}
                      className={classes.largeAvatar}
                    />
                  </StyledBadge>
                  <Typography style={{ color: "rgba(0, 0, 0)" ,marginTop: 32}}>{user?.name}</Typography>
                  <Typography
                    variant="caption"
                    style={{ color: "rgba(0, 0, 0)" }}
                  >
                    {user?.email}
                  </Typography>
                </Box>
                <FormProvider {...methods}>
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <FormControl fullWidth style={{ marginBottom: 12 }}>
                      <InputController
                        name="name"
                        label="Name"
                        defaultValue={user?.name}
                        required
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: 12 }}>
                      <InputController
                        name="email"
                        label="Email"
                        defaultValue={user?.email}
                        required
                        rules={{
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: 12 }}>
                      <InputController
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        rules={{
                          minLength: {
                            value: 6,
                            message: "Password must be more than 6 characters",
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: 12 }}>
                      <InputController
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        label="Confirm Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(e) => e.preventDefault()}
                              >
                                {showPassword ? <VscEye /> : <VscEyeClosed />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        rules={{
                          validate: {
                            matchPassword: (value) =>
                              value !== getValues("password")
                                ? "Password do not match"
                                : true,
                          },
                        }}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      style={{ marginTop: 16 }}
                    >
                      Update Profile
                    </Button>
                  </form>
                </FormProvider>
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          <TableContainer
            component={Paper}
            className={classes.paper}
            elevation={0}
          >
            <Typography variant="h5">My Orders</Typography>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message>{errorOrders}</Message>
            ) : !orders.length ? (
              <Message mt={8} severity="info">
                No order has been made yet.{" "}
                <Link component={RouterLink} to="/">
                  Shop now!
                </Link>
              </Message>
            ) : (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Total&nbsp;($)</TableCell>
                    <TableCell align="right">Paid</TableCell>
                    <TableCell align="right">Deliverd</TableCell>
                    <TableCell align="right">Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell component="th" scope="order">
                        {order._id}
                      </TableCell>
                      <TableCell align="right">
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="right">{order.totalPrice}</TableCell>
                      <TableCell align="right">
                        {order.paidAt ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes color="red" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {order.deliveredAt ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes color="red" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          component={RouterLink}
                          to={`/order/${order._id}`}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileScreen;

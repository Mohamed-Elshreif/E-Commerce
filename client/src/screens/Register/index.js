import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import registerUser from "../../state/slices/register/async";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { ReactComponent as LoginImage } from "../../assets/images/login-illu.svg";
import { logout } from "../../state/slices/auth/index";
import Paper from "@material-ui/core/Paper";
import Logo from "../../components/logo";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import InputController from "../../components/InputController";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import { useStyles } from "./style";

const RegisterScreen = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();
  const { handleSubmit, getValues } = methods;

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const { redirect = "/login" } = queryString.parse(location.search);

  useEffect(() => {
    if (userInfo) {
      navigate(`/login?redirect=${redirect}`);
      dispatch(logout());
    }
  }, [dispatch, navigate, userInfo, redirect]);

  const submitHandler = ({ name, email, password }) => {
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <Paper className={classes.root} square>
      <Grid container component={Paper} className={classes.container}>
        <Grid item sm={12} md={6}>
          <Box className={classes.content}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<BiArrowBack />}
              className={classes.backIcon}
            />
            <Logo />
            <FormProvider {...methods}>
              <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
              >
                <FormControl fullWidth style={{ marginBottom: 16 }}>
                  <InputController name="name" label="Name" required />
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: 16 }}>
                  <InputController
                    name="email"
                    label="Email"
                    required
                    rules={{
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: 8 }}>
                  <InputController
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    required
                    rules={{
                      minLength: {
                        value: 6,
                        message: "Password must be more than 6 characters",
                      },
                    }}
                  />
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: 8 }}>
                  <InputController
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
                    required
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
                  Sign up
                </Button>
              </form>
            </FormProvider>
            <Box my={2}>
              Have an account?{" "}
              <Link
                component={RouterLink}
                color="textSecondary"
                to={`/login?redirect=${redirect}`}
              >
                Login
              </Link>
            </Box>
            <br /> {loading && <Loader my={0} />}
            {error && <Message mt={0}>{error}</Message>}
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item xs={6}>
            <LoginImage className={classes.image} />
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
};

export default RegisterScreen;

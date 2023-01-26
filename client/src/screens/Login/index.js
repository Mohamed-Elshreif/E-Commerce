import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginUser from '../../state/slices/auth/async';
import { ReactComponent as LoginImage } from "../../assets/images/login-illu.svg";
import logo from "../../assets/images/logo.png";
import Logo from '../../components/logo'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import InputController from "../../components/InputController";
import { useForm, FormProvider } from "react-hook-form";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import { useStyles } from "./style";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm();
  const { handleSubmit } = methods;

  const dispatch = useDispatch();
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const { redirect = "/" } = queryString.parse(location.search);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect,{replace:true});
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = ({ email, password }) => {
    dispatch(loginUser({email, password}));
  };

  return (
    <Paper className={classes.root} square>
      <Grid container component={Paper} className={classes.container}>
        <Grid item sm={12} md={6} className={classes.grid}>
          <Box className={classes.content}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<BiArrowBack />}
              className={classes.backIcon}
            />
            <Logo/>
            <FormProvider {...methods}>
              <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
              >
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
                    required
                    rules={{
                      minLength: {
                        value: 6,
                        message: "Password must be more than 6 characters",
                      },
                    }}
                  />
                </FormControl>
                <Box display="flex" justifyContent="flex-end" pb={3} pt={1}>
                  <Link
                    component={RouterLink}
                    color="textSecondary"
                    to="/forgot-pasword"
                  >
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Sign in
                </Button>
              </form>
            </FormProvider>
            <Box my={4}>
              New customer?{" "}
              <Link
                component={RouterLink}
                color="textSecondary"
                to={`/register?redirect=${redirect}`}
              >
                Create Account
              </Link>
            </Box>
            <br/>
            {loading && <Loader my={0} />}
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

export default LoginScreen;

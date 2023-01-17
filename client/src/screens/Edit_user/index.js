import React, { useEffect } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import updateUsers from '../../state/slices/admin/userUpdate/async';
import usersDetails from '../../state/slices/userDetails/async';
import {userUpdateRest} from '../../state/slices/admin/userUpdate/index';
import { openSnackbar } from "../../state/slices/snackbar/index";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  Container,
  FormControl,
  Button,
  Link,
  Box,
  Grid,
} from "@material-ui/core";
import { useStyles } from "./style";

const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control, setValue } = methods;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(userUpdateRest());
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(usersDetails({id}));
      } else {
        setValue("name", user.name, { shouldValidate: true });
        setValue("email", user.email, { shouldValidate: true });
        setValue("isAdmin", user.isAdmin);
      }
    }
  }, [dispatch, navigate, setValue, id, user, successUpdate]);

  useEffect(() => {
    if (successUpdate) {
      dispatch(openSnackbar("Update successful", "success"));
    } else if (errorUpdate) {
      dispatch(openSnackbar(errorUpdate, "error"));
    }
  }, [dispatch, successUpdate, errorUpdate]);

  const submitHandler = ({ name, email, isAdmin }) => {
    const user = {id, name, email, isAdmin}
    dispatch(updateUsers({ userId: id,user }));
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container justify="center">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Grid item xs={12} sm={6} component={Paper} className={classes.paper}>
            <div>
              <Typography
                variant="h5"
                component="h1"
                style={{ textAlign: "center" }}
              >
                Edit User
              </Typography>
              <Box display="flex" justifyContent="flex-start" mb={2}>
                <Link component={RouterLink} to="/admin/userlist">
                  Back
                </Link>
              </Box>
            </div>
            <form
              className={classes.form}
              onSubmit={handleSubmit(submitHandler)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <TextField
                      label="Name"
                      defaultValue=" "
                      {...field}
                      error={!!error}
                      helperText={error && error.message}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <TextField
                      label="Email"
                      defaultValue=" "
                      {...field}
                      error={!!error}
                      helperText={error && error.message}
                    />
                  </FormControl>
                )}
                rules={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
              <FormControl fullWidth style={{ marginBottom: 16 }}>
                <FormControlLabel
                  control={
                    <Controller
                      name="isAdmin"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <Checkbox
                          checked={!!value}
                          onChange={onChange}
                          {...field}
                        />
                      )}
                    />
                  }
                  label="Is Admin"
                />
              </FormControl>
              <Button type="submit" variant="contained" color="secondary">
                Update
              </Button>
              {loadingUpdate && <Loader />}
            </form>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default UserEditScreen;

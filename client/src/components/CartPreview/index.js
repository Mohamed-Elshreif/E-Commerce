import React from "react";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {removeFromCart} from '../../state/slices/cart/async'
import {cartOpenDrawer} from '../../state/slices/cart'
import emptyGif from "../../assets/images/cartEmpty.png";
import { Link as LinkRouter } from "react-router-dom";
import { useStyles } from "./style";

const CartPreview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {isOpen} = useSelector((state) => state.cartOpenDrawer);
  const { cartItems } = useSelector((state) => state.cart);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart({id}));
  };

  const onDrawerOpen = () => {
    dispatch(cartOpenDrawer(true));
  };

  const onDrawerClose = () => {
    dispatch(cartOpenDrawer(false));
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={onDrawerClose}
      onOpen={onDrawerOpen}
    >
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h5" component="h2" gutterBottom>
            Cart ({cartItems.length})
          </Typography>
          <IconButton color="secondary" onClick={onDrawerClose}>
            <ClearIcon />
          </IconButton>
        </div>
        <Divider variant="fullWidth" />
        {cartItems.length > 0 ? (
          <>
            <List className={classes.listProduct}>
              {cartItems.map((item) => (
                <ListItem divider disableGutters key={item.product}>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={item.images && item.images[0]}
                      alt="product image"
                      className={classes.large}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    style={{ marginLeft: 10 }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Divider variant="fullWidth" />
            <div className={classes.priceTotal}>
              <Typography variant="subtitle1" component="span">
                Total:
              </Typography>
              <Typography
                variant="subtitle1"
                component="span"
                color="secondary"
                style={{ fontWeight: 600, fontSize: 18 }}
              >
                $
                {cartItems
                  .reduce((acc, item) => acc + item.priceSale * item.qty  , 0)
                  .toFixed(2)}
              </Typography>
            </div>
            <Divider variant="fullWidth" />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={RouterLink}
              to="/cart"
              onClick={onDrawerClose}
              className={classes.button}
            >
              View Shopping Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.button}
              component={RouterLink}
              to="/shipping"
              onClick={onDrawerClose}
            >
              Checkout
            </Button>
          </>
        ) : (
          <div className={classes.empty}>
            <Typography variant="subtitle1" color="secondary">
              Your cart is empty.{" "}
              <Link
                to="/"
                component={LinkRouter}
                color="textPrimary"
                onClick={onDrawerClose}
              >
                Shopping now!
              </Link>
            </Typography>
            <img src={emptyGif} alt="empty" width="100%" />
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
};

export default CartPreview;

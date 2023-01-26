import {useSelector} from 'react-redux';
import {useStyles} from './style';
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  ListItemText,
  ListItem,
  List,
} from "@material-ui/core";
import Message from "../../../components/Message";

function OrderSummary({error,placeOrderHandler}) {
    const classes = useStyles();
    const {totalPrice,taxPrice,shippingPrice,itemsPrice,orderItems} = useSelector((state) => state.calcOrder.items);
    console.log(totalPrice,taxPrice,shippingPrice,itemsPrice,orderItems)
  return (
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
          <Typography>${shippingPrice}</Typography>
        </ListItem>
        <ListItem divider disableGutters>
          <ListItemText primary="Tax:" />
          <Typography>${taxPrice}</Typography>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Total:" />
          <Typography color="secondary">${totalPrice}</Typography>
        </ListItem>
      </List>
      {error && <Message mb={16}>{error}</Message>}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        disabled={orderItems.length === 0}
        onClick={placeOrderHandler}
      >
        Place Order
      </Button>
      <Button
        variant="contained"
        component={RouterLink}
        to="/payment"
        fullWidth
        style={{ marginTop: 16 }}
      >
        Back
      </Button>
    </Paper>
  </Grid>
  )
}

export default OrderSummary
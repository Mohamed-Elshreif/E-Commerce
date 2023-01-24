import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {listAllOrders} from '../../state/slices/admin/allOrders/async'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { BiCommentDetail } from "react-icons/bi";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Meta from "../../components/Meta";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useStyles } from "./style";

const OrderListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  let { loading, error, orders = [] } = orderList;
  orders = orders.map((order) => ({ ...order, id: order._id }));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "user",
      headerName: "User",
      width: 160,
      valueFormatter: (params) => params.row?.user?.name,
    },
    {
      field: "updatedAt",
      headerName: "Date",
      width: 180,
      valueFormatter: (params) => params.value?.substring(0, 10),
    },
    {
      field: "totalPrice",
      headerName: "Total",
      width: 160,
      type: "number",
    },
    {
      field: "isPaid",
      headerName: "Paid",
      width: 160,
      type: "boolean",
    },
    {
      field: "isDelivered",
      headerName: "Delivered",
      width: 160,
      type: "boolean",
    },
    {
      field: "detail",
      headerName: "Detail",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const id = params.getValue(params.id, "_id") || "";
        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<BiCommentDetail />}
            className={classes.button}
            component={RouterLink}
            to={`/order/${id}`}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Dashboard | Orders" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Home
            </Link>
            <Link color="inherit" component={RouterLink} to="/">
              Admin Dashboard
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/userlist">
              Orders
            </Link>
          </Breadcrumbs>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            Order Management
          </Typography>
        </Grid>
      </Grid>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Grid container>
          <Grid
            item
            xs={12}
            component={Paper}
            className={classes.dataGrid}
            elevation={0}
          >
            <DataGrid
              rows={orders}
              columns={columns}
              pageSize={10}
              autoHeight
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default OrderListScreen;

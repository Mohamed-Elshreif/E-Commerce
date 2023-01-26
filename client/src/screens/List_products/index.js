import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from '../../state/slices/products/async';

import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Box,
} from "@material-ui/core";
import { openSnackbar } from "../../state/slices/snackbar/index";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import {deleteProduct} from '../../state/slices/admin/productEdit/async';
import {createProductRest} from '../../state/slices/admin/productEdit/index';

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useStyles } from "./style";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Meta from "../../components/Meta";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  let { loading, error, products = [] } = productList;
  products = products.map((product) => ({ ...product, id: product._id }));

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "category",
      headerName: "Category",
      width: 160,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
    },
    {
      field: "sale",
      headerName: "Sale",
      width: 120,
      valueFormatter: (params) => `${params.value} %`,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const id = params.getValue(params.id, "_id") || "";
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AiOutlineEdit />}
              className={classes.button}
              component={RouterLink}
              to={`/admin/product/${id}/edit`}
            />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: 8 }}
              className={classes.button}
              startIcon={<AiOutlineDelete />}
              onClick={() => deleteHandler(id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(createProductRest());

    if (!userInfo || !userInfo.isAdmin) {
      Navigate("/login");
    }

    dispatch(getProducts({ keyword : "", pageNumber : "", option : "all" }));
  }, [dispatch, Navigate, userInfo, successDelete]);

  useEffect(() => {
    if (successDelete) {
      dispatch(openSnackbar("The product has been deleted", "success"));
    } else if (errorDelete) {
      dispatch(openSnackbar(errorDelete, "error"));
    }
  }, [dispatch, successDelete, errorDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct({id}));
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Dashboard | Products" />
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
              Products
            </Link>
          </Breadcrumbs>
          <div>
            <Typography
              variant="h5"
              component="h1"
              style={{ textAlign: "center",marginBottom:'30px' }}
            >
              Product Management
            </Typography>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AiOutlinePlus />}
                component={RouterLink}
                to="/admin/product/create"
              >
                Create Product
              </Button>
            </Box>
          </div>
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
              rows={products}
              columns={columns}
              pageSize={10}
              autoHeight
              components={{
                Toolbar: () => (
                  <GridToolbarContainer>
                    <GridToolbarExport color='secondary'/>
                  </GridToolbarContainer>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductListScreen;

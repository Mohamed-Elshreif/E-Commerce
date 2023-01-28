import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {listProductDetails} from '../../state/slices/productDetails/async'
import { Link as RouterLink, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {addToCart} from '../../state/slices/cart/async'
import { openSnackbar } from "../../state/slices/snackbar/index";
import Meta from "../../components/Meta";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  MenuItem,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { FiShoppingBag } from "react-icons/fi";
import { FaTags } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import ProductReview from "../../components/Product/ProductReview.js";
import ProductRelated from "../../components/Product/ProductRelated.js";
import ShareButtons from "../../components/ShareButtons";
import { useStyles } from "./style";

const ProductScreen = () => {
  const { handleSubmit, control } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const  { loading, error, product } = useSelector((state) => state.productDetails);

  const classes = useStyles(product);

  const addToCartHandler = ({ qty, size }) => {
    const link = {
      hasLink: true,
      to: "/cart",
      text: "View Cart",
    }

    dispatch(addToCart({id, qty, size}));
    dispatch(
      openSnackbar({message:"The product has been added to cart!", variant:"success", link})
    );
  };

  useEffect(() => {
    dispatch(listProductDetails({id}));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <>
      <Container maxWidth="xl" className={classes.wrapper}>
        {loading ? (
          <Loader my={200} />
        ) : error ? (
          <Message mt={100}>{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Grid container className={classes.breadcrumbsContainer}>
              <Grid item>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                  <Link color="inherit" component={RouterLink} to="/">
                    Home
                  </Link>
                  <Link color="inherit" component={RouterLink} to="/">
                    Product
                  </Link>
                  <Link
                    color="textPrimary"
                    component={RouterLink}
                    to={`/product/${product._id}`}
                  >
                    {product?.name || "Not found product"}
                  </Link>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} md={5}>
                <Carousel
                  showIndicators
                  showArrows
                  showThumbs
                  swipeable={false}
                  showStatus={false}
                  animationHandler="fade"
                  className="product-screen-carousel"
                >
                  {product.images?.map((image, i) => (
                    <div className="slide-product-image" key={i}>
                      {product.sale > 0 && (
                        <div
                          className={classes.sale}
                        >{`- ${product.sale}% `}</div>
                      )}
                      <img src={image} alt="" />
                    </div>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12} md={7} className={classes.productInfo}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography component="span" style={{ marginLeft: 5 }}>
                    {`(${product.numReviews} reviews) | `}
                  </Typography>
                  <Typography
                    component="span"
                    style={{ marginLeft: 5 }}
                    color={
                      product.countInStock > 0 ? "textPrimary" : "secondary"
                    }
                  >
                    {`Status: ${
                      product.countInStock > 0 ? "In Stock" : "Out of Stock"
                    }`}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  component="div"
                  className={classes.price}
                  gutterBottom
                >
                  {product.sale ? (
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="span"
                      className={classes.rootPrice}
                    >
                      ${Number(product.price).toFixed(2)}
                    </Typography>
                  ) : null}
                  {"  "}$
                  {Number(product.price * (1 - product.sale / 100)).toFixed(2)}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color="textPrimary"
                  className={classes.description}
                >
                  {product.description}
                </Typography>
                <form>
                  <FormControl
                    fullWidth
                    component="fieldset"
                    classes={{ root: classes.sizeFormControl }}
                  >
                    <FormLabel component="legend" className={classes.label}>
                      Size:
                    </FormLabel>
                    <Controller
                      name="size"
                      control={control}
                      defaultValue=""
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <RadioGroup
                            classes={{ root: classes.sizeFormGroup }}
                            {...field}
                          >
                            {product.size &&
                              Object.keys(product.size).map(
                                (value) =>
                                  product.size[value] > 0 && (
                                    <FormControlLabel
                                      value={value}
                                      control={<Radio />}
                                      label={value.toUpperCase()}
                                      key={value}
                                    />
                                  )
                              )}
                          </RadioGroup>
                          {error && (
                            <FormHelperText error>
                              {error.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                      rules={{ required: "Please select size!" }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" style={{ width: 250 }}>
                    <FormLabel
                      className={classes.label}
                      style={{ marginBottom: 16 }}
                    >
                      Quantity
                    </FormLabel>
                    <Controller
                      name="qty"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <TextField
                          select
                          label="Select quantity"
                          variant="outlined"
                          error={!product.countInStock}
                          helperText={!product.countInStock && "Out of stock"}
                          {...field}
                        >
                          {Array(product.countInStock)
                            .fill()
                            .map((item, index) => (
                              <MenuItem value={index + 1} key={index + 1}>
                                {index + 1}
                              </MenuItem>
                            ))}
                        </TextField>
                      )}
                    />
                  </FormControl>
                </form>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FiShoppingBag />}
                  className={classes.button}
                  disabled={product.countInStock === 0}
                  onClick={handleSubmit(addToCartHandler)}
                >
                  Add to Cart
                </Button>
                <Divider style={{ marginTop: 30 }} />
                <Box display="flex" alignItems="center" my={2}>
                  <Box
                    mr={1}
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    <FaTags />
                  </Box>
                  <Typography className={classes.label}>Tags:</Typography>
                  <Box ml={2}>
                    <Chip
                      size="small"
                      label={product.category}
                      style={{ marginRight: 8 }}
                    />
                    <Chip size="small" label={product.brand} />
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" my={2}>
                  <Box
                    mr={1}
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    <FaShareAlt />
                  </Box>
                  <Typography className={classes.label}>Share:</Typography>
                  <Box ml={1}>
                    <div className={classes.socialGroup}>
                      <ShareButtons url="https://cybershop-v1.herokuapp.com/product/60b7a25e04e1647ea01d5eaf" />
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ProductReview reviews={product.reviews} productId={id} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ProductRelated category={product.category} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;

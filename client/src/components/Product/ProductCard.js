import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { RiShoppingBag3Fill } from "react-icons/ri";
import Tooltip from "@material-ui/core/Tooltip";
import ProductModalView from "./ProductModalView";
import { Button, CardActionArea, Hidden, IconButton } from "@material-ui/core";
import { addToCart } from "../../state/slices/cart/async";
import { cartOpenDrawer } from "../../state/slices/cart/index";
import { LazyLoadImage,LazyLoadComponent  } from 'react-lazy-load-image-component';
import { useDispatch } from "react-redux";
import { useCartStyles } from "./style";

const ProductCard = (props) => {
  const { _id, name, images, price, sale } = props;
  const [openModal, setOpenModal] = useState(false);
  const classes = useCartStyles(props);
  const dispatch = useDispatch();

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    dispatch(addToCart({ id: id, gty: 1, size: "m" }));
  };
  const handleOpenQuickView = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <LazyLoadComponent >
      <Card className={classes.root}>
        <CardActionArea component={RouterLink} to={`/product/${_id}`}>
          <div className={classes.mediaWrapper}>
            {sale > 0 && <div className={classes.sale}>{`- ${sale}% `}</div>}

            <Hidden smDown>
              <div className={classes.groupAction}>
                <Tooltip title="Quick views" placement="right-start" arrow>
                  <IconButton onClick={handleOpenQuickView}>
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add to cart" placement="right" arrow>
                  <IconButton onClick={(e) => handleAddToCart(e, _id)}>
                    <AddShoppingCartOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Hidden>
            <LazyLoadImage
              className={classes.media}
              alt={name}
              src={images && images[1]}
            />
            <LazyLoadImage
              className={clsx(classes.media, classes.mediaFront)}
              alt={name}
              src={images && images[0]}
            />
          </div>
          <CardContent component="div" style={{ paddingBottom: 10 }}>
            <Tooltip title={name || ""}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                noWrap
              >
                {name}
              </Typography>
            </Tooltip>
            <div className={classes.mediaMobile}>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                component="div"
                className={classes.price}
                noWrap
              >
                {sale ? (
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    component="span"
                    className={classes.rootPrice}
                  >
                    ${(price * 1).toFixed(2)}
                  </Typography>
                ) : null}
                {"  "}${(price * (1 - sale / 100)).toFixed(2)}
              </Typography>
              <Hidden mdUp>
                <Tooltip title="Add to cart" placement="bottom" arrow>
                  <Button
                    onClick={(e) => handleAddToCart(e, _id)}
                    color="secondary"
                    startIcon={<RiShoppingBag3Fill />}
                    style={{ whiteSpace: "nowrap"}}
                  >
                    Add to Cart
                  </Button>
                </Tooltip>
              </Hidden>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      <ProductModalView
        {...props}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </LazyLoadComponent>
  );
};

export default ProductCard;

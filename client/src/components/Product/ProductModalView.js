import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { IconButton, Modal, Typography, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ClearIcon from "@material-ui/icons/Clear";
import { useModelStyles } from "./style";

const ProductModalView = (props) => {
  const classes = useModelStyles();

  return (
    <Modal open={props.openModal} onClose={() => props.setOpenModal(false)}>
      <div className={classes.wrapper}>
        <IconButton
          color="secondary"
          onClick={() => props.setOpenModal(false)}
          className={classes.closeButton}
        >
          <ClearIcon />
        </IconButton>
        <div className={classes.imageWrapper}>
          <img
            className={classes.image}
            src={props.images && props.images[0]}
            alt={props.name}
          />
        </div>
        <div className={classes.content}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            style={{ fontSize: 26, fontWeight: 500 }}
          >
            {props.name}
          </Typography>
          <Rating
            name="read-only"
            value={props.rating || 0}
            precision={0.5}
            readOnly
          />
          <Typography
            variant="caption"
            component="p"
            paragraph
            style={{ fontSize: 14, paddingTop: 10, whiteSpace: "pre-wrap" }}
          >
            {props.description}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to={`/product/${props._id}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModalView;

import React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/slices/cart/async";
import { openSnackbar } from "../../state/slices/snackbar";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { AiOutlineSync } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import { useFormSelectStyles } from "./style";

const ProductFormSelect = ({ item, className }) => {
  const classes = useFormSelectStyles();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const updateCartHandler = (data, id) => {
    const {qty,size} = data
    dispatch(addToCart({id, qty, size}));
    dispatch(openSnackbar({message:"Item has been updated", variant:"success"}));
  };

  return (
    <form
      className={clsx(classes.root, className && className)}
      onSubmit={handleSubmit((data) => {
        updateCartHandler(data, item.product);
      })}
    >
      <FormControl variant="outlined" size="small">
        <InputLabel shrink id="size-select-label">
          Size
        </InputLabel>
        <Controller
          name="size"
          control={control}
          defaultValue={item.sizeSelected}
          render={({ field }) => (
            <Select {...field} label="Size" autoWidth>
              {Object.keys(item.size).map((value) =>
                item.size[value] > 0 ? (
                  <MenuItem value={value} key={value}>
                    {value.toUpperCase()}
                  </MenuItem>
                ) : null
              )}
            </Select>
          )}
        />
      </FormControl>
      <FormControl variant="outlined" size="small">
        <InputLabel shrink id="quantity-select-label">
          Qty
        </InputLabel>
        <Controller
          name="qty"
          control={control}
          defaultValue={item.qty}
          render={({ field }) => (
            <Select {...field} label="Qty" autoWidth>
              {Array(item.countInStock)
                .fill()
                .map((item, index) => (
                  <MenuItem value={index + 1} key={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<AiOutlineSync color="#fff" />}
        disableElevation
        
      >
        Update
      </Button>
    </form>
  );
};

export default ProductFormSelect;

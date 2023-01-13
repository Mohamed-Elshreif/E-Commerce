import React from "react";
import TextField from "@material-ui/core/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { useStyles } from "./style";

const InputController = ({
  type,
  name,
  label,
  defaultValue,
  required,
  rules,
  InputProps,
  ...props
}) => {
  const classes = useStyles();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type}
          label={label}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          InputProps={value ? InputProps : undefined}
          className={classes.root}
          {...props}
        />
      )}
      rules={{ required: required && `(*) ${label} is required`, ...rules }}
    />
  );
};

InputController.defaultProps = {
  type: "text",
};

export default InputController;

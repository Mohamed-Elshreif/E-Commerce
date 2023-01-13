import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    height: "100%",
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  title: {
    ...theme.mixins.customize.flexMixin("space-between", "center"),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(15),
  },
  listProduct: {
    overflowY: "auto",
    maxHeight: "60%",
    marginTop: 10,
    marginBottom: 10,
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.main,
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(245, 0, 87, 0.04)",
    },
    "& .MuiListItem-container:last-child > .MuiListItem-divider": {
      borderBottom: "none",
    },
  },
  priceTotal: {
    ...theme.mixins.customize.flexMixin("space-between", "center"),
    padding: "10px 0",
  },
  button: {
    margin: "10px 0",
    "& + $button": {
      marginTop: 2,
    },
  },
  empty: {
    ...theme.mixins.customize.centerFlex("column wrap"),
    marginTop: 30,
  },
}));

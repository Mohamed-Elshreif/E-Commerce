import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  productInfo: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0 !important",
    },
  },
  price: {
    fontSize: "1.6rem",
    fontWeight: 600,
    color: (props) => props.sale > 0 && "#f50057",
  },
  rootPrice: {
    fontSize: "1.3rem",
    textDecoration: "line-through",
  },
  description: {
    whiteSpace: "pre-wrap",
    fontSize: 15,
  },
  sizeFormControl: {
    margin: "25px 0 25px",
  },
  sizeFormGroup: {
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: 30,
    height: 48,
    width: 250,
    marginRight: 15,
  },
  socialGroup: {
    ...theme.mixins.customize.flexMixin("center", "center"),
  },
  socialIcon: {
    fontSize: 18,
    margin: "0 10px",
    color: "#929292",
    transition: "transform .3s",
    "&:hover": {
      transform: "translateY(-1px)",
      color: theme.palette.secondary.main,
    },
  },
  sale: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: "2px 8px",
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    textTransform: "uppercase",
    lineHeight: 1.5,
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
  },
}));

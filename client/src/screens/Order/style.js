import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    paddingBottom: 0,
  },
  content: {
    padding: 24,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: 32,
    },
  },
  orderItems: {
    flexWrap: "wrap",
    paddingRight: 0,
  },
  items: {
    flexBasis: "100%",
    marginLeft: 56,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
    "& .MuiTableCell-root": {
      paddingLeft: 0,
    },
    "& .MuiTableCell-head": {
      color: theme.palette.text.primary,
      fontWeight: 400,
    },
  },
  largeImage: {
    width: theme.spacing(6),
    height: theme.spacing(8),
  },
  empty: {
    ...theme.mixins.customize.centerFlex("column wrap"),
    marginTop: 30,
  },
  cartTotalWrapper: {
    marginTop: 22,
    padding: 20,
    fontSize: 16,
    backgroundColor: theme.palette.background.paper,
  },
  cartTotal: {
    fontSize: 18,
    marginBottom: 8,
    "&:nth-child(2)": {
      color: theme.palette.secondary.main,
    },
  },
  divider: {
    margin: "8px 0",
    width: 80,
    height: 2,
    backgroundColor: "#2a2a2a",
  },
  itemName: {
    ...theme.mixins.customize.textClamp(2),
  },
  icon: {
    "& path":{  stroke: theme.palette.secondary.main}
  },
  cell:{
    color : theme.palette.text.primary
  }
}));

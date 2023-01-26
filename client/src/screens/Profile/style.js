import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";

export const StyledBadge = withStyles((theme) => ({
  root: {
    position: "absolute",
    top: '-55%',
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    paddingBottom: 0,
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "flex-start",
    },
  },
  content: {
    padding: 24,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  paper: {
    // minHeight: 527,
    padding: 20,
    borderRadius: 10,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  profile: {
    position: "relative",
    ...theme.mixins.customize.flexMixin("center", "center", "column"),
    backgroundColor: "#F8F9FD",
    padding: 20,
    marginTop: theme.spacing(4),
    borderRadius: 10,
  },
  form: {
    padding: theme.spacing(2),
    "& .MuiInput-underline:before": {
      borderColor: "rgba(224, 224, 224, 1)",
    },
    "& .MuiInput-input": {
      fontFamily: "Poppins, sans-serif",
      fontSize: 13,
    },
  },
}));

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  content: {
    padding: "8px 32px",
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: 32,
    },
  },
  form: {
    marginTop: 16,
    "& > *": {
      marginBottom: 16,
    },
  },
  banner: {
    width: "100%",
    height: 380,
  },
  payment: {
    ...theme.mixins.customize.centerFlex(),
  },
}));

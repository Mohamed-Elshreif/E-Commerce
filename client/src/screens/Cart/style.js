import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  largeImage: {
    width: theme.spacing(12),
    height: theme.spacing(15),
  },
  cartTotalWrapper: {
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
  formControl: {
    marginRight: 24,
  },
  divider: {
    margin: "8px 0",
    width: 60,
    height: 2,
    backgroundColor: theme.palette.divider,
  },
}));

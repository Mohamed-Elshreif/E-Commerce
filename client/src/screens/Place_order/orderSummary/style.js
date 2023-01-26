import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  cartTotalWrapper: {
    marginTop: 22,
    padding: 20,
    fontSize: 16,
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    margin: "8px 0",
    width: 80,
    height: 2,
    backgroundColor: theme.palette.divider,
  }
}));

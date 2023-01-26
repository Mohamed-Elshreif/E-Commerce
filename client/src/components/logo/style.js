import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  logoWrapper: {
    flexBasis: "20%",
    maxWidth: "45%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    flexGrow: 1,
    maxWidth: 140,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 120,
      marginLeft: 16,
    },
  },
}));
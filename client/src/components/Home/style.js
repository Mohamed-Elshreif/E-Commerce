import { createTheme, makeStyles } from "@material-ui/core/styles";

export const theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 760, md: 960, lg: 1200, xl: 1400 },
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "60px 0 0",
    padding: "50px 0",
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
  },
  card: {
    minWidth: 275,
    textAlign: "center",
    border: "none",
    backgroundColor: theme.palette.background.paper,
  },
  topIcon: {
    width: 56,
    height: 56,
    marginBottom: 10,
    "& path": {
      fill: theme.palette.secondary.main,
    },
  },
}));

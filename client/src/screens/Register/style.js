import { makeStyles, createTheme } from "@material-ui/core/styles";
import backgroundImage from "../../assets/images/background.jpg";

export const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.customize.centerFlex(),
    height: "100vh",
    backgroundColor: theme.palette.background.default,
    fontFamily: "Poppins, sans-serif",
  },
  container: {
    height: "85vh",
    width: "70%",
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
    boxShadow: "0px 0px 25px -18px rgba(0,0,0,0.75)",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(227, 65, 85, 0.08)",
  },
  content: {
    position: "relative",
    ...theme.mixins.customize.flexMixin("flex-start", "center", "column"),
    padding: "24px 20%",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      padding: "24px 10%",
    },
  },
  form: {
    paddingTop: theme.spacing(1),
  },
  backIcon: {
    position: "absolute",
    top: 5,
    left: 0,
  },
  logo: {
    width: "120px",
    marginTop: 8,
  },
}));

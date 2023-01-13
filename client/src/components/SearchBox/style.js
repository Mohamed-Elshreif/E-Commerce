import { alpha, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.common.black
          : alpha(theme.palette.common.white, 1),
    },
    transition: "background .3s",
    marginLeft: 0,
    marginBottom: 28,
    marginTop: 18,
    border: "1px solid #DDDDDD",
    borderRadius: 4,
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
    overflow: "hidden",
    margin: (props) => props.role === "searchDrawer" && "30px 24px",
  },
  searchIcon: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    right: 0,
    padding: theme.spacing(0, 2),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#A3A2A2",
    zIndex: 1,
  },
  inputRoot: {
    color: "inherit",
    width: (props) => props.role === "searchDrawer" && "100%",
  },
  inputInput: {
    padding: "12px 50px 12px 0",
    paddingLeft: 20,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

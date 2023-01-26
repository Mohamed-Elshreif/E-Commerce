import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    transition: "all .2s",
    boxShadow: "0px 2px 8px -1px rgb(0 0 0 / 10%)",
    paddingRight: "0 !important",
  },
  menuButton: {
    display: "none",
    marginRight: theme.spacing(2),
    "@media(max-width: 740px)": {
      display: "block",
    },
  },
  logoWrapper: {
    flexBasis: "20%",
    maxWidth: "20%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
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
  navMenu: {
    flexBasis: "40%",
    maxWidth: "40%",
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      flexBasis: "unset",
      maxWidth: "unset",
    },
  },
  drawer: {
    width: 250,
  },
  navList: {
    display: "flex",
  },
  navListMobile: {
    width: "250px",
    marginTop: 50,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    "& .MuiListItem-root": {
      width: "100%",
      justifyContent: "center",
    },
  },
  sectionDesktop: {
    flexBasis: "40%",
    maxWidth: "40%",
    color: theme.palette.text.secondary,
    ...theme.mixins.customize.flexMixin("flex-end", "center"),
    [theme.breakpoints.down("sm")]: {
      flexBasis: "unset",
      maxWidth: "unset",
      flexGrow: 1,
    },
  },
  closeButton: {
    position: "fixed",
    top: 10,
    left: 20,
  },
  iconSVG: {
    fill: theme.palette.text.primary,
  }
}));

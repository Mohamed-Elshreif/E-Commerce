import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    maxWidth: "100%",
    paddingTop: 16,
    paddingBottom: 16,
    // '@media (max-width: 600px)': {
    //   paddingBottom: 16 + 56, // + height of BottomNavigation
    // },
  },
  box: {
    ...theme.mixins.customize.flexMixin("space-between", "center"),
    color: "#929292",
    "@media (max-width: 960px)": {
      textAlign: "center",
      flexDirection: "column",
      "& $copyright": {
        padding: "10px 0 0",
      },
    },
  },
  logoWrapper: {
    ...theme.mixins.customize.centerFlex(),
  },
  logo: {
    maxWidth: 140,
  },
  copyright: {
    flexGrow: 1,
    paddingLeft: 100,
  },
  socialGroup: {
    ...theme.mixins.customize.flexMixin("center", "center"),
  },
  icon: {
    fontSize: 18,
    margin: "0 10px",
    color: "#929292",
    transition: "transform .3s",
    "&:hover": {
      transform: "translateY(-1px)",
      color: theme.palette.secondary.main,
    },
  },
}));

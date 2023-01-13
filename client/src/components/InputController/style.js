import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    "& div::before": {
      borderBottom:
        theme.palette.type === "light"
          ? "1px solid rgba(0, 0, 0, 0.42)"
          : "1px solid #fff",
    },
    "& div::after": {
      borderBottom:
        theme.palette.type === "light" ? "2px solid #3f51b5" : "2px solid #fff",
    },
    "& input": {
      color: theme.palette.text.primary,
    },
    "& span": {
      color: theme.palette.text.secondary,
    },
    "& label": {
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
  },
}));

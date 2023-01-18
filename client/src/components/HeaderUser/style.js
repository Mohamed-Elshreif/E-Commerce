import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  iconSVG: {
    fill: theme.palette.type === 'light' ?  theme.palette.text.secondary : '#fff',
  }
}));

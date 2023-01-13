import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  stepper: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
    "& .MuiStepIcon-completed, .MuiStepIcon-active": {
      color: theme.palette.secondary.main,
    },
  },
}));

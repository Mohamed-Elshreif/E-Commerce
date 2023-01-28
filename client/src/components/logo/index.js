import logoLight from "../../assets/images/logo.png";
import logoDark from "../../assets/images/logo_dark.png";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./style";
import { Link } from "react-router-dom";

function Logo({position}) {
  const {
    palette: { type },
  } = useTheme();
  const classes = useStyles();

  return (
    <Link to="/" className={classes.logoWrapper}>
      <img
        src={type === "light" ? logoLight : logoDark}
        alt="logo"
        className={classes.logo}
      />
    </Link>
  );
}

export default Logo;

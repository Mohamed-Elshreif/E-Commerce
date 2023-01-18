import { ReactComponent as GoogleIcon } from "../../assets/icons/google.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import Button from "@material-ui/core/Button";
import { useStyles } from "./style";

function AuthThirdParty() {
  const classes = useStyles();
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#EA4335", color: "#fff" }}
        fullWidth
      >
        <GoogleIcon width={28} height={28} className={classes.iconSvg} />
        Google
      </Button>
      <br />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        style={{ backgroundColor: "#3B5998", color: "#fff" }}
      >
        <FacebookIcon width={27} height={27} className={classes.iconSvg} />
        facebook
      </Button>
    </>
  );
}

export default AuthThirdParty;

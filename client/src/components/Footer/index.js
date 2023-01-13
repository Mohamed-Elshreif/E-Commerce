import React from "react";
import { Container, IconButton, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import { VscTwitter } from "react-icons/vsc";
import { ImGooglePlus } from "react-icons/im";
import { RiRssFill, RiLinkedinFill, RiFacebookFill } from "react-icons/ri";
import { useStyles } from "./style";

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Container className={classes.root}>
        <div className={classes.box}>
          <Link to="/" className={classes.logoWrapper}>
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>
          <Typography
            variant="body2"
            component="p"
            className={classes.copyright}
          >
            Copyright &copy; {new Date().getFullYear()} Mohamed El-Shreif. All
            Right Reserved.
          </Typography>
          <div className={classes.socialGroup}>
            <IconButton className={classes.icon}>
              <RiFacebookFill />
            </IconButton>
            <IconButton className={classes.icon}>
              <VscTwitter />
            </IconButton>
            <IconButton className={classes.icon}>
              <RiRssFill />
            </IconButton>
            <IconButton className={classes.icon}>
              <ImGooglePlus fontSize={20} />
            </IconButton>
            <IconButton className={classes.icon}>
              <RiLinkedinFill />
            </IconButton>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

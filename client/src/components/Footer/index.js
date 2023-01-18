import React from "react";
import { Container, IconButton, Typography } from "@material-ui/core";
import { VscTwitter } from "react-icons/vsc";
import { ImGooglePlus } from "react-icons/im";
import { RiRssFill, RiLinkedinFill, RiFacebookFill } from "react-icons/ri";
import { useStyles } from "./style";
import Logo from "../logo";

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Container className={classes.root}>
        <div className={classes.box}>
     <Logo position='flex-start'/>
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

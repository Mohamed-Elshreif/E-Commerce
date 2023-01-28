import React from "react";
import ContentLoader from "react-content-loader";
import { makeStyles } from "@material-ui/core/styles";
import { calcOrder } from "../../state/slices";

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
    },
    media: {
        width:'100%',
        height:'calc(100% - 50px)',
    }
}))
const Placeholder = (props) => {
    const classes = useStyles();
  return (
    <ContentLoader
      speed={2}
      className={classes.root}
      viewBox="0 0 222 334"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="9" y="310" rx="3" ry="3" width="190" height="6" />
      <rect x="9" y="327" rx="3" ry="3" width="102" height="6" />
      <rect x="9" y="4" rx="0" ry="0"  className={classes.media}/>
    </ContentLoader>
  );
};

export default Placeholder;

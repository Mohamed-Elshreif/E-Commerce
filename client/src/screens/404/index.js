import { Button ,Box, Grid} from "@material-ui/core";
import notfound from '../../assets/images/not-found.png';
import {Link} from 'react-router-dom';
const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        flexDirection:'column',
        alignItems: "center",
      }}
    >
      <Grid container style={{ justifyContent: "center", alignItems: "center"}}>
        <Grid item xs={12} md={6}> <img src={notfound} alt='404' style={{width:'100%'}}/></Grid>
      </Grid>
        <Button variant="contained" color='secondary'>
          <Link to = '/' style={{color:'#fff',textDecoration:'none'}}>Back to home</Link>
        </Button>
    </Box>
  );
};

export default NotFound;
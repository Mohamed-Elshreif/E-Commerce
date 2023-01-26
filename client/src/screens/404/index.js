import { Button ,Box} from "@material-ui/core";
import notfound from '../../assets/images/not-found.png';
import {Link} from 'react-router-dom';
const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection:'column',
        alignItems: "center",
      }}
    >
      <Box>
        <img src={notfound} alt='404'/>
      </Box>
        <Button variant="contained" color='secondary'>
          <Link to = '/'>Back to home</Link>
        </Button>
    </Box>
  );
};

export default NotFound;
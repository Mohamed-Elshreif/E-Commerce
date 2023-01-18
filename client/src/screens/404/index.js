import { Button ,Box} from "@material-ui/core";
import notfound from '../../assets/images/not-found.png';

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
        <Button variant="contained" color='secondary'>Back to home</Button>
    </Box>
  );
};

export default NotFound;
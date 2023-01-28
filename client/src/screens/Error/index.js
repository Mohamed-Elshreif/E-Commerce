import { Button ,Box, Grid, Typography, makeStyles} from "@material-ui/core";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: 78,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom:theme.spacing(1),
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: 60,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 46,
    },
  },
}));

function ErrorPage() {
  const classes = useStyles()
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
      <Grid container style={{ justifyContent: "center", alignItems: "center"}} >
        <Grid item xs={12} md={6}><Typography className={classes.typography}>Oh Sorry</Typography></Grid>
      </Grid>
        <Button variant="contained" color='secondary'>
          <Link to = '/' style={{color:'#fff',textDecoration:'none'}}>Back to home</Link>
        </Button>
    </Box>
  )
}

export default ErrorPage
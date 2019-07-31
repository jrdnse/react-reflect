import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container fixed className={classes.container}>
      <CssBaseline />
      <h1>Landing</h1>
    </Container>
  );
};

export default LandingPage;

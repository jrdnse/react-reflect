import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { withAuthorization } from '../Session';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  }
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container fixed className={classes.container}>
      <CssBaseline />
      <h1>Home</h1>
      <h2>This page is accessible only by authenticated users.</h2>
    </Container>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);

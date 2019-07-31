import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { AuthUserContext, withAuthorization } from '../Session';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  }
}));

const AccountPage = () => {
  const classes = useStyles();

  return (
    <Container fixed className={classes.container}>
      <CssBaseline />
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {authUser.email}</h1>
          </div>
        )}
      </AuthUserContext.Consumer>
    </Container>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);

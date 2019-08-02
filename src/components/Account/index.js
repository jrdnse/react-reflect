import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PasswordChange from '../PasswordChange';
import DeleteUser from '../DeleteUser';

import { AuthUserContext, withAuthorization } from '../Session';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    marginTop: 80,
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
      <h1>Account</h1>
      <AuthUserContext.Consumer>
        {authUser => (
          <Container>
            <h3>
              E-mail: <br /> {authUser.email}
            </h3>
            <h3>
              Change Password: <br /> <PasswordChange />
            </h3>
            <h3>
              Delete user and all data: <br />
              <DeleteUser />
            </h3>
          </Container>
        )}
      </AuthUserContext.Consumer>
    </Container>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);

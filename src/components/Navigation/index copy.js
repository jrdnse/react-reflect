import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  linkMain: {
    textDecoration: 'none',
    color: 'white',
    marginRight: 'auto'
  }
}));

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#789CEB' }}>
          <Toolbar>
            <Link className={classes.linkMain} to={ROUTES.HOME}>
              <Typography variant="h6" className={classes.title}>
                React Reflect
              </Typography>
            </Link>
            <Link className={classes.link} to={ROUTES.ADD_CARD}>
              <Button color="inherit">Add Card</Button>
            </Link>
            <Link className={classes.link} to={ROUTES.CARDS}>
              <Button color="inherit">Cards</Button>
            </Link>
            <Link className={classes.link} to={ROUTES.ACCOUNT}>
              <Button color="inherit">Account</Button>
            </Link>
            <SignOutButton />
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

const NavigationNonAuth = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#789CEB' }}>
          <Toolbar>
            <Link className={classes.linkMain} to={ROUTES.LANDING}>
              <Typography variant="h6" className={classes.title}>
                React Reflect
              </Typography>
            </Link>
            <Link className={classes.link} to={ROUTES.SIGN_IN}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link className={classes.link} to={ROUTES.SIGN_UP}>
              <Button color="inherit">Sign Up</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

export default Navigation;

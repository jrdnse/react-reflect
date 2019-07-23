import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignOutButton from '../SignOut';

import { withFirebase } from '../Firebase';

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

const Navigation = ({ authUser }) => <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;

const NavigationAuth = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
          <Toolbar>
            <Link className={classes.linkMain} to={ROUTES.LANDING}>
              <Typography variant="h6" className={classes.title}>
                React Reflect
              </Typography>
            </Link>
            <Link className={classes.link} to={ROUTES.HOME}>
              <Button color="inherit">Home</Button>
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
        <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
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

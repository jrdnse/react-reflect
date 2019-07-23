import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Login from './Login';
import Register from './Register';
import { FirebaseContext } from '../Firebase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Reflect
          </Typography>
          <FirebaseContext.Consumer>
            {firebase => {
              return <Register btnClass={classes.button} firebase={firebase} />;
            }}
          </FirebaseContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

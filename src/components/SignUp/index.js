/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUp = () => (
  <div>
    <SignUpForm />
  </div>
);

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  container: {
    marginLeft: 240,
    marginTop: 80,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  }
}));

const SignUpFormBase = props => {
  const classes = useStyles();

  const { firebase } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [loading, setLoading] = useState(false);
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [advChecked, setAdvChecked] = useState(false);

  const handleClickShowPassword = () => {
    setPwdVisibility(!pwdVisibility);
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        firebase.user(authUser.user.uid).set({
          email
        });
      })
      .then(() => {
        setLoading(false);
        setEmail('');
        setPassword('');
        setPassword2('');
        props.enqueueSnackbar('Sign up successful! Redirecting you to the Homepage.', {
          variant: 'success'
        });
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        props.enqueueSnackbar(err.message, {
          variant: 'error'
        });
        setPassword('');
        setPassword2('');
        setLoading(false);
        props.history.push(ROUTES.SIGN_UP);
      });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Helmet>
        <title>RЯ :: Sign Up</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Sign Up</Typography>
        </Grid>
      </Grid>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={email}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type={pwdVisibility ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                      {pwdVisibility ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password2}
              variant="outlined"
              required
              fullWidth
              name="password2"
              label="Repeat Password"
              type={pwdVisibility ? 'text' : 'password'}
              id="password2"
              autoComplete="current-password"
              onChange={e => setPassword2(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={advChecked}
                  onChange={() => setAdvChecked(!advChecked)}
                  value={advChecked}
                  color="primary"
                />
              }
              label="I acknowledge that the project, in it's current state, doesn't have End-To-End encryption, which means that all the data(except the password) can be seen by the administrator Jordan ONLY. (P.S: Hi, Jordan here. Just wanted to give this heads up so you know that I can see the data even though I have no intention to do so.)"
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  loading ||
                  email === '' ||
                  password === '' ||
                  password2 === '' ||
                  password !== password2 ||
                  advChecked === false
                }
              >
                Sign Up
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="subtitle1">
              Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
  withSnackbar
)(SignUpFormBase);
export default SignUp;

SignUpFormBase.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired
};

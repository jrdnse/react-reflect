import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';
import { ForgotPasswordLink } from '../PasswordForget';

const SignIn = () => (
  <div>
    <SignInForm />
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

const SignInFormBase = props => {
  const classes = useStyles();

  const { firebase } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwdVisibility, setPwdVisibility] = useState(false);

  const handleClickShowPassword = () => {
    setPwdVisibility(!pwdVisibility);
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        setEmail('');
        setPassword('');
        setError('');
        console.log('user logged in!');
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
        setPassword('');
      });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Sign In</Typography>
          {error && <Typography variant="h6">{error.message}</Typography>}
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
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {pwdVisibility ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                Sign In
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
          <Grid item xs={12} align="center">
            <SignUpLink />
            <ForgotPasswordLink />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const SignInLink = () => (
  <Typography variant="subtitle1">
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </Typography>
);

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);
export default SignIn;

export { SignInForm, SignInLink };

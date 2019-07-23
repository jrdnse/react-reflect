import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';

const SignIn = () => (
  <div>
    <SignInForm />
  </div>
);

const SignInFormBase = props => {
  const { firebase } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError('');
        console.log('user logged in!');
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError(err);
        setPassword('');
      });
  };

  const isInvalid = password === '' || email === '';

  return (
    <Container maxWidth="sm">
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
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isInvalid} type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <SignUpLink />
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

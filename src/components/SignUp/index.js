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
import { SignInLink } from '../SignIn';

const SignUp = () => (
  <div>
    <SignUpForm />
  </div>
);

const SignUpFormBase = props => {
  const { firebase } = props;

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        setNickname('');
        setEmail('');
        setPassword('');
        setPassword2('');
        setError('');
        console.log('user registered!');
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError(err);
        setPassword('');
        setPassword2('');
      });
  };

  const isInvalid = password !== password2 || password === '' || email === '' || nickname === '';

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Sign Up</Typography>
          {error && <Typography variant="h6">{error.message}</Typography>}
        </Grid>
      </Grid>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={nickname}
              autoComplete="nname"
              name="nickname"
              variant="outlined"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              autoFocus
              onChange={e => setNickname(e.target.value)}
            />
          </Grid>
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
            <TextField
              value={password2}
              variant="outlined"
              required
              fullWidth
              name="password2"
              label="Repeat Password"
              type="password"
              id="password2"
              autoComplete="current-password"
              onChange={e => setPassword2(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isInvalid} type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <SignInLink />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const SignUpLink = () => (
  <Typography variant="subtitle1">
    Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Typography>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);
export default SignUp;

export { SignUpForm, SignUpLink };

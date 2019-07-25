import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

const SignUpFormBase = props => {
  const classes = useStyles();

  const { firebase } = props;

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        firebase.user(authUser.user.uid).set({
          nickname,
          email
        });
        console.log('database entry added');
      })
      .then(() => {
        setLoading(false);
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
        setLoading(false);
      });
  };

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
            <div className={classes.wrapper}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                Sign Up
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
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

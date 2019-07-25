import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';

const PasswordReset = () => (
  <div>
    <PasswordResetForm />
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

const PasswordResetFormBase = props => {
  const classes = useStyles();

  const { firebase } = props;

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);

    firebase
      .doPasswordReset(email)
      .then(() => {
        setLoading(false);
        setEmail('');
        setError('');
        console.log('user logged in!');
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Reset Password</Typography>
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
            <div className={classes.wrapper}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                Reset Password
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
          <Grid item xs={12} align="center">
            <SignUpLink />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const ForgotPasswordLink = () => (
  <Typography variant="subtitle1">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </Typography>
);

const PasswordResetForm = compose(
  withRouter,
  withFirebase
)(PasswordResetFormBase);

export default PasswordReset;

export { PasswordResetForm, ForgotPasswordLink };

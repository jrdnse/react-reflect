/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForget = () => (
  <div>
    <PasswordForgetForm />
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

const PasswordForgetFormBase = props => {
  const classes = useStyles();

  const { firebase } = props;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);

    firebase
      .doPasswordReset(email)
      .then(() => {
        setLoading(false);
        props.enqueueSnackbar(`A password reset link has been sent to ${email}`, {
          variant: 'success'
        });
        setEmail('');
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setLoading(false);
        props.enqueueSnackbar(err.message, {
          variant: 'error'
        });
      });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Reset Password</Typography>
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
            <Typography variant="subtitle1">
              Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const PasswordForgetForm = compose(
  withRouter,
  withFirebase,
  withSnackbar
)(PasswordForgetFormBase);

export default PasswordForget;

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired
};

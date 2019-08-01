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

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
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
      .doPasswordUpdate(password1)
      .then(() => {
        setLoading(false);
        setError('');
        setPassword1('');
        setPassword2('');
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {error && <Typography variant="h6">{error.message}</Typography>}
        </Grid>
      </Grid>
      <form onSubmit={onSubmit}>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <TextField
              value={password1}
              variant="outlined"
              required
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              onChange={e => setPassword1(e.target.value)}
              type={pwdVisibility ? 'text' : 'password'}
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
          <Grid item>
            <TextField
              value={password2}
              variant="outlined"
              required
              id="repeat-password"
              label="Repeat Password"
              name="repeat-password"
              autoComplete="repeat-password"
              onChange={e => setPassword2(e.target.value)}
              type={pwdVisibility ? 'text' : 'password'}
            />
          </Grid>
          <Grid item xs={9}>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  loading || password1 !== password2 || password1 === '' || password2 === ''
                }
              >
                Update Password
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

const PasswordResetForm = compose(
  withRouter,
  withFirebase
)(PasswordResetFormBase);

export default PasswordReset;

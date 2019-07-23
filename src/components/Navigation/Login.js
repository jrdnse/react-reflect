import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';

export default function Login(props) {
  const { btnClass } = props;

  const [logOpen, setLogOpen] = useState(false);

  function handleLogClickOpen() {
    setLogOpen(true);
  }

  function handleLogClose() {
    setLogOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" className={btnClass} onClick={handleLogClickOpen}>
        Login
      </Button>
      <Dialog open={logOpen} onClose={handleLogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Login
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

Login.propTypes = {
  btnClass: PropTypes.string.isRequired
};

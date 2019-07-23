import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

export default function Register(props) {
  const { btnClass, firebase } = props;

  const [regOpen, setRegOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegClickOpen() {
    setRegOpen(true);
  }

  function handleRegClose() {
    setRegOpen(false);
  }

  const onSubmit = e => {
    e.preventDefault();
    firebase.doCreateUserWithEmailAndPassword(email, password).then(console.log('user registered'));
    handleRegClose();
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" className={btnClass} onClick={handleRegClickOpen}>
        Register
      </Button>
      <Dialog open={regOpen} onClose={handleRegClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
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
            </Grid>
            <DialogActions>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Sign Up
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

Register.propTypes = {
  btnClass: PropTypes.string.isRequired
};

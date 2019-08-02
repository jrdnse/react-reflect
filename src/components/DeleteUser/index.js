import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from 'notistack';
import Firebase, { withFirebase } from '../Firebase';

const DeleteUser = props => {
  const { firebase } = props;

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    setDisabled(true);
    const uid = firebase.getUserID();

    firebase.auth.currentUser
      .delete()
      .then(() => {
        firebase.db.ref(`users/${uid}`).remove();
        firebase.db.ref(`day_collections/${uid}`).remove();
        props.enqueueSnackbar('User account and all corresponding data deleted! ', {
          variant: 'success'
        });
      })
      .catch(e => {
        props.enqueueSnackbar(e.message, {
          variant: 'error'
        });
        setOpen(false);
      });
  };

  return (
    <React.Fragment>
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: '#dc3545', color: 'white' }}
        onClick={handleClickOpen}
      >
        DELETE USER
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-user-title"
        aria-describedby="delete-user-and-data-dialog"
      >
        <DialogTitle id="delete-user-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-user-and-data-dialog">
            This will delete your account as well as all the information associated. The action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={submitHandler}
            color="primary"
            style={
              disabled ? { backgroundColor: '#eee', color: 'white' } : { backgroundColor: '#dc3545', color: 'white' }
            }
            disabled={disabled}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default withFirebase(withSnackbar(DeleteUser));

DeleteUser.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withFirebase } from '../Firebase';

const DeleteUser = props => {
  const { firebase } = props;

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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
            This will delete your account as well as all the information associated. The action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={firebase.doDeleteUser}
            color="primary"
            style={{ backgroundColor: '#dc3545', color: 'white' }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default withFirebase(DeleteUser);

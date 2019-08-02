import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { withSnackbar } from 'notistack';
import Firebase, { withFirebase } from '../Firebase';

const SignOutButton = props => {
  const { firebase } = props;

  return (
    <ListItem
      button
      key={4}
      onClick={() => {
        firebase.doSignOut();
        props.enqueueSnackbar('Logged out!', {
          variant: 'success'
        });
      }}
    >
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText>LOG OUT</ListItemText>
    </ListItem>
  );
};

export default withFirebase(withSnackbar(SignOutButton));

SignOutButton.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

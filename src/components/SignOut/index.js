import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <ListItem button key={4} onClick={firebase.doSignOut}>
    <ListItemIcon>
      <ExitToApp />
    </ListItemIcon>
    <ListItemText>LOG OUT</ListItemText>
  </ListItem>
);

export default withFirebase(SignOutButton);

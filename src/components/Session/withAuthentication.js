import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthUserContext from './context';
import Firebase, { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const { firebase } = props;

    const [authUser, setAuthUser] = useState(null);

    const listener = () => {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });
    };

    useEffect(() => {
      listener();
    });

    useEffect(() => {
      return () => {
        listener();
      };
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  WithAuthentication.propTypes = {
    firebase: PropTypes.instanceOf(Firebase).isRequired
  };

  return withFirebase(WithAuthentication);
};
export default withAuthentication;

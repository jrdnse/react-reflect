import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

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
        console.log('unmounted');
        listener();
      };
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};
export default withAuthentication;

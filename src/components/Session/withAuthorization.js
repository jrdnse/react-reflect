/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

const withAuthorization = condition => Component => {
  const WithAuthorization = props => {
    const { firebase } = props;

    const listener = () => {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          props.history.push(ROUTES.SIGN_IN);
        }
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
      <AuthUserContext.Consumer>
        {authUser => (condition(authUser) ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  };

  WithAuthorization.propTypes = {
    firebase: PropTypes.instanceOf(Firebase).isRequired,
    history: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  };
  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};
export default withAuthorization;

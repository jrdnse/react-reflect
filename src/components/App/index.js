import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import CardsPage from '../Cards';
import { withAuthentication, AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';
import AddCard from '../Home/AddCard';
import Landing from '../Landing';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <Route exact path={ROUTES.LANDING} component={HomePage} />
          ) : (
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
          )
        }
      </AuthUserContext.Consumer>
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.CARDS} component={CardsPage} />
      <Route path={ROUTES.ADD_CARD} component={AddCard} />
      <Route path={ROUTES.LANDING} component={Landing} />
    </div>
  </Router>
);

export default withAuthentication(App);

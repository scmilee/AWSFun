import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import HomePage from '../Home';
import Account from '../Account';
import SignInPage from '../SignIn'
import SignUpPage from '../SignUp'

import {withAuthentication} from '../Session'
import * as ROUTES from '../../constants/routes';
import Artists from '../Artist';


const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route name="artists" path={ROUTES.ARTISTS_BY_GEBRE} component={Artists} />
    </div>
  </Router>
)


export default withAuthentication(App);

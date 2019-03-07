import React from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({ firebase }) => (
  <Link to={ROUTES.LANDING}>
    <button className='button is-danger' type='submit' onClick={firebase.signOut}>
      Sign Out
    </button>
  </Link>
);

export default withFirebase(SignOutButton);
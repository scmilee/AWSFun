import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <nav className='navbar is-dark'>  
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </nav>
);
const NavigationAuth = () => (
  <div className='navbar-menu'>
    <div className='navbar-start'>
    
      <Link className='navbar-item' to={ROUTES.LANDING}>Landing</Link>
    
      <Link className='navbar-item' to={ROUTES.HOME}>Home</Link>
      
      <Link className='navbar-item' to={ROUTES.ACCOUNT}>Account</Link>
  
    </div>  
    <div className='navbar-end'>
      <div className='buttons'>
       <SignOutButton/>
      </div>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className='navbar-menu'>
    <div className='navbar-start'>
      <Link className='navbar-item' to={ROUTES.LANDING}>Landing</Link>
    </div>
    <div className='navbar-end'>
      <div className='buttons'>
        <Link className='button is-primary navbar-item' to={ROUTES.SIGN_IN}>Sign In</Link>
      </div>
    </div>
  </div>
);

export default Navigation;
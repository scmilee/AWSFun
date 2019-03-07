import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';


const SignUpPage = () => (
    <div>
      <h1 className='title'>Sign up</h1>
        <SignUpForm/>
    </div>
  
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    event.preventDefault();
    this.props.firebase
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    
  }

  onSubmitGoogle = event => {
    var provider = this.props.firebase.googleProvider()
    provider.addScope('profile');
    provider.addScope('email');

    this.props.firebase.signInWithPopup(provider).then((result) => {
      
      // var user = result.user;

      this.props.history.push(ROUTES.HOME);
      this.setState({ ...INITIAL_STATE });
    }).catch(error => {
      this.setState({ error });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

    render() {
    {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
    return (
      <div className="container">
      <form onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input"
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Username"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </div>
        </div>    
        <div className="field">
         <label className="label">Password</label>
          <div className="control">
            <input className="input"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </div>
      </div>
      <div className="field">
         <label className="label">Confirm Password</label>
          <div className="control">
            <input className="input"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
      </div>
        <button className='button is-info' disabled={isInvalid} type="submit">
          Sign Up
        </button>

        <button className ='button is-danger' onClick={this.onSubmitGoogle}>
          Sign Up With Google
        </button>

        {error && <p>{error.message}</p>}

      </form>
      </div>
    );
  }
}
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
//signupform hoc'd by firebase/ hocd by a router
const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };
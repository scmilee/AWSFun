import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1 className='title'>Login</h1>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    this.props.firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onSubmitGoogle = event => {
    var provider = this.props.firebase.googleProvider()
    provider.addScope('profile');
    provider.addScope('email');
    
    this.props.firebase.signInWithPopup(provider).then((result) => {

      this.props.history.push(ROUTES.HOME);
      this.setState({ ...INITIAL_STATE });
      // var token = result.credential.accessToken;
      // var user = result.user;
    }).catch(error => {
      this.setState({ error });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className='container'>
        <form onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <input className="input"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
          <button className="button is-info"disabled={isInvalid} type="submit">
            Sign In
          </button>

          <button className="button is-danger" onClick={this.onSubmitGoogle}>
            Sign in with google
          </button>
          {error && <p>{error.message}</p>}
        </form>
        <SignUpLink/>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
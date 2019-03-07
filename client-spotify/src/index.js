import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bulma'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Firebase, { FirebaseContext } from './components/Firebase';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

//followed the tutorial below for some best practices involving HOC's and firebase
//https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/

ReactDOM.render(
  <ApolloProvider client={client}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App/>
    </FirebaseContext.Provider>
  </ApolloProvider>,
    document.getElementById('root'),
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

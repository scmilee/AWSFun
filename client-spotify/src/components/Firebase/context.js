import React from 'react';

const FirebaseContext = React.createContext(null);
//higher level compoenent to always have an instance of firebase available

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;
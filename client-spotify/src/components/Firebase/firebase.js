
import app from 'firebase';
import 'firebase/auth';
  //all online resources i could find said it's NBD to expose api key
  //also have restriced access just in case
  const config = {
    apiKey: "AIzaSyB2dEXXriXSwm8WYQ1QRimTDNUw_EpRNAU",
    authDomain: "cs493test.firebaseapp.com",
    databaseURL: "https://cs493test.firebaseio.com",
    projectId: "cs493test",
    storageBucket: "cs493test.appspot.com",
    messagingSenderId: "953150231526"
  };

  class Firebase { 
    constructor() {
      this.app = app.initializeApp(config);
      this.auth = app.auth();
    }

    currentUser(){
      return this.auth.currentUser
    }

    createUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

    signInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
    
    signOut = () => this.auth.signOut();
    
    googleProvider = () => 
      new this.app.firebase_.auth.GoogleAuthProvider()
    
    
    signInWithPopup = (provider) =>
      this.auth.signInWithPopup(provider);

  }
  
  
  export default Firebase;
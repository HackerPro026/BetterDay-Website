import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Button} from "semantic-ui-react";


import NavBar from "./Components/NavBar";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {username: ""};
    if(!firebase.apps.length)
      firebase.initializeApp(FIREBASE_CONFIG);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        //Great.
        this.user = user;
      } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.user = result.user;

          this.db = firebase.firestore();
          this.db.settings({
            timestampsInSnapshots: true
          });

          this.db.collection("users").doc(this.user.uid).get().then((doc) => {
            if(!doc.exists){
              this.db.collection("users").doc(this.user.uid).set({
                name: this.user.displayName
              }).then(() => {
                console.log("Created account for " + this.user.displayName);
                window.location.reload();
              }, (e) => {
                console.error(e);
              });
            }
            let data = doc.data();
            
            this.setState({username: data.name});
            
          });
          
        }, (e) => {
          console.error(e);
        });
      }
    });
      

    

    
    //Instead of the line below, fetch from your database (preferably firebase)
                                    //Here you would fetch the auth
                                    //UID after you... authenticate
    
  }

  render() {
    return (
      <div>
        <NavBar firebase={firebase}/>
          
        <header className="App-header">
           Hello! How has your day been, {this.state.username}?
        </header>
        
      </div>
    );
  }
}

export default App;

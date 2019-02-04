import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Button} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";

export default class AuthPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: ""};
    if(!firebase.apps.length)
      firebase.initializeApp(FIREBASE_CONFIG);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Great! You're already signed in!");
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
  }

  render(){
    return (
      <div>
        <NavBar firebase ={firebase}/>
        <header className="App-header">
          dis stuf
        </header>
      </div>
    );
  }
}
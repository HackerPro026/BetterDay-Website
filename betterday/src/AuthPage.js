import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Button} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";

export default class AuthPage extends React.Component{

  redirectToDest(){
    document.location.href = "/";
        //BAD CODE ABOVE
        //You actually want to have a URL param (the thing after the ?) >>> example.com/page.html?destination="home"
        //so then you redirect to that url
        //... after validating the url is from betterday.com
        
  }

  constructor(props){
    super(props);
    this.state = {username: ""};
    if(!firebase.apps.length)
      firebase.initializeApp(FIREBASE_CONFIG);

    
  }

  render(){
    return (
      <div>
        <NavBar firebase ={firebase}/>
        <header className="App-header">
          <Button size="massive" positive content="SIGN IN WITH GOOGLE" onClick={() => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                console.log("Great! You're already signed in!");
                this.redirectToDest();
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
                        this.redirectToDest();
                      }, (e) => {
                        console.error(e);
                      });
                    }
                    let data = doc.data();
                    
                    this.setState({username: data.name});
                    this.redirectToDest();
                  });
                  
                }, (e) => {
                  console.error(e);
                });
              }
            });
          }}/>
          </header>
      </div>
    );
  }
}
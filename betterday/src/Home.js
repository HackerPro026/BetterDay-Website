import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Button} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {username: "", loading: true};
    if(!firebase.apps.length)
      firebase.initializeApp(FIREBASE_CONFIG);
    
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({username: user.displayName, loading: false});
      }else{
        
        this.setState({loading: false});
      }
    });

  }

    render() {

      if(this.state.loading){
        return (
          <h1>I am loading be patient jeez you ungrateful b@(^(*^%#%))</h1>
        );
      }

      if(this.state.username == ""){
        return (
          <div>
            <NavBar firebase={firebase} signedIn={this.state.signedIn}/>
            <h1>Go sign in right now, you obstinent a3%)^*#^@)#*^</h1>
          </div>
        );
      }

      return (
        <div>
          <NavBar firebase={firebase} signedIn={this.state.signedIn}/>
            
          <header className="App-header">
             Hello! How has your day been, {this.state.username}?
          </header>
          
        </div>
      );
    }
}

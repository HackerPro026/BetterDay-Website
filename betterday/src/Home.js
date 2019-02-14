import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Button, Dropdown,Popup,Input} from "semantic-ui-react";
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
          <header className="App-header">
            <h1>Have a nice day</h1>
          </header>
        );
      }

      if(this.state.username == ""){
        return (
          <div>
            <NavBar firebase={firebase} signedIn={this.state.signedIn}/>
            <header className="App-header">
              <h1>Please sign in to access our website.</h1>
            </header>
          </div>
        );
      }

      return (
        <div>
          <NavBar firebase={firebase} signedIn={this.state.signedIn}/>
          <header className="App-header">
            
             <p>Hello! How has your day been, {this.state.username}?</p>
             <Button.Group>
              <Button positive>Good</Button>
              <Button.Or />
              <Button negative>Bad</Button>
              <Button.Or />
              <Popup
                trigger={<Button>Custom...</Button>}
                content={
                  <div style=
                      {
                        {
                          textAlign:'center'
                        }
                      }
                    >
                    <p>How is your day? </p> 
                    <Input />
                  </div>
                }
                on='click'
                position="bottom center"
              />
            </Button.Group>

          </header>
          
        </div>
      );
    }
}

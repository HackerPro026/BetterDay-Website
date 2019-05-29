import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Segment,Grid,Label,Button, Dropdown,Popup,Input} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { Slider } from 'react-semantic-ui-range'
import PropTypes from 'prop-types';

export default class GoodPage extends React.Component {
    constructor(props){
        super(props);
        if(!firebase.apps.length)
            firebase.initializeApp(FIREBASE_CONFIG);
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                  this.user = user;
                  this.db = firebase.firestore();
                  this.setState({username: user.displayName, loading: false});
                }else{
                  
                  this.setState({loading: false});
                }
              });
        
    }
    render(){
        return(
        <header className="App-header">
        <NavBar firebase ={firebase} signedIn={true}/>
        <div style={{paddingTop: "100px"}} />
        
        <p style={{
               textAlign: "center"
              }}>
          <h1>
              CALL SUCIDE HOTLINE
              <br/>
              (800) 273-8255
          </h1>
          <h2>
              Mobile Call Button: <Button href="tel:(800)273-8255" inverted color="violet">Call</Button>
          </h2>
          </p>
          </header>
          
)
}
}
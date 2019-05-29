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
               display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}>
          <h1>
            
            I can see that you have been doing good today.
            <h1>
            
            Question:</h1><Input action={{
              content:"Send",
              labelPosition:"right",
              icon: "send",
              onClick: () => {
                this.db.collection("Q&A").add({
                  answer: "",
                  question: this.state.questionValue,
                  user: this.user.uid
                }).then(() => {
                  console.log("IT WROKDHWFOE!");
                });
              }
            }} placeholder="Write Question..." style={{display : "inline"}} size="medium" value={this.state.questionValue} onChange={(e, props) => {
              this.setState({questionValue: props.value})
            }} />
          </h1>
          </p>
          </header>
          
)
}
}
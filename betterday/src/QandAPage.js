import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Segment,Grid,Label,Button, Dropdown,Popup,Input} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { Slider } from 'react-semantic-ui-range'
import PropTypes from 'prop-types';

export default class QandAPage extends React.Component {

    constructor(props){
      super(props);
      this.state = {questionValue: ""}
      if(!firebase.apps.length)
      firebase.initializeApp(FIREBASE_CONFIG);
      this.db = firebase.firestore();
    }
    render(){

      if(this.state.username == ""){

        window.location.replace("/auth")
      }else{
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
            
              Question:<Input size="medium" value={this.state.questionValue} onChange={(e, props) => {
                this.setState({questionValue: props.value})
              }} />
              <Button onClick={() => {
                //Do your firebase stuff
                this.db.collection("Q&A").add({
                  answer: "",
                  question: this.state.questionValue,
                  user:""
                }).then(() => {
                  console.log("IT WROKDHWFOE!");
                });
              }}>YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET</Button>
          </h1>
          </p>
          </header>
      
          
)
}
}
}
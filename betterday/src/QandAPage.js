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
      this.state = {questionValue: "",username: "",loading: true}

       if(!firebase.apps.length){
         firebase.initializeApp(FIREBASE_CONFIG);
         this.db = firebase.firestore();
       }
    
       firebase.auth().onAuthStateChanged((user) => {
         if(user){
           this.user = user;
           this.db = firebase.firestore();
           this.setState({username: user.displayName, loading: false});
         }else{
          
          window.location.replace("/auth")
         }
       });
  
  
  
    }
  
    
    
  
    
    render(){

      if(this.state.loading){
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
            <h1>Loading...</h1>
          </p>
          </header>
        )
      }

      if(this.state.username == ""){
        return (
          <header className="App-header">
        <NavBar firebase ={firebase} signedIn={true}/>
        <div style={{paddingTop: "100px"}} />
        
        <p style={{
               display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}>
            <h1>Redirecting now...</h1>
          </p>
          </header>
        );
        
      }
        return(
          
        <header className="App-header">
        <NavBar firebase ={firebase} signedIn={true}/>
        <div style={{paddingTop: "100px"}} />
        
        <div style={{
               display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}>
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
              {/* <Button style={{display:"inline"}} onClick={() => {
                //Do your firebase stuff
                this.db.collection("Q&A").add({
                  answer: "",
                  question: this.state.questionValue,
                  user: this.user.uid
                }).then(() => {
                  console.log("IT WROKDHWFOE!");
                });
              }}>Send Question</Button> */}
          
          </div>
          </header>
      
          
)

}
}
import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Segment,Grid,Label,Button, Dropdown,Popup,Input} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { Slider } from 'react-semantic-ui-range'
import PropTypes from 'prop-types';


export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {username: "", loading: true, value1: 4, value: 0};
    if(!firebase.apps.length)
      firebase.initializeApp(FIREBASE_CONFIG);
    
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.db = firebase.firestore();
        this.setState({username: user.displayName, loading: false});
      }else{
        
        this.setState({loading: false});
      }
    });



  }

  handleValueChange(e, {value}){
    this.setState({
      value: value
    })
  }


    render() {

      if(this.state.loading){
        return (
          <header className="App-header" style={{
            display: "flex",
             flexDirection: "column",
             alignItems: "center",
             justifyContent: "center"}}>
            <h1>Have a nice day</h1>
          </header>
        );
      }

      if(this.state.username == ""){

        return (
          <div>
            <NavBar firebase={firebase} signedIn={false}/>
            <header className="App-header" style={{
            display: "flex",
             flexDirection: "column",
             alignItems: "center",
             justifyContent: "center"}}>
              <h1>Please sign in to access our website.</h1>
            </header>
          </div>
        );
      }
      
      const settings = {
        start:2,
        min:0,
        max:10,
        step:1,
      }
      return (
        
        <div>
          {/* MAKE  DROPDOWN WITH 1-10 FOR YOUR DAY*/}
          <NavBar firebase={firebase} signedIn={true}/>
          <header className="App-header">
            <br /> <br /> <br /> <br /> <br />
             <p style={{
               display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}>Hello! How has your day been, {this.state.username}?</p>
             {/* <Button.Group>
              <Button positive 
              onClick={
                () => {
                  document.location.href = "/auth";
              }
              }>
              Good 1-10</Button>
              
              <Button.Or />
              <Button negative
              onClick={
                () => {
                  document.location.href = "/auth";
              }
              }>
              Bad 1-10</Button>
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
            </Button.Group> */}
            
            <br />
            
            <Grid padded>
            <Grid.Column width={100} >
          <Segment inverted>
           <h1 style={{textAlign: "center"}}>(Bad)1-10(Good)</h1>
            <p>
              <Slider style={{width:"100%"}}color="teal" inverted={true}
                settings={{
                start: this.state.value1,
                min:0,
                max:10,
                step:1,
                onChange: (value) => {
                  this.setState({
                    value1:value
                  });
                  /*
                  1. Fetch previous statuses with db.collection.doc( blah blah ).get()
                  2. With that data, add a new entry to the array
                  3. Use db.collection.doc( blah blah ).update to set the value to the new array
                  */
                 db.collection("users").doc("GaTmbQEJEughsBZhCCxtnYWqKmo1").get({
                    
                })
                  db.collection("users").doc("GaTmbQEJEughsBZhCCxtnYWqKmo1").update({
                    
                  }).then(() => {
                    console.log("Yay we did it");
                  }, (e) => {
                    console.error(e);
                  })
                }
              }}/>
            </p>
            <Label color="teal">{this.state.value1}</Label>
          </Segment>
          </Grid.Column>
          </Grid>
          
          </header>
        </div>
      );
    }
}

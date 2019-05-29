import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Segment,Grid,Label,Button, Dropdown,Popup,Input,Table} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { Slider } from 'react-semantic-ui-range'
import PropTypes from 'prop-types';

export default class BadPage extends React.Component {
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
            <div>
                <header className="App-header">
                    <NavBar firebase ={firebase} signedIn={true}/>
                    
                    <p style={{
                        display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                    <h1>
                        <Table called inverted color="light blue" striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>History</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                                <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Date</Table.Cell>
                                    <Table.Cell>Status</Table.Cell>
                                    <Table.Cell>Solution</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Date</Table.Cell>{/*get user number*/}
                                    <Table.Cell>Status</Table.Cell>
                                    <Table.Cell>Solution</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Date</Table.Cell>
                                    <Table.Cell>Status</Table.Cell>
                                    <Table.Cell>Solution</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                
                               {   /*  <Table.Cell>Status</Table.Cell> 
                                    <Table.Cell>Status</Table.Cell>
                                    <Table.Cell>Status</Table.Cell>
                                    *///You probably won't need this cuz you only need date, status, and result so byebye
                                }
                                </Table.Row>
                                </Table.Body>
                                </Table>

            
                    </h1>
                    </p>
                </header>
            </div>
        )
    }
}
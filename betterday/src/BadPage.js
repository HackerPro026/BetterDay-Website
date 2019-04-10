import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Segment,Grid,Label,Button, Dropdown,Popup,Input} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { Slider } from 'react-semantic-ui-range'
import PropTypes from 'prop-types';

export default class BadPage extends React.Component {
    render(){
        return(
            <div>
                <header className="App-header">
                    <NavBar firebase ={firebase} signedIn={true}/>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    
                    <p style={{
                        display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                    <h1>
                        
                        
            I can see that you have been doing bad today.
                    </h1>
                    </p>
                </header>
            </div>
        )
    }
}
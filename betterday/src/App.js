import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from "./Components/Firebase/const";
import {Button} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Home";
import AuthPage from "./AuthPage";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={AuthPage} />
        </div>
      </Router>
    );
  }
}

export default App;

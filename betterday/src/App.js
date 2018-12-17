import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    //Instead of the line below, fetch from your database (preferably firebase)
    this.username = "(insert username here)";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
           Hello! How has your day been, {this.username}?
        </header>
      </div>
    );
  }
}

export default App;

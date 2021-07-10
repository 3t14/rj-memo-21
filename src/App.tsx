import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome name="Iwate Taro"/>
        <Welcome name="Iwate Hanako" />
        <Button variant="contained" color="primary" >
          Hello World!
        </Button>
      </header>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

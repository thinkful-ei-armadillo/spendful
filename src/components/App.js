import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage'; 
import IncomePage from '../routes/IncomePage';
import DashboardPage from '../routes/DashboardPage';
import AddItemPage from '../routes/AddItemPage';
import Navbar from './Navbar';
import './App.css';

class App extends Component {
  render() {
    return <>
      <Navbar />

      <div id="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/income" component={IncomePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/additem" component={AddItemPage} />
        </Switch>
      </div>
    </>;
  }
}

export default App;

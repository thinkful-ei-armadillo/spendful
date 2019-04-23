import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage'; 
import IncomePage from '../routes/IncomePage';
import DashboardPage from '../routes/DashboardPage';
import './App.css';
import AddItemPage from '../routes/AddItemPage';

class App extends Component {
  state = {
    menu: false,
  }

  render() {
    const isLoggedIn = true;
    const navLinks = <>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/income">Income</Link>
      <Link to="/expenses">Expenses</Link>
    </>;

    return <>
      <nav>
        <div>
          <div className="nav-left">
            <Link className="nav-show-all" to="/"><h1>Spendful</h1></Link>
            {isLoggedIn ? navLinks : ''}
          </div>

          <div className="nav-right">
            {isLoggedIn
              ? <Link to="/logout">Logout</Link>
              : <Link to="/login">Login</Link>}

            <a className="nav-show-mobile" onClick={() => this.setState({menu: !this.state.menu})}>
              <i className="fas fa-bars"></i>
            </a>
          </div>

          <div className={this.state.menu ? 'nav-mobile-menu expanded' : 'nav-mobile-menu'}>
            <p>test link 1</p>
            <p>test link 2</p>
          </div>
        </div>
      </nav>

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

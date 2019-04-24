import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
    }
    
    this.onRouteChange = this.onRouteChange.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
    this.menuOff = this.menuOff.bind(this);
  }

  onRouteChange(e) {
    // set menu to invisible every time a link is clicked (on mobile)
    if(e.target.tagName === 'A') {
      this.setState({menuVisible: false});
    }
  }

  menuToggle() { this.setState({menuVisible: !this.state.menuVisible}) }
  menuOff() { this.setState({menuVisible: false}) }

  render() {
    const isLoggedIn = true;
    const navLinks = <>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/income">Income</Link>
      <Link to="/expenses">Expenses</Link>
    </>;

    return (
      <nav onClick={this.onRouteChange}>
        <div className="nav-main">
          <div className="nav-left">
            <Link className="nav-show-all" to="/">
              <h1>Spendful</h1>
            </Link>
            
            {isLoggedIn ? <div className="nav-hide-mobile">{navLinks}</div> : ''}
          </div>

          <div className="nav-right nav-hide-mobile">
            {isLoggedIn
              ? <Link to="/logout">Logout</Link>
              : <Link to="/login">Login</Link>}
          </div>
          <div className="nav-right nav-show-mobile">
            <button onClick={this.menuToggle}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        <div className={this.state.menuVisible ? 'nav-mobile-menu expanded' : 'nav-mobile-menu'}>
          {isLoggedIn
            ? <>{navLinks} <Link to="/logout">Logout</Link></>
            : <Link to="/login">Login</Link>}
        </div>
      </nav>
    );
  }
}
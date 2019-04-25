import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import UserContext from './UserContext';

export default class Navbar extends Component {
  static contextType = UserContext;
  
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: this.props.menuVisible,
    }
    
    this.menuToggle = this.menuToggle.bind(this);
    this.menuOff = this.menuOff.bind(this);
  }

  // this will reset mobile navbar when route is changed
  componentWillReceiveProps() {
    this.setState({menuVisible: this.props.menuVisible});
  }

  menuToggle() { this.setState({menuVisible: !this.state.menuVisible}) }
  menuOff() { this.setState({menuVisible: false}) }

  getNavBtnClass(href) {
    let location = this.props.location;

    if(this.props.isLoggedIn) {
      if(location === '/') location = 'dashboard';
    }

    if(href === location) {
      return 'nav-link nav-selected';
    }

    return 'nav-link';
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const navLinks = <>
      <Link className={this.getNavBtnClass('dashboard')} to="/dashboard">Dashboard</Link>
      <Link className={this.getNavBtnClass('income')} to="/income">Income</Link>
      <Link className={this.getNavBtnClass('expenses')} to="/expenses">Expenses</Link>
    </>;

    return (
      <nav onClick={this.onRouteChange}>
        <div className="nav-main">
          <div className="nav-left">
            <Link to="/">
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
import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import './Navbar.css';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

class Navbar extends Component {
  static contextType = UserContext;
  
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
    }
  }

  // this will reset mobile navbar when route is changed
  componentWillReceiveProps() {
    this.setState({
      menuVisible: false
    })
  }

  menuToggle = () => { 
    this.setState({
      menuVisible: !this.state.menuVisible
    }) 
  }

 
  getNavBtnClass(href) {
    let location = this.props.history.location.pathname;

    if(TokenService.hasAuthToken()) {
      if(location === '/') location = 'dashboard';
    }

    if(href === location) {
      return 'nav-link nav-selected';
    }

    return 'nav-link';
  }

  handleLogout = () => {
    this.context.processLogout();
  }

  render() {
    const isLoggedIn = TokenService.hasAuthToken();
    const navLinks = <>
      <Link className={this.getNavBtnClass('/dashboard')} to="/dashboard">Dashboard</Link>
      <Link className={this.getNavBtnClass('/incomes')} to="/incomes">Incomes</Link>
      <Link className={this.getNavBtnClass('/expenses')} to="/expenses">Expenses</Link>
    </>;

    return (
      <nav>
        <div className="nav-main">
          <div className="nav-left">
            <Link to="/">
              <h1>Spendful</h1>
            </Link>
            
            {isLoggedIn ? <div className="nav-hide-mobile">{navLinks}</div> : ''}
          </div>

          <div className="nav-right nav-hide-mobile">
            {isLoggedIn
              ? 
              <div className='user-container'>
                <i className="far fa-user"></i>
                <p className="user-name">{this.context.user.name}</p>
                <Link className="nav-link" to="/" onClick={this.handleLogout}>Logout</Link>
              </div>
              : <Link className="nav-link" to="/login">Login</Link>}
          </div>
          <div className="nav-right nav-show-mobile">
            <button className="btn-nav-menu" onClick={this.menuToggle}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        <div className={this.state.menuVisible ? 'nav-mobile-menu expanded' : 'nav-mobile-menu'}>
          {isLoggedIn
            ? <>{navLinks} <Link className="nav-link" to="/" onClick={this.handleLogout}>Logout</Link></>
            : <Link className="nav-link" to="/login">Login</Link>}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar)
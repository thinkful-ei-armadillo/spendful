import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

export default class LoginPage extends Component {
  static defaultProps = {
    location:{},
    history:{
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination); 
  }

  render() {
    return(
      <section className="login-form">
        <form>
          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <button type="submit">Log In</button> 
        </form>
        <Link to="/">Don't have an account?</Link>
      </section>
    )
  }
}

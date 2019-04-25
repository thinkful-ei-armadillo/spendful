import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import UserContext from '../components/UserContext';
import AuthApiService from '../services/auth-api-service';

export default class LoginPage extends Component {
  static defaultProps = {
    location:{},
    history:{
      push: () => { },
    },
  }

  static contextType = UserContext;

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination); 
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email_address, password } = e.target
    AuthApiService.postLogin({
      email_address: email_address.value,
      password: password.value, 
    })
    .then(res => {
      console.log(res)
      email_address.value = ''
      password.value = ''
      this.context.processLogin(res.token)
      this.handleLoginSuccess()
    })
  }

  render() {
    return(
      <section className="login-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Username" name="email_address" required/>
          <input type="password" placeholder="Password" name="password" required/>
          <button type="submit">Log In</button> 
        </form>
        <Link to="/">Don't have an account?</Link>
      </section>
    )
  }
}

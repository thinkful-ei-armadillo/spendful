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

  state = {
    error: [],
  }

  static contextType = UserContext;

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination); 
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({error: []});

    const { email_address, password } = e.target;
    
    AuthApiService.postLogin({
      email_address: email_address.value,
      password: password.value, 
    })
    .then(res => {
      email_address.value = ''
      password.value = ''
      this.context.processLogin(res.token)
      this.handleLoginSuccess()
    })
    .catch(err => {
      if(err.errors) {
        this.setState({error: err.errors[0]});
      }
    })
  }

  render() {
    return(
      <section className="login-form">
        {this.state.error.length > 0 ? <div className="alert-error">{this.state.error}</div> : ''}
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Email" name="email_address" autoComplete="off" required/>
          <input type="password" placeholder="Password" name="password" required/>
          <button type="submit">Log In</button> 
        </form>
        <Link to="/">Don't have an account?</Link>
      </section>
    )
  }
}

import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';

export default class RegistrationForm extends Component {
  static contextType = UserContext;

  state = {
    errors: [],
    demo: {
      email_address: 'demo@spendful.com',
      password: 'password'
    }
  }

  handleLogin = (email_address, password) => {
    AuthApiService.postLogin({
      email_address,
      password,
    })
    .then(res => {
      this.context.processLogin(res.token)
      this.props.handleRegistrationSuccess();
    })
    .catch(err => {
      if(err.errors) {
        this.context.setError(err.errors);
      }
    })
  }

  handleRegistrationSubmit = e => {
    e.preventDefault();
    this.context.clearError();

    const {email_address, full_name, password } = e.target;

    AuthApiService.postUser({
      email_address: email_address.value,
      full_name: full_name.value,
      password: password.value 
    })
    .then(() => {
      this.handleLogin(email_address.value, password.value);
      
      email_address.value= ''
      full_name.value= ''
      password.value= ''
    })
    .catch(err => {
      if(err.errors) {
        this.context.setError(err.errors);
        this.setState({
          errors: this.context.errors
        })
      }
    });
  }

  handleDemoLogin = () => {
    this.handleLogin(this.state.demo.email_address, this.state.demo.password);
  }

  render() {
    return (
      <>
      <form onSubmit={this.handleRegistrationSubmit}>
        <label htmlFor="input_email">Email</label>
        <input type="email" id="input_email" className="form-control" name="email_address" autoComplete="off" required></input>
        <label htmlFor="input_name">Full name</label>
        <input type="text" id="input_name" className="form-control" name="full_name" autoComplete="off" required></input>
        <label htmlFor="input_password">Password</label>
        <input type="password" id="input_password" className="form-control" name="password" autoComplete="off" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" 
          title="Password must be 8-30 characters long and contain at least one uppercase letter, at least one lowercase letter, and at least one number."required></input>
        <p className="password-instructions">Password must be 8-30 characters long and contain at least one uppercase letter, at least one lowercase letter, and at least one number.</p>
        <button type="submit" className="btn">Create an account!</button>
        <button type="button" className="btn demo-btn" onClick={this.handleDemoLogin}>Demo account</button>
      </form>

      </>
    );
  }
}
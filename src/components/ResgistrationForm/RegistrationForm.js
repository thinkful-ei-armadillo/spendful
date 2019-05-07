import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';

export default class RegistrationForm extends Component {
  static contextType = UserContext;

  state = {
    errors: []
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

  render() {
    return (
      <>

      <div className="test-error">
      {this.state.errors ? <div className="alert-error">{this.state.errors}</div> : ''}
      </div>

      <form onSubmit={this.handleRegistrationSubmit}>
        <label htmlFor="input_email">Email</label>
        <input type="text" id="input_email" className="form-control" name="email_address" autoComplete="off" required></input>
        <label htmlFor="input_name">Full name</label>
        <input type="text" id="input_name" className="form-control" name="full_name" autoComplete="off" required></input>
        <label htmlFor="input_password">Password</label>
        <input type="password" id="input_password" className="form-control" name="password" autoComplete="off" required></input>
        <p className="password-instructions">Passwords must be 8-30 characters long and contain a capital letter, number, and symbol.</p>
        <button type="submit" className="btn">Create an account!</button>
      </form>

      </>
    );
  }
}
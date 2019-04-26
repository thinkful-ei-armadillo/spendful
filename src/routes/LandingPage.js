import React, { Component } from 'react';
import './LandingPage.css';
import AuthApiService from '../services/auth-api-service';

export default class LandingPage extends Component {

  static defaultProps = {
    history: {
      push: () => {}, 
    },
  }

  state = {
    error: [],
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({error: []});

    const {email_address, full_name, password } = e.target;

    AuthApiService.postUser({
      email_address: email_address.value,
      full_name: full_name.value,
      password: password.value 
    })
    .then(() => {
      email_address.value= ''
      full_name.value= ''
      password.value= ''
      this.handleRegistrationSuccess(); 
    })
    .catch(err => {
      this.setState({error: err.errors[0]});
    });
  }

  render() {
    return <>
      {this.state.error.length > 0 ? <div className="alert-error-lg">{this.state.error}</div> : ''}
      <header>
        <div className="landing-header">
          <div className="landing-header-left">
            <h2>Spendful is the newest way to prevent yourself from becoming broke.</h2>          
          </div>

          <div className="landing-header-right">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="input_email">Email</label>
              <input type="text" id="input_email" name="email_address" autoComplete="off" required></input>
              <label htmlFor="input_name">Full name</label>
              <input type="text" id="input_name" name="full_name" autoComplete="off" required></input>
              <label htmlFor="input_password">Password</label>
              <input type="password" id="input_password" name="password" autoComplete="off" required></input>
              <button type="submit">Create an account!</button>
            </form>
          </div>
        </div>
      </header>

      <main>
        <p>Landing page</p>
      </main>
    </>;
  }
}
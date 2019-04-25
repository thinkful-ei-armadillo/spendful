import React, { Component } from 'react';
import './LandingPage.css';
import AuthApiService from '../services/auth-api-service';

export default class LandingPage extends Component {

  static defaultProps = {
    history: {
      push: () => {}, 
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  handleSubmit = e => {
    e.preventDefault()
    const {email_address, full_name, password } = e.target; 
    AuthApiService.postUser({
      email_address: email_address.value,
      full_name: full_name.value,
      password: password.value 
    })
    .then( () => {
      email_address.value= ''
      full_name.value= ''
      password.value= ''
      this.handleRegistrationSuccess(); 
    })
  }

  render() {
    return <>
      <header>
        <div className="landing-header">
          <div className="landing-header-left">
            <h2>Spendful is the newest way to prevent yourself from becoming broke.</h2>          
          </div>

          <div className="landing-header-right">
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Email" name="email_address" required></input>
              <input type="text" placeholder="Username" name="full_name" required></input>
              <input type="password" placeholder="Password" name="password" required></input>
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
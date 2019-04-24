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
    const {email, username, password } = e.target; 
    AuthApiService.postUser({
      name: email.value,
      username: username.value,
      password: password.value 
    })
    .then( () => {
      email.value= ''
      username.value= ''
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
              <input type="text" placeholder="Email" name="email" required></input>
              <input type="text" placeholder="Username" name="username" required></input>
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
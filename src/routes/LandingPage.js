import React, { Component } from 'react';
import UserContext from '../contexts/UserContext';
import RegistrationForm from '../components/RegistrationForm';
import './LandingPage.css';

export default class LandingPage extends Component {
  static contextType = UserContext;

  static defaultProps = {
    history: {
      push: () => {}, 
    },
  }

  handleRegistrationSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination);
  }


  render() {
    return <>
      {this.context.error.length > 0 ? <div className="alert-error-lg">{this.context.error[0]}</div> : ''}
      
      <header>
        <div className="landing-header">
          <div className="landing-header-left">
            <h2>Spendful is the newest way to prevent yourself from becoming broke.</h2>          
          </div>

          <div className="landing-header-right">
            <RegistrationForm handleRegistrationSuccess={this.handleRegistrationSuccess} />
          </div>
        </div>
      </header>

      <main>
        <h3>How does it work?</h3>

        <section className="feature-list">
          <figure>
            <img src="https://via.placeholder.com/150" alt="placeholder"></img>
            <figcaption>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere, massa non bibendum 
            condimentum, dui purus dignissim sem, nec posuere sapien ex quis mauris.
            </figcaption>
          </figure>

          <figure>
            <img src="https://via.placeholder.com/150" alt="placeholder"></img>
            <figcaption>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere, massa non bibendum 
            condimentum, dui purus dignissim sem, nec posuere sapien ex quis mauris.
            </figcaption>
          </figure>
        </section>
      </main>
    </>;
  }
}
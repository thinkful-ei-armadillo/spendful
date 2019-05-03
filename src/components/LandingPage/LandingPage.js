import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext';
import RegistrationForm from '../ResgistrationForm/RegistrationForm';
import './LandingPage.css';

export default class LandingPage extends Component {
  static contextType = UserContext;


  render() {
    return <>
      {this.context.error.length > 0 ? <div className="alert-error-lg">{this.context.error[0]}</div> : ''}
      
      <header>
        <div className="landing-header">
          <div className="landing-header-left">
            <h2>Spendful is the newest way to prevent yourself from becoming broke.</h2>          
          </div>

          <div className="landing-header-right">
            <RegistrationForm handleRegistrationSuccess={this.props.handleRegistrationSuccess} />
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
      <footer>
        <div className='footer-wrapper'>
          <div className="project">
            <h3>Project</h3>
            <ul>
              <li><a href="https://github.com/thinkful-ei-armadillo/spendful-client" target="_blank" rel="noopener noreferrer">Github Client</a></li>
              <li><a href="https://github.com/thinkful-ei-armadillo/spendful-server" target="_blank" rel="noopener noreferrer">Github Server</a></li>
              <li>Register</li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div className="about-us">
            <h3>About us</h3>
            <ul>
              <li>Andre</li>
              <li>Chris</li>
              <li>Ethan</li>
              <li>Michael</li>
              <li>Zoljargal</li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="copyright">
          <p>Copyright 2019</p>
        </div>
      </footer>
    </>;
  }
}
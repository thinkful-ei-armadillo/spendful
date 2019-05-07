import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext';
import RegistrationForm from '../ResgistrationForm/RegistrationForm';
import './LandingPage.css';

export default class LandingPage extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props)
    this.featuresRef = React.createRef()
    this.registrationRef = React.createRef()   
  }

     // Scroll to ref function 
  scrollTo = (el) => {
    let top = el === 'feature' 
      ? this.featuresRef.current.offsetTop 
      : this.registrationRef.current.offsetTop
    window.scrollTo({
        top, 
        behavior: "smooth" 
    })
  }

  
  scrollToFeatures = () => {
      this.scrollTo('feature')
  }


  scrollToRegistration = () => {
    this.scrollTo('registration')
  }

  render() {
    return <>
      {this.context.error.length > 0 ? <div className="alert-error-lg">{this.context.error[0]}</div> : ''}
      
      <header ref={this.registrationRef}>
        <div className="landing-header">
          <div className="landing-header-left">
            <h2>Spendful is the newest way to prevent yourself from going broke.</h2>          
          </div>

          <div className="landing-header-right">
            <RegistrationForm handleRegistrationSuccess={this.props.handleRegistrationSuccess} />
          </div>
        </div>
      </header>

      <div className="feature-wrapper" >
        <div className="hidden">
        </div>
        <div onClick={this.scrollToFeatures} className="feature">
          <h3>AWESOME FEATURES</h3>
          <p>Simple and effective feaures that will put you in control of your own finances!</p>
        </div>
        <div className="hidden">
        </div>
      </div>

      <main ref={this.featuresRef}>

        <section className="feature-list" >
          <figure>
            <img src="https://via.placeholder.com/250" alt="placeholder"></img>
            <figcaption>
              Track your earnings and expenses! <br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere, massa non bibendum 
            condimentum, dui purus dignissim sem, nec posuere sapien ex quis mauris.
            </figcaption>
          </figure>

          <figure>
            <img src="https://via.placeholder.com/250" alt="placeholder"></img>
            <figcaption>
              Understand where you money goes! <br/>
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
              <li><Link to="/" onClick={this.scrollToRegistration}>Register</Link></li>
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
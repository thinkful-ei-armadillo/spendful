import React, { Component } from 'react';
import LandingPage from '../components/LandingPage/LandingPage';

export default class LandingRoute extends Component {
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
    return <LandingPage handleRegistrationSuccess={this.handleRegistrationSuccess} />;
  }
}

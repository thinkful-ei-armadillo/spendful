import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundRoute extends Component {
  render() {
    return (
      <section className="page-404">
        <div>
          <i className="fas fa-poo"></i>
          <h2>404 Error</h2>
          <p>Couldn't find that page. Try going back in your history or <Link to="/">to the home page</Link>.</p>
        </div>
      </section>
    );
  }
}

export default NotFoundRoute

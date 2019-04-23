import React, { Component } from 'react';
import './LandingPage.css';


export default class LandingPage extends Component {
  render() {
    return <>
      <header>
        <div className="landing-header">
          <div className="landing-header-left">
            <h2>Spendful is the newest way to prevent yourself from becoming broke.</h2>          
          </div>

          <div className="landing-header-right">
            <form>
              <input type="text" placeholder="Email"></input>
              <input type="text" placeholder="Username"></input>
              <input type="password" placeholder="Password"></input>
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
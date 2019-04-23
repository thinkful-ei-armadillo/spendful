import React, { Component } from 'react';

export default class LoginPage extends Component {
  
  render(){
    return(
      <div>
        <form>
          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <button type="submit">Log In</button> 
        </form>
      </div>
    )
  }
}

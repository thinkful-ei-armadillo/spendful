import React, { Component } from 'react';

export default class LoginPage extends Component {
  
  render(){
    return(
      <div>
        <form>
          User Name: <input type='text'/>
          Password: <input type='text'/>
          <button type="submit">Log In</button> 
        </form>
      </div>
    )
  }
}

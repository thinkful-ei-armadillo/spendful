import React from 'react';
import AuthApiService from '../../services/auth-api-service';

class LoginForm extends React.Component {

  onSubmit = (ev) => {
    ev.preventDefault();

    const { email_address, password } = ev.target;

    AuthApiService.postLogin({
      email_address: email_address.value,
      password: password.value,
    })
    .then(res => {
      email_address.value = ''
      password.value = ''

      this.props.onSuccess(res.token);
    })
    .catch(err => {
      this.props.onFailure(err.errors)
    })
  }

  render() {

    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Email" name="email_address" autoComplete="off" required/>
        <input type="password" placeholder="Password" name="password" required/>
        <button type="submit">Log In</button>
      </form>
    );
  }
}

export default LoginForm;

import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import UserContext from '../../contexts/UserContext';

class LoginPage extends React.Component {

  static contextType = UserContext;

  static defaultProps = {
    location:{},
    history:{
      push: () => { },
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      error: [],
    };

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
  }


  handleLoginSuccess = (token) => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'

    this.context.processLogin(token)
    history.push(destination);
  }

  handleLoginFailure = (error) => {
    this.setState({error});
  }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.setState({error: []});

  //   const { email_address, password } = e.target;

  //   AuthApiService.postLogin({
  //     email_address: email_address.value,
  //     password: password.value,
  //   })
  //   .then(res => {
  //     email_address.value = ''
  //     password.value = ''
  //     this.context.processLogin(res.token)
  //     this.handleLoginSuccess()
  //   })
  //   .catch(err => {
  //     if(err.errors) {
  //       this.setState({error: err.errors[0]});
  //     }
  //   })
  // }

  render () {

    return(
      <section className="login-form">

        {this.state.error.length > 0 ? <div className="alert-error">{this.state.error}</div> : ''}

        <LoginForm onSuccess={this.handleLoginSuccess} onFailure={this.handleLoginFailure} />

        {/* <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Email" name="email_address" autoComplete="off" required/>
          <input type="password" placeholder="Password" name="password" required/>
          <button type="submit">Log In</button>
        </form> */}

        <Link to="/">Don't have an account?</Link>

      </section>
    )
  }
}

export default LoginPage;

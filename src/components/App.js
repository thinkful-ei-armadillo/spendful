import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage'; 
import IncomePage from '../routes/IncomePage';
import DashboardPage from '../routes/DashboardPage';
import AddItemPage from '../routes/AddItemPage';
import PrivateRoute from '../routes/PrivateRoute';
import PublicOnlyRoute from '../routes/PublicOnlyRoute'
import NotFoundPage from '../routes/NotFoundPage'
import Navbar from './Navbar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
    }

    this.props.history.listen((location, action) => {
      this.setState({menuVisible: false});
    });
  }

  render() {
    return <>
      <Navbar menuVisible={this.state.menuVisible} />

      <div id="app-container">
        <Switch>
          <PublicOnlyRoute exact path={'/'} component={LandingPage} />
          <PublicOnlyRoute path={'/login'} component={LoginPage} />
          <PrivateRoute path={'/income'} component={IncomePage} />
          <PrivateRoute path={'/dashboard'} component={DashboardPage} />
          <PrivateRoute path={'/additem'} component={AddItemPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>;
  }
}

export default withRouter(App);

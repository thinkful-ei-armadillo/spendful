import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage'; 
import IncomePage from '../routes/IncomePage';
import ExpensesPage from '../routes/ExpensesPage';
import DashboardPage from '../routes/DashboardPage';
import AddItemPage from '../routes/AddItemPage';
import PublicOnlyRoute from '../routes/PublicOnlyRoute'
import PrivateRoute from '../routes/PrivateRoute'
import NotFoundPage from '../routes/NotFoundPage'
import Navbar from './Navbar';
import './App.css';

class App extends Component {

  render() {
    return <>
      <Navbar />

      <div id="app-container">
        <Switch>
          <PublicOnlyRoute exact path={'/'} component={LandingPage} />
          <PublicOnlyRoute path={'/login'} component={LoginPage} />
          <PrivateRoute path={'/incomes'} component={IncomePage} />
          <PrivateRoute path={'/expenses'} component={ExpensesPage} />
          <PrivateRoute path={'/dashboard'} component={DashboardPage} />
          <PrivateRoute path={'/add'} component={AddItemPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>;
  }
}

export default App;

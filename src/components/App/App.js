import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import LoginRoute from '../../routes/LoginRoute';
import IncomesRoute from '../../routes/IncomesRoute';
import ExpensesRoute from '../../routes/ExpensesRoute';
import DashboardRoute from '../../routes/DashboardRoute';
import AddItemRoute from '../../routes/AddItemRoute';
import PublicOnlyRoute from '../../routes/PublicOnlyRoute'
import PrivateRoute from '../../routes/PrivateRoute'
import NotFoundPage from '../../routes/NotFoundPage'
import EditIncomeRoute from '../../routes/EditIncomeRoute'
import EditExpenseRoute from '../../routes/EditExpenseRoute'

import Navbar from '../Navbar/Navbar';
import './App.css';

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return <>
      <Navbar />

      <div id="app-container">
        {hasError && (
            <p>There was an error! Oh no!</p>
          )}
        <Switch>
          <PublicOnlyRoute exact path={'/'} component={LandingPage} />
          <PublicOnlyRoute path={'/login'} component={LoginRoute} />
          <PrivateRoute path={'/incomes'} component={IncomesRoute} />
          <PrivateRoute path={'/expenses'} component={ExpensesRoute} />
          <PrivateRoute path={'/dashboard'} component={DashboardRoute} />
          <PrivateRoute path={'/add'} component={AddItemRoute} />
          <PrivateRoute path={'/edit_income/:id'} component={EditIncomeRoute} />
          <PrivateRoute path={'/edit_expense/:id'} component={EditExpenseRoute} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>;
  }
}

export default App;

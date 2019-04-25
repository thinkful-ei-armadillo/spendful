import React, { Component } from 'react';
import config from '../config'
import TokenService from '../services/token-service'

const AppContext = React.createContext({
  test: 0,
  incomes: [],
  expenses: [],
  handleAllIncomes: () => {},
  handleAllExpenses: () => {},
  generatePieChart: () => {},
});

export default AppContext;

export class AppProvider extends Component {
  state = {
    test: 0,
    incomes: [],
    expenses: [],
    handleAllIncomes: () => {},
    handleAllExpenses: () => {},
    handleReports: () => {}
    
  }

  handleAllIncomes = () => {
    console.log('Searching for money');
    fetch(`${config.API_ENDPOINT}/incomes/user_id`)
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(income => {
      this.setState({ 
        incomes: income 
      })
    })
  }

  handleAllExpenses = () => {
    console.log('Searching for money');
    fetch(`${config.API_ENDPOINT}/expenses/user_id`)
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(expense => {
      this.setState({ 
        expenses: expense
      })
    })
  }

  handleReports = (year, month) => {
    fetch(`${config.API_ENDPOINT}/reports/2019/4`, {
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      }
    })
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(report => {
      this.setState({
        incomes: report.incomes,
        expenses: report.expenses
      })
      console.log(this.state)
    })
  }

  render() {
    const value = {
      test: this.state.test,
      incomes: this.state.incomes,
      expenses: this.state.expenses,
      handleAllIncomes: this.handleAllIncomes,
      handleAllExpenses: this.handleAllExpenses,
      handleReports: this.handleReports
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
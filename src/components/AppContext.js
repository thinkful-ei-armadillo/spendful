import React, { Component } from 'react';
import Config from '../config'

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
    handleAllExpenses: () => {}
    
  }

  handleAllIncomes = () => {
    console.log('Searching for money');
    fetch(`${Config.API_ENDPOINT}/incomes/user_id`)
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
    fetch(`${Config.API_ENDPOINT}/expenses/user_id`)
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

  

  render() {
    const value = {
      test: this.state.test,
      incomes: this.state.incomes,
      expenses: this.state.expenses,
      handleAllIncomes: this.handleAllIncomes,
      handleAllExpenses: this.handleAllExpenses,
      
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
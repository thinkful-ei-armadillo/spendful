import React, { Component } from 'react'
import DataContext from '../../contexts/DataContext';

export default class BalanceSheet extends Component {
  static contextType = DataContext
  
  render() {


    const total = (accumulator, currentValue) => accumulator + parseInt(currentValue.amount); 
    const totalExpenses = this.context.expenses.reduce(total, 0)
    const totalIncomes = this.context.incomes.reduce(total, 0)

    return (
      <div>
        Total Expenses: {totalExpenses}<br />
        Total Incomes: {totalIncomes}<br />
        Balance: {totalIncomes - totalExpenses}
      </div>
    )
  }
}

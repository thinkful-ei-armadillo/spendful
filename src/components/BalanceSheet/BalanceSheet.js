import React, { Component } from 'react'
import DataContext from '../../contexts/DataContext';
import './BalanceSheet.css'; 
export default class BalanceSheet extends Component {
  static contextType = DataContext
  
  render() {


    const total = (accumulator, currentValue) => accumulator + parseInt(currentValue.amount); 
    const totalExpenses = this.context.expenses.reduce(total, 0)
    const totalIncomes = this.context.incomes.reduce(total, 0)

    return (
      <ul className="balance-sheet">
        <li><strong>Incomes:</strong>  <span>${totalIncomes}</span></li>
        <li><strong>Expenses:</strong> <span>-${totalExpenses}</span></li>
        <hr />
        <li><strong>Balance:</strong> <span>${totalIncomes - totalExpenses}</span></li>
      </ul>
    )
  }
}

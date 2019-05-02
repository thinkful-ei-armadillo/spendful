import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import { getAllExpenses } from '../../services/expenses-service'

export default class ExpensesPage extends Component {

  state = {
    expenses: [],
    error: [],
  }

  componentDidMount(){
    this.updateExpenses()
  }

  updateExpenses = () => {
    this.setState({error: []})
    getAllExpenses()
    .then(expenses => {
        this.setState({expenses})
    })
    .catch(error => {
        this.setState({error: error.errors})
    })
  }



  render() {
    return (
      <>
        <section className="page-controls">
          <select>
            <option>April 2019</option>
          </select>

          <Link to="/add#expense">Add expense</Link>
        </section>
        
        <section className="page-content">
          {(this.state.expenses.length > 0)
          ?
          <IncomeExpenseList type="expenses" data={this.state.expenses} updateExpenses={this.updateExpenses} />
          : <p>There are no items to display</p> 
          }
          </section>
      </>
    );
  }
}
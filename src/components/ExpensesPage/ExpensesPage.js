import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import BarChart from '../BarChart/BarChart';
import { getAllExpenses } from '../../services/expenses-service'
import { getMonthlyReport } from '../../services/reports-service';
import DataContext from '../../contexts/DataContext'
import MonthPicker from '../MonthPicker/MonthPicker'

export default class ExpensesPage extends Component {
  static contextType = DataContext
  state = {
    month: {},
    expenses: [],
    errors: [],
    showExpenses: '',
  }

  componentDidMount(){
    this.updateExpenses()
  }

  updateExpenses = () => {
      this.setState({showExpenses: 'all'})
      this.context.clearError()
     getAllExpenses()
        .then(expenses => {
            this.setState({expenses})
        })
        .catch(error => {
            this.context.setError(error.errors)
            this.setState({
              errors: this.context.errors
            })
        })
  }
  
  handleReports = (year, month) => {
    year = parseInt(year);
    month = parseInt(month);

    // set defaults if inputs are invalid
    if(isNaN(year) || isNaN(month)) {
      year = new Date().getFullYear();
      month = new Date().getMonth() + 1;
    }
    this.context.clearError()
    getMonthlyReport(year, month)
      .then(report => {
        this.context.setAllIncomes(report.incomes);
        this.context.setAllExpenses(report.expenses);
      })
      .catch(error => {
        this.context.setError(error)
      })
  }

  handleSetMonth = (month) => {
    this.setState({month, showExpenses: 'monthly'})
    this.handleReports(month.year, month.month)
  }

  handleChangeExpenses = (e) => {
    let showExpenses = e.target.value
    this.setState({showExpenses})
  }

  render() {
    let data = this.state.showExpenses === 'monthly' ? this.context.expenses : this.state.expenses
    return (
      <>
        <section className="page-controls">
          <select onChange={this.handleChangeExpenses}>
            <option value='all'>All Expenses</option>
            <option value='monthly'>Monthly</option>
          </select>
          {this.state.showExpenses === 'monthly' && <MonthPicker setMonth={this.handleSetMonth}/>}
          <Link to="/add#expense">Add expense</Link>
        </section>

        {this.state.showExpenses === 'all' && <BarChart data={data} type="expenses" />}
        
        <section className="page-content">

        {this.state.errors ? <div className="alert-error">{this.state.errors}</div> : ''}

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
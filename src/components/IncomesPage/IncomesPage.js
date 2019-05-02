import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import { getAllIncomes } from '../../services/incomes-service'
import { getMonthlyReport } from '../../services/reports-service';
import DataContext from '../../contexts/DataContext'
import MonthPicker from '../MonthPicker/MonthPicker'

export default class IncomePage extends Component {
  static contextType = DataContext
  state = {
    month: {},
    incomes: [],
    showIncomes: '',
  }

  componentDidMount(){
    this.context.clearError()
    getAllIncomes()
        .then(incomes => {
            this.setState({incomes})
        })
        .catch(error => {
            this.context.setError(error.errors)
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
    this.setState({month, showIncomes: 'monthly'})
    this.handleReports(month.year, month.month)
  }

  handleChangeIncomes = (e) => {
    let showIncomes = e.target.value
    this.setState({showIncomes})
  }


  render() {
    let data = this.state.showIncomes === 'monthly' ? this.context.incomes : this.state.incomes
    return (
      <>
        <section className="page-controls">
        <select onChange={this.handleChangeIncomes}>
            <option value='all'>All Incomes</option>
            <option value='monthly'>Monthly</option>
          </select>
          {this.state.showIncomes === 'monthly' && <MonthPicker setMonth={this.handleSetMonth}/>}
          <Link to="/add#income">Add income</Link>
        </section>
        
        <section className="page-content">
          <IncomeExpenseList type="incomes" data={data}/>
        </section>
      </>
    );
  }
}
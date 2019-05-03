import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import BarChart from '../BarChart/BarChart';
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
    this.setState({showIncomes: 'all'})
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

    updateIncomes = () => {
    this.context.clearError()
    getAllIncomes()
        .then(incomes => {
            this.setState({incomes})
        })
        .catch(error => {
            this.context.setError(error.errors)
        })
    }

  render() {
    let data = this.state.showIncomes === 'monthly' ? this.context.incomes : this.state.incomes

    return <>
      <section className="page-controls">
        <select className="form-control" onChange={this.handleChangeIncomes}>
          <option value='all'>All Incomes</option>
          <option value='monthly'>Monthly</option>
        </select>

        {this.state.showIncomes === 'monthly' && <MonthPicker setMonth={this.handleSetMonth}/>}
        <Link to="/add#income">Add income</Link>
      </section>

      {this.state.showIncomes === 'all' && <BarChart data={data} type="incomes" />}
      
      <section className="page-content">
        {(this.state.incomes.length > 0)
          ? <IncomeExpenseList type="incomes" data={this.state.incomes} updateIncomes={this.updateIncomes}/>
          : <p>There are no items to display</p> 
          }
      </section>
    </>;
  }
}
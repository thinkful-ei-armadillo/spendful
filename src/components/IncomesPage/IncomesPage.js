import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader/loader'
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import BarChart from '../BarChart/BarChart';
import { getAllIncomes } from '../../services/incomes-service'
import { getMonthlyReport } from '../../services/reports-service';
import DataContext from '../../contexts/DataContext'
import MonthPicker from '../MonthPicker/MonthPicker'
import { getAllCategories } from '../../services/categories-service';

export default class IncomePage extends Component {
  static contextType = DataContext
  state = {
    month: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() 
    },
    incomes: [],
    showIncomes: '',
    errors: [],
    isLoading: true
  }


  componentDidMount(){
    this.setState({month: {}, showIncomes: 'all'})
    this.context.clearError()
    this.handleReports(
      this.state.month.year, 
      this.state.month.month + 1 
      )
    getAllIncomes()
      .then(incomes => {
        this.setState({incomes})
        this.setState({isLoading: false})
      })
      .catch(error => {
        this.context.setError(error.errors)
      })
    getAllCategories()
      .then(categories => {
        this.context.setCategories(categories)
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
        this.setState({
          errors: this.context.errors
        })
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


  updateIncomes = (id) => {
    let updatedIncomes = this.state.incomes.filter(income => income.id !== id)
    this.setState({
      incomes: updatedIncomes 
    })
    this.context.deleteIncome(id)
  }


  render() {
    let data = this.state.showIncomes === 'monthly' ? this.context.incomes : this.state.incomes
    let chart = this.state.showIncomes === 'all' ? <BarChart data={data} type="incomes" /> : '';
    
    let content = (
      <>
      <section className="page-controls">
        <select className="form-control" onChange={this.handleChangeIncomes}>
          <option value='all'>All Incomes</option>
          <option value='monthly'>Monthly</option>
        </select>

        {this.state.showIncomes === 'monthly' && <>
          <MonthPicker setMonth={this.handleSetMonth}/>
          <div className="w-100 show-mobile"></div>
        </>}

        <Link className="btn" to="/add#income">Add income</Link>
      </section>

      {this.state.incomes.length > 0 && chart}
    
      <section className="page-content">
        {(data.length > 0)
          ? <IncomeExpenseList type="incomes" data={data} updateIncomes={this.updateIncomes}/>
          : <p className="alert">There are no items to display</p> 
        }
      </section>
    </>
    )
    return <>
      {this.state.isLoading ? <Loader /> : content}
    </>
  }
}
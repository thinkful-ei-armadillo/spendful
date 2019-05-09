import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import Chart from '../Chart/Chart';
import DataContext from '../../contexts/DataContext';
import MonthPicker from '../MonthPicker/MonthPicker'
import { getAllCategories } from '../../services/categories-service';
import { getMonthlyReport } from '../../services/reports-service';
import './DashboardPage.css';
import Loader from '../loader/loader';


export default class DashboardPage extends Component {
  static contextType = DataContext;

  state = {
      month: {
        year: new Date().getFullYear(), 
        month: new Date().getMonth() 
      },
      isLoading: true,
      errors: []
  }

  componentDidMount() {
    this.context.clearError()
    this.handleReports(
      this.state.month.year, 
      this.state.month.month + 1
      )
    getAllCategories()
      .then(categories => {
        this.context.setCategories(categories);
        this.setState({isLoading: false})
      })
      .catch(error => {
        this.context.setError(error)
        
      })
  }

  handleReports = (year, month) => {
    year = parseInt(year);
    month = parseInt(month);

    if(isNaN(year) || isNaN(month)) {
      year = new Date().getFullYear();
      month = new Date().getMonth();
    }

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
    this.setState({month})
    this.handleReports(month.year, month.month)
  }

  render() {
    let date = this.state.month.month + this.state.month.year
    let data = {
      incomes: this.context.incomes,
      expenses: this.context.expenses,
      categories: this.context.categories
    }

    let chartPlaceholder = (
      <p className="alert alert-chart">
        You haven't logged any expenses yet! <Link to="/add#expense">Create an expense</Link> to start tracking
        your balance.
      </p>
    );

    let content = (
      <>
        {this.state.errors ? <div className="alert-error">{this.state.errors}</div> : ''}
        <div className="w-100"></div>

        <section className="page-controls">
          <MonthPicker setMonth={this.handleSetMonth} />
        </section>
        <div className="w-100"></div>

        {this.context.expenses.length > 0 ? <Chart data={data} key={date}/> : chartPlaceholder}

        <section className="page-summaries">
          <IncomeExpenseList type="incomes" data={this.context.incomes} key={'incomes' + date} onlyShowRecent />
          <IncomeExpenseList type="expenses" data={this.context.expenses} key={'expenses' + date} onlyShowRecent />
        </section>
      </>
    )

    return (
      <main className="main-dash">
        {this.state.isLoading ? <Loader /> : content}
      </main>
    )
  }
}
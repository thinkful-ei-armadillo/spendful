import React, { Component } from 'react'; 
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import Chart from '../Chart/Chart';
import DataContext from '../../contexts/DataContext';
import MonthPicker from '../MonthPicker/MonthPicker'
import { getAllCategories } from '../../services/categories-service';
import { getMonthlyReport } from '../../services/reports-service';
import './DashboardPage.css';


export default class DashboardPage extends Component {
  static contextType = DataContext;

  state = {
      month: {
        year: new Date().getFullYear(), 
        month: new Date().getMonth()
      },
      errors: []
  }

  componentDidMount() {
    this.context.clearError()
    getAllCategories()
      .then(categories => {
        this.context.setCategories(categories);
        this.handleReports(this.state.month.year, this.state.month.month)
      })
      .catch(error => {
        this.context.setError(error)
        
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
    // console.log(this.state.month)
    // console.log(data)
    return (
      <main className="flex-main">
        {this.state.errors ? <div className="alert-error">{this.state.errors}</div> : ''}
        <section className="page-controls">
          <MonthPicker setMonth={this.handleSetMonth} />
        </section>

        <div className="w-100"></div>

        <Chart data={data} key={date}/>

        <section className="page-summaries">
          <IncomeExpenseList type="incomes" data={this.context.incomes} key={'incomes' + date} onlyShowRecent />
          <IncomeExpenseList type="expenses" data={this.context.expenses} key={'expenses' + date} onlyShowRecent />
        </section>
      </main>
    );
  }
}
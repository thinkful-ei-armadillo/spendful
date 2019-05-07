import React, { Component } from 'react'; 
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import Chart from '../Chart/Chart';
import DataContext from '../../contexts/DataContext';
import BalanceSheet from '../../components/BalanceSheet/BalanceSheet'
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
    this.handleReports(
      this.state.month.year, 
      this.state.month.month + 1
      )
    getAllCategories()
      .then(categories => {
        this.context.setCategories(categories);
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

    return (
      <main className="flex-main">
        {this.state.errors ? <div className="alert-error">{this.state.errors}</div> : ''}
        <section className="page-controls">
          <MonthPicker setMonth={this.handleSetMonth} />
        </section>
        <div className="w-100"></div>
        {this.context.expenses.length > 0 && <Chart data={data} key={date}/>}
        <section className="page-summaries">
          <IncomeExpenseList type="incomes" data={this.context.incomes} key={'incomes' + date} onlyShowRecent />
          <IncomeExpenseList type="expenses" data={this.context.expenses} key={'expenses' + date} onlyShowRecent />
        </section>
      </main>
    );
  }
}
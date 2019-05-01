import React, { Component } from 'react'; 
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import Chart from '../Chart/Chart';
import DataContext from '../../contexts/DataContext';
import { getAllCategories } from '../../services/categories-service';
import { getMonthlyReport } from '../../services/reports-service';
import './DashboardPage.css';


export default class DashboardPage extends Component {
  static contextType = DataContext;

  state = {
    incomes: [], 
    expenses: [],
    categories: [],
  }

  componentDidMount() {
    getAllCategories()
      .then(categories => {
        this.setState({categories});
        this.handleReports(2019, 5)
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
        this.setState({incomes: report.incomes, expenses: report.expenses});
      })
  }

  // chart is receiving the whole state, which includes
  // incomes, expenses, and catagories
  render() {
    return (
      <main className="flex-main">
        <section className="page-controls">
          <select className="select-month">
            <option>April 2019</option>
          </select>
        </section>

        <div className="w-100"></div>

        <Chart data={this.state} />

        <section className="page-summaries">
          <IncomeExpenseList type="incomes" data={this.state.incomes} onlyShowRecent />
          <IncomeExpenseList type="expenses" data={this.state.expenses} onlyShowRecent />
        </section>
      </main>
    );
  }
}
import React, { Component } from 'react'; 
import {Doughnut} from 'react-chartjs-2'; 
import IncomeExpenseList from '../components/IncomeExpenseList';
import './DashboardPage.css';

export default class Dashboard extends Component {
  state = {
    chart: {
      data: {
        labels: ["Groceries", "Fuel", "Bribes"],
        datasets: [
          {
            label: "Total Expenses",
            backgroundColor: ["#DEB887", "#A9A9A9", "#DC143C"], 
            borderColor: ["#CDA776", "#989898", "#CB252B"],
            data: [200, 150, 1000],
          }
        ],
      },
      options: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 30,
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  }

  render() {
    return (
      <main className="flex-main">
        <section className="page-controls">
          <select className="select-month">
            <option>April 2019</option>
          </select>
        </section>

        <div className="w-100"></div>

        <section className="page-chart">
          <Doughnut data={this.state.chart.data} options={this.state.chart.options} />
        </section>

        <section className="page-summaries">
          <article>
            <h4>Income</h4>
            <IncomeExpenseList type="income" onlyShowRecent />
          </article>
          <article>
            <h4>Expenses</h4>
            <IncomeExpenseList type="expenses" onlyShowRecent />
          </article>
        </section>
      </main>
    );
  }
}
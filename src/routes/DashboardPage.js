import React, { Component } from 'react'; 
import {Doughnut} from 'react-chartjs-2'; 
import IncomeExpenseList from '../components/IncomeExpenseList';
import './DashboardPage.css';

export default class Dashboard extends Component{
  render() {
    const chartData = {
      labels: ["Groceries", "Fuel", "Bribes"],
      datasets: [{
      label: "Total Expenses",
      backgroundColor: ["#DEB887", "#A9A9A9", "#DC143C"], 
      borderColor: ["#CDA776", "#989898", "#CB252B"],
      data: [200, 150, 1000],
      }]} 

    return (
      <main>
        <section className="page-controls">
          <select>
            <option>April 2019</option>
          </select>
        </section>

        <section className="page-chart">
          <Doughnut data={chartData} width={200} height={60}/>        
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
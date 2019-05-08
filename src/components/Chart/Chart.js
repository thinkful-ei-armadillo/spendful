import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2'; 
import DataContext from '../../contexts/DataContext';
import BalanceSheet from '../BalanceSheet/BalanceSheet.js'

export default class Chart extends Component {
  static contextType = DataContext;

  state = {
    category: {},
    categoryColors: {
      0: 'rgba(221,221,221,0.5)',
      1: 'rgba(73, 190, 183, 0.5)',
      2: 'rgba(250, 207, 90, 0.5)',
      3: 'rgba(255, 89, 89, 0.5)',
      4: 'rgba(15, 169, 49, 0.5)',
      5: 'rgba(8, 95, 99, 0.5)',
    },
    chart: {
      data: {
        labels: [],
        datasets: [
          {
            label: "Total Expenses",
            backgroundColor: [],
            data: [],
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
        cutoutPercentage: 75,
        responsive: true,
        maintainAspectRatio: false,
      }
    },
  }


  renderChart = () => {
    let chart = this.state.chart;
    let data = [];
    let labels = [];
    let backgroundColor = [];
    let categories = {}
    const totalExpenses = this.context.expenses.reduce((acc, curr) => acc + parseInt(curr.amount), 0)
    const totalIncomes = this.context.incomes.reduce((acc, curr) => acc + parseInt(curr.amount), 0)
    const balance = totalIncomes - totalExpenses
    categories['Balance'] = balance
    

    this.context.categories.forEach(c => {
      this.context.expenses.forEach(e => {
        if(c.id === e.category_id){
          categories[c.name] = (categories[c.name] || 0) + parseInt(e.amount);
        }
      })
    })

    Object.keys(categories).forEach((cKey, index=0) => {
      labels.push(cKey)
      data.push(categories[cKey])
      backgroundColor.push(this.state.categoryColors[index]);
    })

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].backgroundColor = backgroundColor;

    return <Doughnut data={chart.data} options={chart.options} />;
  }

  render() {
    return (
      <section className="page-chart">
        {this.renderChart()}
        <BalanceSheet />
      </section>
    );
  }
}
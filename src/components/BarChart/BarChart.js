import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2'; 
import DataContext from '../../contexts/DataContext';


export default class BarChart extends Component {
  static contextType = DataContext;

  state = {
    categoryColors: {
      0: '#f04511',
      1: '#5501d0',
      2: '#ff01fa',
      3: '#508fe4',
      4: '#0fa931',
    },
    chart: {
      data: {
        labels: [],
        datasets: [
          {
            label: "Monthly overview",
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
        responsive: true,
        maintainAspectRatio: false,
      }
    },
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.data.expenses.length !== this.props.data.expenses.length) {
  //     this.updateChart();
  //   }
  // }

  renderChart = () => {
    let chart = this.state.chart;
    let data = [];
    let labels = [];
    let backgroundColor = [];
    let categories = {}

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

    return <Bar data={chart.data} options={chart.options} />;
  }

  render() {
    return (
      <section className="page-chart">
        {this.renderChart()}
      </section>
    );
  }
}
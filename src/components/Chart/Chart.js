import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2'; 


export default class Chart extends Component {
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
        responsive: true,
        maintainAspectRatio: false,
      }
    },
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.data.expenses.length !== this.props.data.expenses.length) {
      this.updateChart();
    }
  }

  updateChart = () => {
    let chart = this.state.chart;
    let data = [];
    let labels = [];
    let backgroundColor = [];

    // this is why the chart doesnt render the data properly
    this.props.data.expenses.forEach(item => {
      data.push(parseInt(item.amount));
      labels.push(this.props.data.categories.find(c => c.id === item.category_id).name);
      backgroundColor.push(this.state.categoryColors[item.category_id] || this.state.categoryColors[0]);
    });

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].backgroundColor = backgroundColor;

    this.setState({chart});
  }

  render() {
    return (
      <section className="page-chart">
        <Doughnut data={this.state.chart.data} options={this.state.chart.options} />
      </section>
    );
  }
}
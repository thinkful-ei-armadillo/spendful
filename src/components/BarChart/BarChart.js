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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Total expenses',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40]
          }
        ],
      },
      options: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 12,
            padding: 30,
          }
        },
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            barThickness: 25,
            maxBarThickness: 25,
            minBarLength: 2,
            gridLines: {
                offsetGridLines: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: true,
      }
    },
  }


  renderChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let chart = this.state.chart;
    let data = [...this.props.data]
    let labels = [];

    if(data[0]){
      data.sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date))
      let offset = new Date(data[0].start_date).getMonth()
      console.log('offset:', offset);
      
      for(let i=0; i < months.length; i++) {
        let pointer = (offset - i) % months.length;

        if(pointer < 0) {
          pointer = months.length + pointer
        }

        labels.push(months[pointer]);
      }

      let totals = {};
      let current = new Date(data[0].start_date)

      // get the totals for each month (for bar chart)
      data.forEach((expense, i) => {
        if(data[i + 1]) {
          let next = new Date(data[i + 1].start_date)

          // compare expense to next expense
          if(current.getFullYear() !== next.getFullYear()) {
            current = next;
          }
        }

        // increment the total for this month
        totals[i] = (totals[i] || 0) + parseInt(expense.amount);
      });

      console.log(totals);

      chart.data.labels = labels;
    }
    return <Bar data={chart.data} options={chart.options} />;
  }

  render() {
    // console.log(this.props.data)
    return (
      <section className="page-chart page-bar-chart">
        {this.renderChart()}
      </section>
    );
  }
}
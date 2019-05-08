import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2'; 
import DataContext from '../../contexts/DataContext';
import { getMonthlyReport } from '../../services/reports-service'


export default class BarChart extends Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);

    const barColor = this.props.type === 'incomes' ? '93, 204, 132': '255,99,132';
    const gridLineColor = '0, 0, 0';

    this.state = {
      chart: {
        data: {
          labels: [],
          datasets: [
            {
              label: '',
              backgroundColor: `rgba(${barColor},0.2)`,
              borderColor: `rgba(${barColor},1)`,
              borderWidth: 1,
              hoverBackgroundColor: `rgba(${barColor},0.4)`,
              hoverBorderColor: `rgba(${barColor},1)`,
              data: []
            }
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              barPercentage: 0.5,
              barThickness: 25,
              maxBarThickness: 25,
              minBarLength: 2,
              gridLines: {
                offsetGridLines: true,
                color: `rgb(${gridLineColor}, .1)`,
              }
            }],
            yAxes: [{
              gridLines: {
                color: `rgb(${gridLineColor}, .1)`,
              },
              ticks: {
                beginAtZero:true,
                callback: function(value, index, values) {
                  if(parseInt(value) >= 1000){
                    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  } else {
                    return '$' + value;
                  }
                }
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: true,
        }
      },
    }
  }


  renderChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let chart = this.state.chart
    let data = []
    let labels = []
    let yearsTracker = []
    let monthsTracker = []

 
    let offset = new Date().getMonth()
    let offsetYear = new Date().getFullYear()
    
    for(let i=0; i < months.length; i++) {
      let pointer = (offset - i) % months.length;
      let year = offsetYear
      if(pointer < 0) {
        pointer = months.length + pointer
        year = offsetYear - 1
      } 

      labels.push(months[pointer])
      yearsTracker.push(year)
      monthsTracker.push(pointer)
    }

    console.log(yearsTracker, monthsTracker)

    for(let i=0; i<labels.length; i++){
      getMonthlyReport(yearsTracker[i], monthsTracker[i]+1)
        .then(report => {
          let temp;
          if(this.props.type === "expenses"){
            temp = report.expenses
                              .reduce((acc, curr) => {
                                  if(curr.recurring_rule === 'weekly'){
                                    acc = acc + (parseInt(curr.amount) * 4)
                                  } else if(curr.recurring_rule === 'biweekly'){
                                    acc = acc + (parseInt(curr.amount) * 2)
                                  } else {
                                    acc = acc + parseInt(curr.amount)
                                  }
                                  return acc
                                }, 0)

          } else {
            temp = report.incomes
                              .reduce((acc, curr) => {
                                  if(curr.recurring_rule === 'weekly'){
                                    acc = acc + (parseInt(curr.amount) * 4)
                                  } else if(curr.recurring_rule === 'biweekly'){
                                    acc = acc + (parseInt(curr.amount) * 2)
                                  } else {
                                    acc = acc + parseInt(curr.amount)
                                  }
                                  return acc
                                }, 0)
          }

          console.log(typeof temp)
          data.push(temp)
        })
        .catch(error => {
          if(error.errors) console.log(error.errors)
          else console.log(error)
        })
    }

    
    console.log(data)

    chart.data.datasets[0].data = data
    chart.data.datasets[0].label = `Total ${this.props.type} by month`
    chart.data.labels = labels;

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
import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2'; 
import DataContext from '../../contexts/DataContext';


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
    let chart = this.state.chart;
    let data = [...this.props.data]
    let years = []
    let labels = [];

    if(data[0]){
      data.sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date))
      let offset = new Date().getMonth()
      let offsetYear = new Date(data[0].start_date).getFullYear()
      
      for(let i=0; i < months.length; i++) {
        let pointer = (offset - i) % months.length;
        let year = offsetYear
        if(pointer < 0) {
          pointer = months.length + pointer
          year = offsetYear - 1
        } 

        labels.push(months[pointer])
        years.push(year)
      }

      console.log(years, labels)
      let totals = [];
      for(let i=0; i<labels.length; i++){
        let total = 0;
        data.forEach(d => {
          let m = new Date(d.start_date).getMonth()
          let y = new Date(d.start_date).getFullYear()
          let amount = parseInt(d.amount)
          if(months[m] === labels[i] && y === years[i] && d.recurring_rule === null){
            total = total + amount

          } else if (months[m] === labels[i] && y === years[i] && d.recurring_rule.toLowerCase() === 'monthly'){
            total = total + amount
            for(let i=0; i<totals.length; i++){
              totals[i]+=amount
            }
          }
        })
        totals.push(total)
      }

      console.log(totals)
      chart.data.datasets[0].data = totals
      chart.data.datasets[0].label = `Total ${this.props.type} by month`
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
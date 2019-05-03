import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2'; 
import DataContext from '../../contexts/DataContext';


export default class BarChart extends Component {
  static contextType = DataContext;
  constructor(props){
    super(props)
    let color = this.props.type === 'incomes' ? '93, 204, 132': '255,99,132';
    this.state = {
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
              label: '',
              backgroundColor: `rgba(${color},0.2)`,
              borderColor: `rgba(${color},1)`,
              borderWidth: 1,
              hoverBackgroundColor: `rgba(${color},0.4)`,
              hoverBorderColor: `rgba(${color},1)`,
              data: []
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
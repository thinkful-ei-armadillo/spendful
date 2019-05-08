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
      report: [],
      months: [],
      error: null,
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

  async componentDidMount(){
    this.setState({error: null})
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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

      labels.unshift(months[pointer])
      yearsTracker.unshift(year)
      monthsTracker.unshift(pointer)
    }

    let reports = []
    for(let i=0; i<labels.length; i++){
      await this.handleReport(yearsTracker[i], monthsTracker[i]+1).then(res => {
        reports.push(res)
      })
    }

    this.setState({
      report: reports,
      months: labels
    })
  }

  handleReport = async(year, month) => {
    let report;
    await getMonthlyReport(year, month)
      .then(res => {
        report = res
      })
      .catch(error => {
        this.setState({error: error.errors})
      })

    return report
  }

  renderChart = () => {
    let chart = this.state.chart
    let data = []

    if(this.state.report.length > 0){
      this.state.report.forEach(report => {
        let temp;
        if(this.props.type === "expenses"){
          temp = report.expenses
                        .reduce((acc, curr) => {
                            return acc += parseInt(curr.amount)
                          }, 0)
    
        } else {
          temp = report.incomes
                          .reduce((acc, curr, i) => {
                              return acc += parseInt(curr.amount)
                            }, 0)
        }
        
        data.push(temp)
      })
    }

    // console.log(data)

    chart.data.datasets[0].data = data
    chart.data.datasets[0].label = `Total ${this.props.type} by month`
    chart.data.labels = this.state.months;

    return <Bar data={chart.data} options={chart.options} />;
  }

  render() {
    return (
      <section className="page-chart page-bar-chart">
        {this.state.error !== null && <div className="alert-error">{this.state.error}</div>}
        {this.renderChart()}
      </section>
    );
  }
}
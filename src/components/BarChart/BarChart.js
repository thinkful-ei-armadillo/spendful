import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2'; 
import moment from 'moment-timezone';
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
            display: true,
            position: 'bottom'
          },
          title: {
            display: true,
            text: `${this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)} for the past 12 months`
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
          maintainAspectRatio: false,
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

    labels = labels.map((m, i)=> {
      let year = yearsTracker[i].toString().slice(2)
      return `${m}/${year}`
    })

    let reports = []
    for(let i=0; i<labels.length; i++){
      await this.handleReport(yearsTracker[i], monthsTracker[i]+1).then(res => {
        res.incomes.forEach(income => {
          income.start_date = moment(income.start_date).format('YYYY-MM-DD HH:mm:ss')
          // income.start_date = moment.utc(income.start_date).local().format('YYYY-MM-DD HH:mm:ss')
        })
        res.expenses.forEach(expense => {
          expense.start_date = moment(expense.start_date).format('YYYY-MM-DD HH:mm:ss')
          // expense.start_date = moment.utc(expense.start_date).local().format('YYYY-MM-DD HH:mm:ss')
        })
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
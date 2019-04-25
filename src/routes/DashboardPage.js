import React, { Component } from 'react'; 
import {Doughnut} from 'react-chartjs-2'; 
import IncomeExpenseList from '../components/IncomeExpenseList';
import './DashboardPage.css';
import AppContext from '../components/AppContext';
import config from '../config'
import TokenService from '../services/token-service'


export default class Dashboard extends Component {

  static contextType = AppContext;

  state = {
    chart: {
      data: {
        labels: [],
        datasets: [
          {
            label: "Total Expenses",
            backgroundColor: ["#DEB887", "#A9A9A9", "#DC143C"], 
            borderColor: ["#CDA776", "#989898", "#CB252B"],
            data: [200, 150, 1000],
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
    incomes: [], 
    expenses: [] 
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/categories`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      this.updateChart(json);
    })
  }

  updateChart = (categories) => {
    let chart = this.state.chart;
    let data = [];
    let labels = [];

    // replace fakeResponse with real data
    let fakeResponse = [
      {
          "id": 1,
          "owner_id": 1,
          "category_id": 6,
          "description": "Direct Deposit",
          "amount": "2500.00",
          "recurring_rule": null,
          "created_at": "2019-04-25T15:09:13.328Z",
          "updated_at": "2019-04-25T15:09:13.328Z"
      },
      {
        "id": 1,
        "owner_id": 1,
        "category_id": 4,
        "description": "Direct Deposit",
        "amount": "1500.00",
        "recurring_rule": null,
        "created_at": "2019-04-25T15:09:13.328Z",
        "updated_at": "2019-04-25T15:09:13.328Z"
      },
    ];

    fakeResponse.forEach(item => {
      data.push(parseInt(item.amount));
      labels.push(categories.find(c => c.id === item.category_id).name);
    });

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;

    this.setState({chart});
  }

  // generate

  // generatePieChart = () => {

  // }
handleReports = (year, month) => {
    fetch(`${config.API_ENDPOINT}/reports/2019/4`, {
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      }
    })
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(report => {
      this.setState({
        incomes: report.incomes,
        expenses: report.expenses
      })
      console.log(this.state)
    })
  }


  componentDidMount(){
    this.handleReports(2019, 4);
  }

  render() {
    return (
      <main className="flex-main">
        <section className="page-controls">
          <select className="select-month">
            <option>April 2019</option>
          </select>
        </section>

        <div className="w-100"></div>

        <section className="page-chart">
          <Doughnut data={this.state.chart.data} options={this.state.chart.options} />
        </section>

        <section className="page-summaries">
          <IncomeExpenseList type="income" data={this.state.incomes} onlyShowRecent />
          <IncomeExpenseList type="expenses" data={this.state.expenses} onlyShowRecent />
        </section>
      </main>
    );
  }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../components/IncomeExpenseList';
import config from '../config'
import TokenService from '../services/token-service'
export default class ExpensesPage extends Component {

  state = {
    expenses: []
  }

  getAllExpenses = () => {
    fetch(`${config.API_ENDPOINT}/expenses`, {
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      }
    })
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(expenses => {
      this.setState({
        expenses
      })
    })
  }

  componentDidMount(){
    this.getAllExpenses(); 
  }



  render() {
    return (
      <main>
        <section className="page-controls">
          <select>
            <option>April 2019</option>
          </select>

          <Link to="/add#expense">Add expense</Link>
        </section>
        
        <section className="page-content">
          <IncomeExpenseList type="expenses" data={this.state.expenses} />
        </section>
      </main>
    );
  }
}
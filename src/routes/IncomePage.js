import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../components/IncomeExpenseList';
import config from '../config'
import TokenService from '../services/token-service'
export default class IncomePage extends Component {

  state = {
    incomes: []
  }

  getAllIncomes = () => {
    fetch(`${config.API_ENDPOINT}/incomes`, {
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      }
    })
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(incomes => {
      this.setState({
        incomes
      })
    })
  }

  componentDidMount(){
    this.getAllIncomes(); 
  }

  render() {
    return (
      <main>
        <section className="page-controls">
          <select>
            <option>April 2019</option>
          </select>

          <Link to="/add#income">Add income</Link>
        </section>
        
        <section className="page-content">
          <IncomeExpenseList type="income" data={this.state.incomes}/>
        </section>
      </main>
    );
  }
}
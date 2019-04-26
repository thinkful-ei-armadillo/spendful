import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../config'
import TokenService from '../services/token-service'

class AddItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'income',
      categories: {
        income: [],
        expense: [],
      },
    }
  }

  componentDidMount() {
    const validTypes = ['category', 'income', 'expense'];
    const hash = this.props.location.hash.substr(1);
    if(validTypes.includes(hash)) {
      this.setState({type: hash});
    }
    this.getCategories()
    document.getElementById('input-category').value = 0;
  }

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value 
    });

    document.getElementById('input-category').value = 0;
  }

  getCategories = () => {
    fetch(`${config.API_ENDPOINT}/categories`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(data => {
      let income = data.filter(category => category.type === 'income').map(filtered => filtered.name)
      let expense = data.filter(category => category.type === 'expense').map(filtered => filtered.name)
      this.setState({
        categories: {
        income, 
        expense
        }
      })
    })
  }

  handleCategoryChange = (e) => {
    if(e.target.value == -1) {
      const newCategory = prompt('Enter the name for the new category:');
      console.log(prompt); 
      fetch(`${config.API_ENDPOINT}/categories`, {
        headers: {
          'Authorization': `bearer ${TokenService.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({name: newCategory, type: this.state.type})
      })
      .then(()=> {
        let categories = this.state.categories;
        categories[this.state.type] = [...categories[this.state.type], newCategory] 
        this.setState({
          categories
          })
        document.getElementById('input-category').value = newCategory;  
        })
    }
  }

  renderForm = () => {
    return <>
      <label htmlFor="input-category">Category</label>
      <select id="input-category" onChange={this.handleCategoryChange}>
        <option value="0" disabled>Please select a category</option>
        {this.state.categories[this.state.type]
          .map(category => <option key={category}>{category}</option>)}
        <option value="-1">create new category...</option>
      </select>

      <label htmlFor="input-date">Date</label>
      <input type="date" id="input-date" />

      <label htmlFor="input-description">Short description (max 50 chars.)</label>
      <input type="text" id="input-description" maxLength="50" />

      <label htmlFor="input-amount">Amount</label>
      <input type="number" id="input-amount" />

      <label htmlFor="input-freq">Frequency</label>
      <select id="input-freq">
        <option>Bi-weekly</option>
        <option>Monthly</option>
      </select>

      <button type="submit">Create</button>
    </>;
  }

  render() {
    return (
      <main className="flex-main">
        <form className="flex-form">
          <label htmlFor="input-type">I want to add...</label>
          <select id="input-type" onChange={this.handleTypeChange} value={this.state.type}>
            {Object.keys(this.state.categories).map(type => 
              <option key={type}>{type}</option>)}
          </select>

          <hr></hr>
          {this.renderForm()}
        </form>
      </main>
    );
  }
}

export default withRouter(AddItemPage);
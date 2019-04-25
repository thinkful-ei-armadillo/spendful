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
        income: ['paycheck', 'personal'],
        expense: ['groceries', 'clothing', 'recreation'],
      },
    }
  }

  componentDidMount() {
    const validTypes = ['category', 'income', 'expense'];
    const hash = this.props.location.hash.substr(1);

    if(validTypes.includes(hash)) {
      this.setState({type: hash});
    }
  }

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value 
    })
  }

  handleCategoryChange = (e) => {
    if(e.target.value === -1) {
      const newCategory = prompt('Enter the name for the new category:');
      

      // POST to create category
    }
  }

  addNewCategory = () => {
    const addCategory = 
    fetch(`${config.API_ENDPOINT}/categories`, {
      method: 'POST',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(newCategory)
    }) 

  }

  renderForm = () => {
    return <>
      <label htmlFor="input-category">Category</label>
      <select id="input-category" onChange={this.handleCategoryChange}>
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
        <form className="flex-form" onSubmit=>
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
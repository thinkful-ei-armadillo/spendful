import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../config'
import TokenService from '../services/token-service'






class AddItemPage extends Component {

 


  constructor(props) {
    super(props);

    this.state = {
      category_id: '',
      type: 'income',
      amount: null,
      description: '',
      start_date: '',
      categories: {
        income: [],


        

        expense: [],


      },
      recurring_rule: 'MONTHLY',
      income_category: null,
      expense_category: null
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
      let income = data.filter(category => category.type === 'income').map(filtered => { 
        return {
          id: filtered.id,
          name: filtered.name 
        } 
      }
      )
      let expense = data.filter(category => category.type === 'expense').map(filtered => {
        return {
          id: filtered.id,
          name: filtered.name 
        } 
      })
      this.setState({
        categories: {
        income, 
        expense
        }
      })
    })


  }

  handleIdChange = () => {
    const expenseId = this.state.expense_category;
    const incomeId = this.state.income_category;

    if(!expenseId){
      this.setState({
        id: incomeId
      })
    } else {
      this.setState({
        id: expenseId
      })
    }

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
      let income = data.filter(category => category.type === 'income').map(filtered => { 
        return {
          id: filtered.id,
          name: filtered.name 
        } 
      }
      )
      let expense = data.filter(category => category.type === 'expense').map(filtered => {
        return {
          id: filtered.id,
          name: filtered.name 
        } 
      })
      this.setState({
        categories: {
        income, 
        expense
        }
      })
    })
    document.getElementById('input-category').value = 0;
    console.log(this.state.type);
    console.log(`${config.API_ENDPOINT}/${this.state.type}s`);
  }

  handleIdChange = () => {
    const expenseId = this.state.expense_category;
    const incomeId = this.state.income_category;

    if(!expenseId){
      this.setState({
        id: incomeId
      })
    } else {
      this.setState({
        id: expenseId
      })
    }

  }
  

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value 
    })
    document.getElementById('input-category').value = 0;
    console.log(this.state.type);
    console.log(`${config.API_ENDPOINT}/${this.state.type}s`);
  }

  handleCategoryChange = (e) => {
    if(e.target.value === -1) {
      const newCategory = prompt('Enter the name for the new category:');


       // POST to create category
       fetch(`${config.API_ENDPOINT}/categories`, {

        headers: {
          'Authorization': `bearer ${TokenService.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',

        body: JSON.stringify({name: newCategory.name, type: this.state.type})
      })


    }
    
    if (this.state.type === 'income') {
      this.setState({
       income_category: e.target.value,
       category_id: e.target.value
      })
      console.log(this.state.income_category)
    } else {
      this.setState({
        expense_category: e.target.value,
        category_id: e.target.value
      })
      console.log(this.state.expense_category)

     
    }
    console.log(this.state.categories[this.state.type])
  }

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value
    })
    console.log(this.state.amount);
  }

  handleDateChange = (e) => {
    this.setState({
      start_date: e.target.value
    })
    console.log(this.state.start_date);
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
    console.log(this.state.description)
  }

  handleFreqChange = (e) => {
    let time = e.target.value;
    this.setState({
      recurring_rule: time
    })
    console.log(this.state.recurring_rule)
  }

  addNewItem = () => {
    this.handleIdChange();
    const { history } = this.props;
    
    const addCategory = {
      category_id: this.state.category_id,
      description: this.state.description,
      amount: this.state.amount,
      start_date: this.state.start_date,
      recurring_rule: this.state.recurring_rule
    };
    
    console.log(addCategory);
    const type = this.state.type;

    fetch(`${config.API_ENDPOINT}/${type}s/`, {
      method: 'POST',
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(addCategory)
    })
    .then(res =>{
      return (!res.ok) ? res.json().then(e => Promise.reject(e))
      : res.json()  
    })
    .then(resJson => {
      console.log('Item Added');
    })
    .then(
      history.push(`./${type}s`)
    ) 

  }

  renderForm = () => {
    return <>
      <label htmlFor="input-category">Category</label>

      <select id="input-category" onChange={this.handleCategoryChange}>
        <option value="0" disabled>Please select a category</option>

        {this.state.categories[this.state.type]
          .map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        <option value="-1">create new category...</option>
      </select>

      <label htmlFor="input-date">Date</label>
      <input type="date" id="input-date" onChange={this.handleDateChange}/>

      <label htmlFor="input-description">Short description (max 50 chars.)</label>
      <input type="text" id="input-description" maxLength="50" onChange={this.handleDescriptionChange}/>

      <label htmlFor="input-amount">Amount</label>
      <input type="number" id="input-amount" onChange={this.handleAmountChange}/>

      <label htmlFor="input-freq">Frequency</label>
      <select id="input-freq" onChange={this.handleFreqChange}>
        <option value='BI-WEEKLY'>Bi-weekly</option>
        <option value='MONTHLY'>Monthly</option>
      </select>

      <button type="submit">Create</button>
    </>;
  }

  render() {
    return (
      <main className="flex-main">
        <form className="flex-form" onSubmit={() => this.addNewItem()}>
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
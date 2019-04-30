import React, { Component } from 'react'
import IncomesService from '../../services/incomes-service'
import ExpensesService from '../../services/expenses-service'


export default class AddItemForm extends Component{

  constructor(props) {
    super(props)

    this.state = {
      category_id: '',
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

  // handleAmountChange = (e) => {
  //   this.setState({
  //     amount: e.target.value
  //   })
  //   console.log(this.state.amount);
  // }

  // handleDateChange = (e) => {
  //   this.setState({
  //     start_date: e.target.value
  //   })
  //   console.log(this.state.start_date);
  // }

  // handleDescriptionChange = (e) => {
  //   this.setState({
  //     description: e.target.value
  //   })
  //   console.log(this.state.description)
  // }

  // handleFreqChange = (e) => {
  //   let time = e.target.value;
  //   this.setState({
  //     recurring_rule: time
  //   })
  //   console.log(this.state.recurring_rule)
  // }

  onSubmit = (ev) => {
    ev.preventDefault(); 

    const { description, amount, start_date, recurring_rule } = ev.target

    const newItem = {
      category_id: 1,
      description: description.value,
      amount: amount.value,
      start_date: start_date.value,
      recurring_rule: recurring_rule.value
    };

    if (this.props.itemType === "income") {
      IncomesService.createIncome(newItem)
        .then(() =>{
          console.log("I ran")
          this.props.onSuccess('/incomes')
        })
        .catch(err => {
          console.log("I ran")
          this.props.onFailure(err.errors)
        })
    } else {
        ExpensesService.createExpense(newItem)
        .then(() => {
          this.props.onSuccess('/expenses')
        }) 
        .catch(err => {
          this.props.onFailure(err.errors)
        })
      }
  }

  render(){
    return(
    <form className="flex-form" onSubmit={this.onSubmit}>
      <h2>Add {this.props.itemType}</h2>
      <label htmlFor="input-category">Category</label>

      <select id="input-category">
        <option value="0" disabled>Please select a category</option>

        {this.state.categories[this.props.itemType]
          .map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        <option value="-1">create new category...</option>
      </select>

      <label htmlFor="start_date">Date</label>
      <input type="date" id="start_date"/>

      <label htmlFor="description">Short description (max 50 chars.)</label>
      <input type="text" id="description" maxLength="50" />

      <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" />

      <label htmlFor="recurring_rule">Frequency</label>
      <select id="recurring_rule">
        <option value='BI-WEEKLY'>Bi-weekly</option>
        <option value='MONTHLY'>Monthly</option>
      </select>

      <button type="submit">Create</button>
    </form>
    ) 
  }
}
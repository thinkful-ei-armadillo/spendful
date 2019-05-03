import React, { Component } from 'react'
import * as IncomesService from '../../services/incomes-service'
import * as ExpensesService from '../../services/expenses-service'
import CategorySelect from '../CategorySelect/CategorySelect';
import moment from 'moment-timezone'

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

  onSubmit = (ev) => {
    ev.preventDefault();

    const { category, description, amount, start_date, recurring_rule } = ev.target

    try {
      let startDate = moment(start_date.value).tz('UTC').format()
      const newItem = {
        category_id: category.value,
        description: description.value,
        amount: amount.value,
        start_date: startDate,
        recurring_rule: recurring_rule.value
      };

      if (this.props.itemType === "income") {
        IncomesService.createIncome(newItem)
          .then(() =>{
            this.props.onSuccess('/incomes')
          })
          .catch(err => {
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
    } catch{
      this.props.onFailure("Category does not exist")
    }
  }

  render(){
    return(
    <form className="flex-form" onSubmit={this.onSubmit}>
      <h2>Add {this.props.itemType}</h2>
      <label htmlFor="input-category">Category</label>

      <CategorySelect id="category" type={this.props.itemType} />

      <label htmlFor="start_date">Date</label>
      <input type="date" id="start_date"/>

      <label htmlFor="description">Short description (max 50 chars.)</label>
      <input type="text" id="description" maxLength="50" />

      <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" />

      <label htmlFor="recurring_rule">Frequency</label>
      <select id="recurring_rule">
        <option value=""></option>
        <option value="once">Once</option>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="biweekly">Biweekly</option>
        <option value="weekly">Weekly</option>
      </select>

      <button id="flex-form-button" type="submit">Create</button>
    </form>
    )
  }
}

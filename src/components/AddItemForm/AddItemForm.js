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

  /* 
  
Assumption all error response bodies look like this
  application/json
  {
    errors: [
      'error message 1',
      'possibly another error message'
    ]
  }

This is not true for 500 level-errors
  */

  onSubmit = (ev) => {
    ev.preventDefault();

    const { category, description, amount, start_date, end_date, recurring_rule } = ev.target

    let startDate = moment(start_date.value).tz('UTC').format()
    let endDate   = (end_date.value) ? moment(end_date.value).tz('UTC').format() : null;
    const newItem = {
      category_id: category.value,
      description: description.value,
      amount: amount.value,
      start_date: startDate,
      end_date: endDate,
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
  }

  render(){
    return(
    <form className="flex-form" onSubmit={this.onSubmit}>
      <h2>Create new item</h2>
      <label htmlFor="input-category">Category</label>

      <CategorySelect id="category" type={this.props.itemType} />

      <label htmlFor="start_date">Start Date</label>
      <input required type="date" id="start_date"/>

      <label htmlFor="end_date">End Date (Optional)</label>
      <input type="date" id="end_date"/>

      <label htmlFor="description">Short description (max 50 chars.)</label>
      <input required type="text" id="description" maxLength="50" />

      <label htmlFor="amount">Amount</label>
      <input required type="number" id="amount" />

      <label htmlFor="recurring_rule">Frequency</label>
      <select required id="recurring_rule">
        <option value=""></option>
        <option value="once">Once</option>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="biweekly">Biweekly</option>
        <option value="weekly">Weekly</option>
      </select>

      <button id="flex-form-button" className="btn btn-submit" type="submit">Create</button>
    </form>
    )
  }
}

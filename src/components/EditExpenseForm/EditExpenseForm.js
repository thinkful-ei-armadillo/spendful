import React from 'react';
import moment from 'moment-timezone';
import CategorySelect from '../CategorySelect/CategorySelect';
import * as ExpensessService from '../../services/expenses-service';

class EditExpenseForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expense: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
  }

  componentDidMount() {

    ExpensessService
      .getExpense(this.props.expenseId)
      .then((expense) => {

        if (expense.recurring_rule === null) {
          expense.recurring_rule = 'once';
        }

        // Create local date from input UTC data, format it
        expense.start_date = moment(expense.start_date).format('YYYY-MM-DD');
        expense.end_date   = moment(expense.end_date).format('YYYY-MM-DD');

        this.setState({ expense });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  handleCategoryChange(ev) {
    const id = parseInt(ev.target.value);

    if(! isNaN(id)) {
      const expense = this.state.expense;
      expense.category_id = id;
  
      this.setState({ expense });
    }
  }

  handleFrequencyChange(ev) {
    const expense = this.state.expense;
    expense.recurring_rule = ev.target.value;

    this.setState({ expense });
  }

  onSubmit(ev) {
    ev.preventDefault();

    // Take form input string in YYYY-MM-DD format, create moment object,
    // translate to UTC, output string in default ISO 8601 format
    const startDate = moment(ev.target.startDate.value).tz('UTC').format();
    const endDate   = (ev.target.endDate.value) ? moment(ev.target.endDate.value).tz('UTC').format() : null;

    let recurring_rule = ev.target.frequency.value;
    if (recurring_rule === 'once') {
      recurring_rule = null;
    }

    const updates = {
      description    : ev.target.description.value,
      amount         : ev.target.amount.value,
      category_id    : ev.target.category.value,
      start_date     : startDate,
      end_date       : endDate,
      recurring_rule : recurring_rule,
    };

    ExpensessService
      .updateExpense(this.props.expenseId, updates)
      .then(() => {
        this.props.onSuccess();
      })
      .catch((err) => {
        this.props.onFailure(err);
      });
  }

  render() {

    return (
      <form className="flex-form" onSubmit={this.onSubmit}>

      <h2>Edit expense</h2>

      <label htmlFor="description">Short description (max 50 chars.)</label>
      <input type="text" id="description" name="description" maxLength="50" defaultValue={this.state.expense.description} />
      
      <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" name="amount" defaultValue={this.state.expense.amount} step=".01" min=".01"/>

      <label htmlFor="input-category">Category</label>
      <CategorySelect type="expense" id="category" name="category" value={`${this.state.expense.category_id}`} handleChange={this.handleCategoryChange} />

      <label htmlFor="startDate">Start Date</label>
      <input type="date" id="startDate" name="startDate" defaultValue={this.state.expense.start_date} />

      <label htmlFor="endDate">End Date (Optional)</label>
      <input type="date" id="endDate" name="endDate" defaultValue={this.state.expense.end_date} />

      <label htmlFor="frequency">Frequency</label>
      <select id="frequency" name="frequency" value={this.state.expense.recurring_rule} onChange={this.handleFrequencyChange} >
        <option value=""></option>
        <option value="once">Once</option>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="biweekly">Biweekly</option>
        <option value="weekly">Weekly</option>
      </select>

      <button className="btn btn-submit" type="submit">Save</button>
    </form>
    );
  }
}

export default EditExpenseForm;

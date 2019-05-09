import React from 'react';
import moment from 'moment-timezone';
import CategorySelect from '../CategorySelect/CategorySelect';
import * as IncomesService from '../../services/incomes-service';

class EditIncomeForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      income: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
  }

  componentDidMount() {

    IncomesService
      .getIncome(this.props.incomeId)
      .then((income) => {

        if (income.recurring_rule === null || income.recurring_rule === '') {
          income.recurring_rule = 'once';
        }

        // Create local date from input UTC data, format it
        income.start_date = moment(income.start_date).format('YYYY-MM-DD');
        income.end_date   = moment(income.end_date).format('YYYY-MM-DD');

        this.setState({ income });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  handleCategoryChange(ev) {
    const income = this.state.income;
    income.category_id = ev.target.value;

    this.setState({ income });
  }

  handleFrequencyChange(ev) {
    const income = this.state.income;
    income.recurring_rule = ev.target.value;

    this.setState({ income });
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

    IncomesService
      .updateIncome(this.props.incomeId, updates)
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

      <h2>Edit income</h2>

      <label htmlFor="description">Short description (max 50 chars.)</label>
      <input type="text" id="description" name="description" maxLength="50" defaultValue={this.state.income.description} />

      <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" name="amount" defaultValue={this.state.income.amount} step=".01" min=".01"/>
      
      <label htmlFor="input-category">Category</label>
      <CategorySelect type="income" id="category" name="category" value={`${this.state.income.category_id}`} onChange={this.handleCategoryChange} />

      <label htmlFor="startDate">Start Date</label>
      <input type="date" id="startDate" name="startDate" defaultValue={this.state.income.start_date} />

      <label htmlFor="endDate">End Date (Optional)</label>
      <input type="date" id="endDate" name="endDate" defaultValue={this.state.income.end_date} />

      <label htmlFor="frequency">Frequency</label>
      <select id="frequency" name="frequency" value={this.state.income.recurring_rule} onChange={this.handleFrequencyChange} >
        <option value=""></option>
        <option value="once">Once</option>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="biweekly">Biweekly</option>
        <option value="weekly">Weekly</option>
      </select>

      <button type="submit" className="btn btn-submit">Save</button>
    </form>
    );
  }
}

export default EditIncomeForm;

import React from 'react';
import {DateTime} from 'luxon';
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

        if (income.recurring_rule === null) {
          income.recurring_rule = 'once';
        }

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

    const pieces = ev.target.startDate.value.split('-');

    const local = DateTime.local(
      Number.parseInt(pieces[0], 10),
      Number.parseInt(pieces[1]+1, 10),
      Number.parseInt(pieces[2], 10)
    );
    const utc   = local.setZone('UTC');

    const updates = {
      description    : ev.target.description.value,
      amount         : ev.target.amount.value,
      category_id    : ev.target.category.value,
      start_date     : utc.toISO(),
      recurring_rule : ev.target.frequency.value,
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

    // FIXME bad bad bad
    let start_date;
    if (this.state.income.start_date) {
      start_date = this.state.income.start_date.slice(0, 10);
    } else {
      start_date = null;
    }


    return (
      <form className="flex-form" onSubmit={this.onSubmit}>

      <h2>Edit income</h2>

      <label htmlFor="input-category">Category</label>
      <CategorySelect type="income" id="category" name="category" value={`${this.state.income.category_id}`} onChange={this.handleCategoryChange} />

      <label htmlFor="startDate">Date</label>
      <input type="date" id="startDate" name="startDate" defaultValue={start_date} />

      <label htmlFor="description">Short description (max 50 chars.)</label>
      <input type="text" id="description" name="description" maxLength="50" defaultValue={this.state.income.description} />

      <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" name="amount" defaultValue={this.state.income.amount} />

      <label htmlFor="frequency">Frequency</label>
      <select id="frequency" name="frequency" value={this.state.income.recurring_rule} onChange={this.handleFrequencyChange} >
        <option value=""></option>
        <option value="once">Once</option>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="biweekly">Biweekly</option>
        <option value="weekly">Weekly</option>
      </select>

      <button type="submit">Save</button>
    </form>
    );
  }
}

export default EditIncomeForm;

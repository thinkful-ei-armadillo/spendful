import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IncomeExpenseList.css';
import DataContext from '../../contexts/DataContext';
import { getAllCategories } from '../../services/categories-service';
import { deleteExpense } from '../../services/expenses-service';
import { deleteIncome } from '../../services/incomes-service'

class ListItem extends Component {
  static contextType = DataContext;

  render() {
    let classname = '';
    let prefix = '';
    let extras = '';


    if(this.props.type === 'expenses') {
      classname += 'list-expense';
      prefix = '➖';
    } else {
      classname += 'list-income';
      prefix = '💵';
    }

    // only show extras if list is NOT recent only
    if(! this.props.recentOnly) {
      let date = new Date(this.props.item.start_date).toDateString();
      let category = this.context.categories.find(c => c.id === this.props.item.category_id);

      extras = <>
        <p>{date}</p>
        <p>{category ? category.name : 'n/a'}</p>
        <p>{this.props.item.recurring_rule || 'never'}</p>
        <p><Link to={`/edit_${this.props.type.slice(0, this.props.type.length-1)}/${this.props.item.id}`}>Edit</Link></p>
        <button onClick={() => this.props.deleteItem(this.props.item.id)} type="button">Delete</button>
      </>;
    }

    return (
      <li className={classname}>
        <p>{prefix} {this.props.item.description}</p>
        <p className={this.props.type === 'incomes' ? 'text-green' : 'text-red'}>${this.props.item.amount}</p>
        <p className="w-100 show-mobile"></p>
        {extras}
      </li>
    );
  }
}


export default class IncomeExpenseList extends Component {
  static contextType = DataContext;

  componentDidMount() {
    getAllCategories()
      .then(categories => {
        this.context.setCategories(categories);
      });

  }

  deleteItem = (itemId) => {
    if (this.props.type === 'incomes'){
      deleteIncome(itemId)
      this.props.updateIncomes()
    }
    else{
      deleteExpense(itemId)
      this.props.updateExpenses() 
    }
  }

  render() {
    // limit the number of items if onlyShowRecent = true
    let data = this.props.onlyShowRecent ? this.props.data.slice(0, 5) : this.props.data;

    return <>
      <article className={this.props.onlyShowRecent ? 'item-list-dash' : ''}>
        {this.props.onlyShowRecent ? <h4>{this.props.type}</h4> : ''}
        {this.props.onlyShowRecent && data.length === 0 ? <p>There are no items to display.</p> : ''}

        <ul className="item-list">
          {data.map((item, i) => 
            <ListItem deleteItem={this.deleteItem} item={item} type={this.props.type} recentOnly={this.props.onlyShowRecent} key={i} />)}

        </ul>

        {this.props.onlyShowRecent ? <Link className="recent-link" to={'/' + this.props.type}>See all {this.props.type}</Link> : ''}
      </article>

    </>;
  }
}

// IncomeExpenseList.defaultProps = {
//   type: 'income',
//   onlyShowRecent: false,
//   data: [],
// }

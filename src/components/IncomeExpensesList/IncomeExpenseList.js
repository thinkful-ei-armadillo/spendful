import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IncomeExpenseList.css';
import DataContext from '../../contexts/DataContext';
// import { getAllCategories } from '../../services/categories-service';
import { deleteExpense } from '../../services/expenses-service';
import { deleteIncome } from '../../services/incomes-service'

class ListItem extends Component {
  static contextType = DataContext;

  render() {
    const dateString = this.props.item.occurrence_date || this.props.item.start_date
    let listClassname = '';
    let amountClassname = this.props.type === 'incomes' ? 'text-green' : 'text-red';
    let titlePrefix = '';
    let details = '';
    let buttons = '';
    let date = new Date(dateString).toLocaleDateString();

    if(this.props.type === 'expenses') {
      listClassname += 'list-expense';
      titlePrefix = <i className="fas fa-wallet"></i>;
    } else {
      listClassname += 'list-income';
      titlePrefix = <i className="fas fa-money-bill-alt"></i>;
    }

    // only show details if list is NOT recent only
    if(! this.props.recentOnly) {
      let category = this.context.categories.find(c => c.id === this.props.item.category_id);

      details = <>
        <p>{category ? category.name : 'n/a'}</p>
        <p>{this.props.item.recurring_rule || 'once'}</p>
      </>;

      const deleteHandler = (ev) => {
        ev.preventDefault();
        this.props.deleteItem(this.props.item.id);
      }

      buttons = <>
        <a href={`/${this.props.type}`} onClick={deleteHandler}><i className="fas fa-trash"></i></a>

        <Link to={`/edit_${this.props.type.slice(0, -1)}/${this.props.item.id}`}>
          <i className="fas fa-edit"></i>
        </Link>
      </>;
    }

    return (
      <li className={listClassname}>
        <div className="list-data">
          <p className="item-title">{titlePrefix} {this.props.item.description}</p>
          {details}

          <summary>
            <p className="item-date">{date}</p>
            <p className={amountClassname}>${this.props.item.amount}</p>
          </summary>
        </div>

        <div className="w-100"></div>
        <div className="list-controls">
          {buttons}
        </div>
      </li>
    );
  }
}


export default class IncomeExpenseList extends Component {
  static contextType = DataContext;

  state = {
    errors: []
  }



  deleteItem = (itemId) => {
    if (this.props.type === 'incomes'){
      deleteIncome(itemId)
      .then(() => {this.props.updateIncomes(itemId)})
    }
    else{
      deleteExpense(itemId)
      .then(() => {this.props.updateExpenses(itemId)})
    }
  }

  render() {
    // limit the number of items if onlyShowRecent = true
    let data = this.props.onlyShowRecent ? this.props.data.slice(0, 5) : this.props.data;

    return <>
      <article className={this.props.onlyShowRecent ? 'item-list-dash' : 'item-list-details'}>
        {this.props.onlyShowRecent && <h4>{this.props.type}</h4>}

        {(this.props.onlyShowRecent && data.length === 0) && <p>There are no items to display.</p>}

        <ul className="item-list">
          {data.map((item, i) =>
            <ListItem deleteItem={this.deleteItem} item={item} type={this.props.type} recentOnly={this.props.onlyShowRecent} key={i} />)}

            <Link className="list-add" to={`/add#${this.props.type.slice(0, -1)}`}>
              <li><i className="far fa-plus-square"></i></li>
            </Link>
        </ul>

        {this.props.onlyShowRecent &&
          <Link className="recent-link" to={'/' + this.props.type}>See all {this.props.type}</Link>}
      </article>
    </>;
  }
}

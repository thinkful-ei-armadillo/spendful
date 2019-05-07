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
    let classname = '';
    let prefix = '';
    let extraInfo = '';
    let controls = '';


    if(this.props.type === 'expenses') {
      classname += 'list-expense';
      prefix = <i className="fas fa-wallet"></i>;
    } else {
      classname += 'list-income';
      prefix = <i className="fas fa-money-bill-alt"></i>;
    }

    // only show extraInfo if list is NOT recent only
    if(! this.props.recentOnly) {
      let date = new Date(this.props.item.start_date).toLocaleDateString();
      let category = this.context.categories.find(c => c.id === this.props.item.category_id);

      extraInfo = <>
        <p>{date}</p>
        <div className="w-100"></div>
        <p>{category ? category.name : 'n/a'}</p>
        <p>{this.props.item.recurring_rule || 'once'}</p>
      </>;

      controls = <>
        <Link to={`/edit_${this.props.type.slice(0, this.props.type.length-1)}/${this.props.item.id}`}>
          <i className="fas fa-edit"></i>
        </Link>
        <a href={`/${this.props.type}`} onClick={() => this.props.deleteItem(this.props.item.id)}><i className="fas fa-trash"></i></a>
      </>;
    }

    return (
      <li className={classname}>
        <div className="list-data">
          <p className="item-title">{prefix} {this.props.item.description}</p>
          <p className={this.props.type === 'incomes' ? 'text-green' : 'text-red'}>${this.props.item.amount}</p>
          {extraInfo}
        </div>
        <div className="list-controls">
          {controls}
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

  // componentDidMount() {
  //   getAllCategories()
  //     .then(categories => {
  //       this.context.setCategories(categories);
  //     })
  //     .catch(error => {
  //       this.context.setError(error)
  //       this.setState({
  //         errors: this.context.errors
  //       })
  //     });
  // }

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

// IncomeExpenseList.defaultProps = {
//   type: 'income',
//   onlyShowRecent: false,
//   data: [],
// }

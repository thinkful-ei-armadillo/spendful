import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IncomeExpenseList.css';

function ListItem(props) {
  // in the future, props.item will probably be an object
  let classname = '';
  let prefix = '';
  let extras = '';

  if(props.type === 'expenses') {
    classname += 'list-expense';
    prefix += '➖';
  } else {
    classname += 'list-income';
    prefix += '💵';
  }

  // only show extras if list is NOT recent only
  if(! props.recentOnly) {
    extras = <>
      <p>(date)</p>
      <p>(category)</p>
      <p>(recurring)</p>
    </>;
  }

  return (
    <li className={classname}>
      <p>{prefix} {props.item.description}</p>
      <p className={props.type === 'income' ? 'text-green' : 'text-red'}>${props.item.amount}</p>
      <p className="w-100 show-mobile"></p>
      {extras}
    </li>
  );
}


// TODO: onlyShowRecents = true should limit # of items
export default class IncomeExpenseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  // componentDidMount() {
  //   if(this.props.type === 'income') {
  //     // fetch call goes here (GET /api/income/etc...)
  //     this.setState({data:['testincome1', 'testincome2', 'testincome3', 'testincome4']});
  //   } else if(this.props.type === 'expenses') {
  //     // fetch call goes here (GET /api/expenses/etc...)
  //     this.setState({data:['testexpense1', 'testexpense2', 'testexpense3', 'testexpense4', 'test5']});
  //   }
  // }

  render() {
    //<ul className={this.props.onlyShowRecent ? 'item-list-recent' : 'item-list'}>
    return <>
      <article className={this.props.onlyShowRecent ? 'item-list-dash' : ''}>
        {this.props.onlyShowRecent ? <h4>{this.props.type}</h4> : ''}

        <ul className="item-list">
          {this.props.data.map((item, i) => <ListItem item={item} type={this.props.type} recentOnly={this.props.onlyShowRecent} key={i} />)}
        </ul>

        {this.props.onlyShowRecent ? <Link className="recent-link" to={'/' + this.props.type}>See all {this.props.type}</Link> : ''}
      </article>

    </>;
  }
}

IncomeExpenseList.defaultProps = {
  type: 'income',
  onlyShowRecent: false,
  data: [],
}
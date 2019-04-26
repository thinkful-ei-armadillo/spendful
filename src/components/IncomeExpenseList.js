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

  render() {
    let data = this.props.onlyShowRecent ? this.props.data.slice(0, 5) : this.props.data;

    return <>
      <article className={this.props.onlyShowRecent ? 'item-list-dash' : ''}>
        {this.props.onlyShowRecent ? <h4>{this.props.type}</h4> : ''}

        <ul className="item-list">
          {data.map((item, i) => 
            <ListItem item={item} type={this.props.type} recentOnly={this.props.onlyShowRecent} key={i} />)}
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
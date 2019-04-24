import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <p>{prefix} {props.item}</p>
      {extras}
      <p>$350</p>
    </li>
  );
}

export default class IncomeExpenseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    if(this.props.type === 'income') {
      // fetch call goes here (GET /api/income/etc...)
      this.setState({data:['testincome1', 'testincome2']});
    } else if(this.props.type === 'expenses') {
      // fetch call goes here (GET /api/expenses/etc...)
      this.setState({data:['testexpense1', 'testexpense2']});
    }
  }

  render() {
    //<ul className={this.props.onlyShowRecent ? 'item-list-recent' : 'item-list'}>
    return <>
      <ul className="item-list">
        {this.state.data.map((item, i) => <ListItem item={item} type={this.props.type} recentOnly={this.props.onlyShowRecent} key={i} />)}
      </ul>

      {this.props.onlyShowRecent ? <Link to={'/' + this.props.type}>See all {this.props.type}</Link> : ''}
    </>;
  }
}

IncomeExpenseList.defaultProps = {
  type: 'income',
  onlyShowRecent: false,
}
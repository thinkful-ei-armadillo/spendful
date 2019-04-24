import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AddItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'category',
      categories: {
        income: ['paycheck', 'personal'],
        expense: ['groceries', 'clothing', 'recreation'],
      },
    }
  }

  componentDidMount() {
    const validTypes = ['category', 'income', 'expense'];
    const hash = this.props.location.hash.substr(1);

    if(validTypes.includes(hash)) {
      this.setState({type: hash});
    }
  }

  handleChange = (event) => {
    this.setState({
      type: event.target.value 
    })
  }

  renderForm = () => {
    if(this.state.type === 'category') {
      return <>
        <label htmlFor="input-category">Category name</label>
        <input type="text" id="input-category" />
        <button type="submit">Submit</button>
      </>;
    }

    return <>
      <label htmlFor="input-type">Type</label>
      <select id="input-type">
        {this.state.categories[this.state.type].map(category => <option key={category}>{category}</option>)}
      </select>

      <label htmlFor="input-date">Date</label>
      <input type="date" id="input-date" />

      <label htmlFor="input-description">Short description (max 50 chars.)</label>
      <input type="text" id="input-description" maxLength="50" />

      <label htmlFor="input-amount">Amount</label>
      <input type="number" id="input-amount" />

      <label htmlFor="input-freq">Frequency</label>
      <select id="input-freq">
        <option>Bi-weekly</option>
        <option>Monthly</option>
      </select>

      <button type="submit">Create</button>
    </>;
  }

  render() {
    return (
      <main className="flex-main">
        <form className="flex-form">
          <label htmlFor="input-type">I want to add...</label>
          <select id="input-type" onChange={this.handleChange}> 
            <option>category</option>
            {Object.keys(this.state.categories).map(type => 
              <option key={type} selected={this.state.type === type}>{type}</option>)}
          </select>

          <hr></hr>
          {this.renderForm()}
        </form>
      </main>
    );
  }
}

export default withRouter(AddItemPage);
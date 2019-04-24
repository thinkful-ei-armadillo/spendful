import React, { Component } from 'react';

export default class AddItemPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      type: null
    }
  }

  handleChange = (event) => {
    this.setState({
      type: event.target.value 
    })
  }

  renderNewItem = (type) => {
      return(
        <div>
          <select>
            <option>Groceries</option>
            <option>Fuel</option>
            <option>Bribe</option>
          </select>
          <input type="date"/>
          <input type="text" placeholder="Name" />
          <input type="number" />
          <select>
            <option>Bi-weekly</option>
            <option>Monthly</option>
          </select>
          <button type="submit">Create</button>
        </div>
      )  
    }
    
    renderNewCategory = () => {
      return(
        <div>
          <input type="text" placeholder="Category Name" />
          <button type="submit">Submit</button>
        </div>
      )
    }

  render(){
    return(
    <div>
      <h2>Track A New Item</h2>
      <form> 
        <select onChange={this.handleChange}> 
          <option>Category</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
        {(this.state.type === 'Income' || this.state.type === 'Expense')
          ? (this.state.type === 'Income') 
            ? this.renderNewItem('Income')
            : this.renderNewItem('Expense')
          : this.renderNewCategory()}
      </form>
    </div>
    )
  }
}
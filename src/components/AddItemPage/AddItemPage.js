import React, { Component } from 'react'
import AddItemForm from '../AddItemForm/AddItemForm'
import { withRouter } from 'react-router-dom'


class AddItemPage extends Component {

  state = {
    errors: []
  }
  
  onSuccess = (itemType) => {
    const { history } = this.props;
    history.push(itemType)
  }

  onFailure = (errors) => {
    this.setState({
      errors 
    })
  }

  render(){
    return( 
      <main className="flex-main">
        {this.state.errors.length > 0 
        ? <div className="alert-error">{this.state.errors}</div>
        : ''}
          {/* <label htmlFor="input-type">I want to add an...</label>
          <select id="input-type" onChange={this.handleTypeChange} value={this.state.type}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            {Object.keys(this.state.categories).map(type => 
              <option key={type}>{type}</option>)} 
          </select> */}
          <AddItemForm 
            itemType={this.props.itemType}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            />
          {/* {this.renderForm()} */}
      </main>
    )
  }
}

export default withRouter(AddItemPage)
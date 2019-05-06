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
      errors: this.context.errors 
    })
  }

  render(){
    return( 
      <main className="flex-main">
        {this.state.errors.length > 0 
        ? <div className="alert-error">{this.state.errors}</div>
        : ''}

        <div className="flex-form-container">
          <AddItemForm 
            itemType={this.props.itemType}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            />
        </div>
      </main>
    )
  }
}

export default withRouter(AddItemPage)